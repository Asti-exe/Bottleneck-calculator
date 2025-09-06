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
          flex items-center justify-between w-full px-4 py-3 text-left 
          bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
          border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer
          transition-all duration-300 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500
          focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
          ${isOpen ? 'border-blue-500 shadow-lg ring-2 ring-blue-500/20' : ''}
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
          <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
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
          <span className="text-lg flex-shrink-0">{getTypeIcon(type)}</span>
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md
                         bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                         placeholder-gray-400 dark:placeholder-gray-500"
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
              <div className="space-y-0.5">
                <div className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm">
                onChange={(e) => {
          <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                <div className="flex items-center space-x-1.5">
              <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                <div className="text-3xl mb-2">🔍</div>
                <div className="font-medium text-sm">No results found</div>
                <div className="text-xs mt-1">Try different search terms</div>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
          </div>
          
          <div 
            ref={listRef}
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                    px-4 py-3 cursor-pointer transition-all duration-200 border-b border-gray-50 dark:border-gray-700/50 last:border-b-0
            {filteredOptions.length === 0 ? (
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700' 
                      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700/30 dark:hover:to-gray-600/30'
              </div>
            ) : (
              <span className="text-gray-500 dark:text-gray-400 font-medium">{placeholder}</span>
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                    highlightedIndex === index ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  } ${
                    value === option.id ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                  }`}
                    <span className="text-lg flex-shrink-0">{getTypeIcon(type)}</span>
                        {option.name}
                      <div className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm">
                      {option.tier && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${tierColors[option.tier as keyof typeof tierColors]}`}>
                          {option.tier}
                        <div className="text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5">
                      )}
                      {option.benchmarkScore && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1.5 mt-1">
                        </span>
                      )}
                    </div>
                    {option.specs && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {option.specs}
                      </div>
                    )}
                  </div>
                          <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
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
          absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
          rounded-lg shadow-2xl max-h-80 overflow-hidden backdrop-blur-sm