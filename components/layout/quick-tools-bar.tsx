'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Zap, Gamepad2, Settings2 } from 'lucide-react';
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
    { href: '/', label: 'Bottleneck', icon: Zap, description: 'Check system balance' },
    { href: '/fps-calculator', label: 'FPS Calculator', icon: Gamepad2, description: 'Estimate gaming performance' },
    { href: '/psu-calculator', label: 'PSU Calculator', icon: Settings2, description: 'Calculate power needs' },
  ];

  return (
    <div className="border-b bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center min-w-0">
            <div className="flex items-center whitespace-nowrap">
              <div className="flex items-center gap-2 mr-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="font-bold text-primary">Quick Tools</span>
              </div>
            </div>
            <div 
              className={`flex items-center gap-2 overflow-hidden transition-all duration-500 ease-in-out ${
                isCollapsed ? 'max-w-0 opacity-0' : 'max-w-screen-lg opacity-100'
              }`}
            >
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300 hover:scale-105 whitespace-nowrap"
                >
                  <tool.icon className="h-4 w-4 text-primary group-hover:text-primary/80 transition-colors" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {tool.label}
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">
                      {tool.description}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft 
              className={`h-4 w-4 text-primary transition-transform duration-500 ${
                isCollapsed ? 'rotate-180' : ''
              }`} 
            />
          </Button>
        </div>
      </div>
    </div>
  );
}