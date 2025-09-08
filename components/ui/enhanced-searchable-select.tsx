'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  name: string;
  tier: string;
  benchmarkScore?: number;
  specs: string;
  price: number;
}

interface EnhancedSearchableSelectProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  type: 'cpu' | 'gpu' | 'ram' | 'resolution';
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'cpu': return '🔧';
    case 'gpu': return '🎮';
    case 'ram': return '💾';
    case 'resolution': return '🖥️';
    default: return '⚙️';
  }
};

const getTierColor = (tier: string) => {
  switch (tier.toLowerCase()) {
    case 'enthusiast':
    case 'premium':
      return 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300';
    case 'high-end':
      return 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300';
    case 'mid-range':
    case 'standard':
      return 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300';
    case 'entry-level':
    case 'budget':
      return 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-700 dark:text-yellow-300';
    default:
      return 'bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800/30 dark:to-slate-800/30 text-gray-700 dark:text-gray-300';
  }
};

export function EnhancedSearchableSelect({
  options,
  value,
  onValueChange,
  placeholder,
  type
}: EnhancedSearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.tier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.specs.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
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

  const handleOptionClick = (optionId: string) => {
    onValueChange(optionId);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-lg border border-input bg-gradient-to-r from-background to-muted/20 px-3 py-2 text-sm transition-all duration-200 cursor-pointer",
          "hover:border-primary/50 hover:shadow-md hover:from-background hover:to-primary/5",
          "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
          isOpen && "border-primary ring-2 ring-primary/20 shadow-lg"
        )}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <span className="text-lg flex-shrink-0">{getTypeIcon(type)}</span>
          {selectedOption ? (
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-foreground truncate">
                  {selectedOption.name}
                </span>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0",
                  getTierColor(selectedOption.tier)
                )}>
                  {selectedOption.tier}
                </span>
              </div>
              <div className="text-xs text-muted-foreground truncate mt-0.5">
                {selectedOption.specs}
              </div>
            </div>
          ) : (
            <span className="text-muted-foreground flex-1 truncate">{placeholder}</span>
          )}
        </div>
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )} 
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-popover border border-border rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder={`Search ${type.toUpperCase()}s...`}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setHighlightedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-input rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
              />
            </div>
          </div>
          
          <div 
            ref={listRef}
            className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
            role="listbox"
          >
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No {type}s found matching "{searchTerm}"
              </div>
            ) : (
              <div className="p-1">
                {filteredOptions.map((option, index) => (
                  <div
                    key={option.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-md cursor-pointer transition-all duration-150",
                      "hover:bg-accent hover:text-accent-foreground",
                      highlightedIndex === index && "bg-accent text-accent-foreground",
                      value === option.id && "bg-primary/10 text-primary font-medium"
                    )}
                    onClick={() => handleOptionClick(option.id)}
                    role="option"
                    aria-selected={value === option.id}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <span className="text-base flex-shrink-0">{getTypeIcon(type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm truncate">
                            {option.name}
                          </span>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0",
                            getTierColor(option.tier)
                          )}>
                            {option.tier}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {option.specs}
                        </div>
                        {option.benchmarkScore && (
                          <div className="text-xs text-primary font-medium mt-0.5">
                            Score: {option.benchmarkScore}/100
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {option.price > 0 && (
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          ${option.price}
                        </span>
                      )}
                      {value === option.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}