'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QuickToolsBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quickToolsCollapsed');
    if (saved) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  const toggleCollapsed = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('quickToolsCollapsed', JSON.stringify(newState));
  };

  const tools = [
    { href: '/', label: 'Bottleneck' },
    { href: '/fps-calculator', label: 'FPS Calculator' },
    { href: '/psu-calculator', label: 'PSU Calculator' },
  ];

  return (
    <div className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center min-w-0">
            <div className="flex items-center whitespace-nowrap">
              <Settings className="h-5 w-5 mr-3 text-muted-foreground" />
              <span className="font-semibold text-foreground">Quick Tools:</span>
            </div>
            <div 
              className={`flex items-center gap-3 ml-3 overflow-hidden transition-all duration-300 ease-in-out ${
                isCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-screen-sm opacity-100'
              }`}
            >
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="text-primary hover:text-primary/80 font-medium px-2 py-1 rounded-md hover:bg-primary/10 transition-colors whitespace-nowrap"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapsed}
            className="h-8 w-8 rounded-full p-0"
          >
            <ChevronLeft 
              className={`h-4 w-4 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`} 
            />
          </Button>
        </div>
      </div>
    </div>
  );
}