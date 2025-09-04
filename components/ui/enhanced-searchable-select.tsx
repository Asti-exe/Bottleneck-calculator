import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Cpu, Zap, HardDrive, Monitor } from 'lucide-react';
import { CPU, GPU } from '@/lib/hardware-database';

interface Option {
  id: string;
  name: string;
  tier?: string;
  benchmarkScore?: number;
  imageUrl?: string;
  specs?: string;
  price?: number;
}

interface EnhancedSearchableSelectProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  type?: 'cpu' | 'gpu' | 'ram' | 'resolution';
  className?: string;
}

const tierColors = {
  'High-End': 'bg-purple-100 text-purple-800 border-purple-200',
  'Mid-Range': 'bg-blue-100 text-blue-800 border-blue-200',
  'Budget': 'bg-green-100 text-green-800 border-green-200',
  'Entry-Level': 'bg-gray-100 text-gray-800 border-gray-200'
};

const typeIcons = {
  cpu: Cpu,
  gpu: Zap,
  ram: HardDrive,
  resolution: Monitor
};

export function EnhancedSearchableSelect({
  options,
  value,
  onValueChange,
  placeholder,
  type = 'cpu',
  className = ''
}: EnhancedSearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const Icon = typeIcons[type];

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.id === value);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            onValueChange(filteredOptions[highlightedIndex].id);
            setIsOpen(false);
            setSearchTerm('');
            setHighlightedIndex(-1);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions, onValueChange]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex]);

  const handleOptionSelect = (optionId: string) => {
    onValueChange(optionId);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      >
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
          {selectedOption ? (
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              {selectedOption.imageUrl && (
                <img 
                  src={selectedOption.imageUrl} 
                  alt={selectedOption.name}
                  className="w-8 h-8 rounded object-cover flex-shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white truncate">
                    {selectedOption.name}
                  </span>
                  {selectedOption.tier && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${tierColors[selectedOption.tier as keyof typeof tierColors]}`}>
                      {selectedOption.tier}
                    </span>
                  )}
                </div>
                {selectedOption.specs && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {selectedOption.specs}
                  </div>
                )}
              </div>
              {selectedOption.price && (
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                    ${selectedOption.price}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-500 dark:text-gray-400 truncate">{placeholder}</span>
          )}
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setHighlightedIndex(-1);
                }}
                placeholder={`Search ${type}s...`}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <div 
            ref={listRef}
            className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No {type}s found
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                    highlightedIndex === index ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  } ${
                    value === option.id ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                  }`}
                >
                  {option.imageUrl && (
                    <img 
                      src={option.imageUrl} 
                      alt={option.name}
                      className="w-10 h-10 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {option.name}
                      </span>
                      {option.tier && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${tierColors[option.tier as keyof typeof tierColors]}`}>
                          {option.tier}
                        </span>
                      )}
                      {option.benchmarkScore && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Score: {option.benchmarkScore}
                        </span>
                      )}
                    </div>
                    {option.specs && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {option.specs}
                      </div>
                    )}
                  </div>
                  {option.price && (
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                        ${option.price}
                      </div>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}