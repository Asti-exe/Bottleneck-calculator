'use client';

import { useState, useMemo } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { calculatorData, getTierColor } from '@/lib/calculator-data';

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: string[];
  type: 'cpu' | 'gpu';
  className?: string;
}

export function SearchableSelect({
  value,
  onValueChange,
  placeholder,
  options,
  type,
  className
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);

  const sortedOptions = useMemo(() => {
    const components = type === 'cpu' ? calculatorData.cpus : calculatorData.gpus;
    return options.sort((a, b) => {
      const scoreA = components[a as keyof typeof components]?.score || 0;
      const scoreB = components[b as keyof typeof components]?.score || 0;
      return scoreB - scoreA;
    });
  }, [options, type]);

  const getComponentInfo = (componentName: string) => {
    const components = type === 'cpu' ? calculatorData.cpus : calculatorData.gpus;
    return components[componentName as keyof typeof components];
  };

  const formatComponentDisplay = (componentName: string) => {
    const info = getComponentInfo(componentName);
    if (!info) return componentName;

    const tierColor = getTierColor(info.tier);
    
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start">
          <span className="font-medium">{componentName}</span>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={`text-xs px-2 py-0.5 ${tierColor}`}>
              {info.tier.replace('-', ' ')}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Score: {info.score}
            </span>
            {type === 'cpu' && 'cores' in info && (
              <span className="text-xs text-muted-foreground">
                {info.cores}C/{info.threads}T
              </span>
            )}
            {type === 'gpu' && 'vram' in info && (
              <span className="text-xs text-muted-foreground">
                {info.vram}GB VRAM
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between h-auto min-h-[2.5rem] px-3 py-2", className)}
        >
          {value ? (
            <div className="flex items-center gap-2 text-left">
              <span className="truncate">{value}</span>
              {getComponentInfo(value) && (
                <Badge className={`text-xs ${getTierColor(getComponentInfo(value)!.tier)}`}>
                  {getComponentInfo(value)!.tier.replace('-', ' ')}
                </Badge>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder={`Search ${type === 'cpu' ? 'processors' : 'graphics cards'}...`}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No {type === 'cpu' ? 'processor' : 'graphics card'} found.</CommandEmpty>
            <CommandGroup>
              {sortedOptions.map((option) => {
                const info = getComponentInfo(option);
                return (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between py-3 px-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{option}</span>
                        <div className="flex items-center gap-2 mt-1">
                          {info && (
                            <>
                              <Badge className={`text-xs px-2 py-0.5 ${getTierColor(info.tier)}`}>
                                {info.tier.replace('-', ' ')}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Score: {info.score}
                              </span>
                              {type === 'cpu' && 'cores' in info && (
                                <span className="text-xs text-muted-foreground">
                                  {info.cores}C/{info.threads}T
                                </span>
                              )}
                              {type === 'gpu' && 'vram' in info && (
                                <span className="text-xs text-muted-foreground">
                                  {info.vram}GB
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}