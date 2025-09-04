import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  Gamepad2, 
  Zap, 
  BarChart3, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Monitor,
  HardDrive,
  Settings
} from 'lucide-react';

interface QuickToolsBarProps {
  onToolSelect: (tool: string) => void;
  currentTool: string;
}

const tools = [
  {
    id: 'bottleneck',
    name: 'Bottleneck Calculator',
    description: 'Analyze CPU & GPU balance',
    icon: Calculator,
    gradient: 'from-blue-500 to-purple-600',
    hoverGradient: 'from-blue-600 to-purple-700'
  },
  {
    id: 'fps',
    name: 'FPS Calculator',
    description: 'Estimate gaming performance',
    icon: Gamepad2,
    gradient: 'from-green-500 to-blue-600',
    hoverGradient: 'from-green-600 to-blue-700'
  },
  {
    id: 'psu',
    name: 'PSU Calculator',
    description: 'Calculate power requirements',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-600',
    hoverGradient: 'from-yellow-600 to-orange-700'
  },
  {
    id: 'comparison',
    name: 'Component Comparison',
    description: 'Compare CPUs & GPUs',
    icon: BarChart3,
    gradient: 'from-purple-500 to-pink-600',
    hoverGradient: 'from-purple-600 to-pink-700'
  }
];

export function EnhancedQuickToolsBar({ onToolSelect, currentTool }: QuickToolsBarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Quick Tools
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced PC analysis tools
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = currentTool === tool.id;
              
              return (
                <Button
                  key={tool.id}
                  onClick={() => onToolSelect(tool.id)}
                  variant="ghost"
                  className={`group relative h-auto p-0 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    isActive ? 'scale-105 shadow-xl' : 'hover:shadow-lg'
                  }`}
                >
                  <div className={`w-full h-full p-4 bg-gradient-to-br ${
                    isActive ? tool.hoverGradient : tool.gradient
                  } text-white rounded-lg transition-all duration-300`}>
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`p-3 bg-white/20 rounded-full transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 ${
                        isActive ? 'bg-white/30 scale-110' : ''
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{tool.name}</h3>
                        <p className="text-xs opacity-90 leading-tight">{tool.description}</p>
                      </div>
                    </div>
                    
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Additional Quick Actions */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
              >
                <Cpu className="w-3 h-3 mr-1" />
                CPU Benchmark
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
              >
                <Monitor className="w-3 h-3 mr-1" />
                GPU Benchmark
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
              >
                <HardDrive className="w-3 h-3 mr-1" />
                Storage Test
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}