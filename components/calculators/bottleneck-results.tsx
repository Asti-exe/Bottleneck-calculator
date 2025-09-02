'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, RotateCcw, DollarSign, Monitor, Gamepad2, Zap, HardDrive, Trophy, Settings2, Cpu, Gauge } from 'lucide-react';
import { placeholderImages, marketPrices } from '@/lib/calculator-data';

interface CalculationResults {
  cpu: { name: string; info: any };
  gpu: { name: string; info: any };
  bottleneck: { percentage: number; component: string };
  settings: {
    resolution: string;
    ram: string;
    purpose: string;
  };
}

interface BottleneckResultsProps {
  results: CalculationResults;
  onReset: () => void;
}

export function BottleneckResults({ results, onReset }: BottleneckResultsProps) {
  const { cpu, gpu, bottleneck, settings } = results;
  
  const getBottleneckColor = () => {
    if (bottleneck.percentage > 10) return 'hsl(var(--destructive))';
    if (bottleneck.percentage > 5) return 'hsl(var(--accent))';
    return 'hsl(var(--success))';
  };

  const getBottleneckMessage = () => {
    if (bottleneck.component === 'None') {
      return 'Your system is well balanced.';
    }
    return `${bottleneck.component} is the limiting factor.`;
  };

  // Performance scoring functions
  const getPerformanceScore = (score: number) => {
    if (score >= 95) return { rating: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20' };
    if (score >= 80) return { rating: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20' };
    if (score >= 65) return { rating: 'Fair', color: 'text-amber-600', bgColor: 'bg-amber-100 dark:bg-amber-900/20' };
    return { rating: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/20' };
  };

  const getRAMScore = (ram: string) => {
    const ramGB = parseInt(ram);
    if (ramGB >= 32) return { rating: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20' };
    if (ramGB >= 16) return { rating: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20' };
    if (ramGB >= 8) return { rating: 'Fair', color: 'text-amber-600', bgColor: 'bg-amber-100 dark:bg-amber-900/20' };
    return { rating: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/20' };
  };

  const getResolutionFPS = (baseScore: number, resolution: string) => {
    const multipliers = { "1080p": 1.4, "1440p": 1.0, "4k": 0.6, "ultrawide": 0.9 };
    return Math.round(baseScore * (multipliers[resolution as keyof typeof multipliers] || 1.0));
  };

  const getGameRecommendations = () => {
    const cpuScore = cpu.info.score;
    const gpuScore = gpu.info.score;
    const avgScore = (cpuScore + gpuScore) / 2;

    if (avgScore >= 95) {
      return {
        category: 'All Games at Maximum Settings',
        description: 'Your system can handle any current game at ultra settings with excellent performance.',
        settings: 'Ultra/Max settings recommended',
        resolution: 'Perfect for 4K gaming'
      };
    } else if (avgScore >= 80) {
      return {
        category: 'AAA Games at High Settings',
        description: 'Perfect for modern AAA titles with high to ultra settings.',
        settings: 'High to Ultra settings',
        resolution: 'Excellent for 1440p, good for 4K'
      };
    } else if (avgScore >= 65) {
      return {
        category: 'Most Games at Medium-High Settings',
        description: 'Great for most games with medium to high settings.',
        settings: 'Medium to High settings',
        resolution: 'Best at 1080p-1440p'
      };
    } else {
      return {
        category: 'Esports & Older Games',
        description: 'Best suited for competitive esports titles and older games.',
        settings: 'Low to Medium settings',
        resolution: 'Optimized for 1080p'
      };
    }
  };

  const getLimitingFactor = (resolution: string) => {
    const cpuFps = getResolutionFPS(cpu.info.score * 2.5, resolution);
    const gpuFps = getResolutionFPS(gpu.info.score * 2.2, resolution);
    
    if (Math.abs(cpuFps - gpuFps) < 10) return 'Balanced';
    return cpuFps < gpuFps ? 'CPU Limited' : 'GPU Limited';
  };

  const gameRecs = getGameRecommendations();
  const cpuPerf = getPerformanceScore(cpu.info.score);
  const gpuPerf = getPerformanceScore(gpu.info.score);
  const ramScore = getRAMScore(settings.ram);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Main Bottleneck Analysis */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <Zap className="h-5 w-5" />
            Bottleneck Analysis at {settings.resolution}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="relative">
              <Progress 
                value={bottleneck.percentage} 
                className="h-8"
                style={{ 
                  '--progress-background': getBottleneckColor() 
                } as React.CSSProperties}
              />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
                {bottleneck.percentage.toFixed(1)}% {bottleneck.component !== 'None' ? bottleneck.component : ''}
              </div>
            </div>
            <p className="text-lg font-semibold">
              {getBottleneckMessage()}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ComponentCard
              title="Processor (CPU)"
              name={cpu.name}
              imageUrl={cpu.info.imageUrl}
              fallbackImage={placeholderImages.cpu}
              searchTerm={cpu.name}
              searchUrl="https://cpu.userbenchmark.com/Search?searchTerm="
              price={marketPrices.cpus[cpu.name as keyof typeof marketPrices.cpus]}
              performance={cpuPerf}
              score={cpu.info.score}
            />
            
            <ComponentCard
              title="Graphics Card (GPU)"
              name={gpu.name}
              imageUrl={gpu.info.imageUrl}
              fallbackImage={placeholderImages.gpu}
              searchTerm={gpu.name}
              searchUrl="https://gpu.userbenchmark.com/Search?searchTerm="
              price={marketPrices.gpus[gpu.name as keyof typeof marketPrices.gpus]}
              performance={gpuPerf}
              score={gpu.info.score}
            />
          </div>
        </CardContent>
      </Card>

      {/* 1. Resolution Impact & Benchmarks */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            🔹 1. Resolution Impact & Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['1080p', '1440p', '4k'].map((res) => {
              const cpuFps = getResolutionFPS(cpu.info.score * 2.5, res);
              const gpuFps = getResolutionFPS(gpu.info.score * 2.2, res);
              const limitingFactor = getLimitingFactor(res);
              const isSelected = res === settings.resolution;
              
              return (
                <div key={res} className={`p-4 rounded-lg border-2 ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <h4 className="font-semibold mb-3 text-center">{res.toUpperCase()}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        CPU Performance:
                      </span>
                      <span className="font-bold text-blue-600">{cpuFps} FPS</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Gauge className="h-4 w-4" />
                        GPU Performance:
                      </span>
                      <span className="font-bold text-green-600">{gpuFps} FPS</span>
                    </div>
                    <div className="text-center pt-2 border-t">
                      <Badge variant={limitingFactor === 'Balanced' ? 'default' : 'secondary'} className="text-xs">
                        {limitingFactor}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Key Insight:</strong> Higher resolutions (1440p, 4K) put significantly more stress on the GPU, while CPU performance remains relatively consistent. 
              At 4K, most systems become GPU-limited, making graphics card upgrades more impactful than CPU upgrades.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Gaming Performance Assessment */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            🔹 2. Gaming Performance Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                By CPU: {cpu.name}
              </h4>
              <div className={`p-4 rounded-lg ${cpuPerf.bgColor} border`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Gaming Rating:</span>
                  <Badge className={`${cpuPerf.color} bg-transparent`}>{cpuPerf.rating}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {cpu.info.score >= 90 ? 'Exceptional CPU performance. Handles all modern games including CPU-intensive titles like strategy games, simulators, and open-world games with ease.' :
                   cpu.info.score >= 75 ? 'Strong CPU performance for most games. May see minor limitations in very CPU-intensive titles or when streaming simultaneously.' :
                   cpu.info.score >= 60 ? 'Adequate gaming performance. May struggle with CPU-heavy games or multitasking while gaming.' :
                   'Entry-level gaming performance. Best suited for older games and esports titles. May cause stuttering in modern AAA games.'}
                </p>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Esports Performance:</span>
                    <span className="font-medium">{cpu.info.score >= 75 ? 'Excellent' : cpu.info.score >= 60 ? 'Good' : 'Fair'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AAA Gaming:</span>
                    <span className="font-medium">{cpu.info.score >= 85 ? 'Excellent' : cpu.info.score >= 70 ? 'Good' : 'Limited'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                By GPU: {gpu.name}
              </h4>
              <div className={`p-4 rounded-lg ${gpuPerf.bgColor} border`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Graphics Rating:</span>
                  <Badge className={`${gpuPerf.color} bg-transparent`}>{gpuPerf.rating}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {gpu.info.score >= 90 ? 'Top-tier graphics performance. Handles ray tracing, ultra settings, and high refresh rate gaming with ease.' :
                   gpu.info.score >= 75 ? 'Strong graphics performance. Can run most games at high settings with good frame rates.' :
                   gpu.info.score >= 60 ? 'Solid mid-range performance. Good for medium to high settings in most titles.' :
                   'Entry-level graphics. Best suited for esports titles, older games, or low-medium settings.'}
                </p>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Ray Tracing:</span>
                    <span className="font-medium">{gpu.info.score >= 85 ? 'Excellent' : gpu.info.score >= 70 ? 'Good' : 'Limited'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4K Gaming:</span>
                    <span className="font-medium">{gpu.info.score >= 95 ? 'Excellent' : gpu.info.score >= 80 ? 'Good' : 'Not Recommended'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              System Balance Analysis
            </h4>
            <p className="text-sm leading-relaxed">
              {bottleneck.component === 'None' ? 
                'Your CPU and GPU are excellently balanced, ensuring optimal performance across all gaming scenarios. Neither component is holding back the other, maximizing your investment.' :
                `Your ${bottleneck.component} is ${bottleneck.percentage.toFixed(1)}% weaker than your ${bottleneck.component === 'CPU' ? 'GPU' : 'CPU'}. This means your ${bottleneck.component === 'CPU' ? 'graphics card' : 'processor'} is not reaching its full potential, limiting performance in ${bottleneck.component === 'CPU' ? 'CPU-intensive games and multitasking scenarios' : 'graphics-intensive games and high-resolution gaming'}.`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 3. Gaming Recommendations */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            🔹 3. Gaming Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">Best Suited For: {gameRecs.category}</h4>
            <p className="text-sm mb-3">{gameRecs.description}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                <span className="font-medium">Settings: {gameRecs.settings}</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span className="font-medium">{gameRecs.resolution}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h5 className="font-medium text-green-600">🎯 Esports Titles</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <span>CS2 / Valorant</span>
                  <span className="font-bold">{cpu.info.score >= 75 ? 'Excellent' : 'Good'}</span>
                </div>
                <div className="flex justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <span>Fortnite / Apex</span>
                  <span className="font-bold">{Math.min(cpu.info.score, gpu.info.score) >= 70 ? 'Excellent' : 'Good'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium text-blue-600">🎮 AAA Titles</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span>Cyberpunk 2077</span>
                  <span className="font-bold">{gpu.info.score >= 85 ? 'Excellent' : gpu.info.score >= 70 ? 'Good' : 'Limited'}</span>
                </div>
                <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span>Elden Ring</span>
                  <span className="font-bold">{Math.min(cpu.info.score, gpu.info.score) >= 75 ? 'Excellent' : 'Good'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium text-purple-600">🚀 Future Games</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <span>GTA VI (Est.)</span>
                  <span className="font-bold">{(cpu.info.score + gpu.info.score) / 2 >= 85 ? 'Ready' : 'Upgrade Needed'}</span>
                </div>
                <div className="flex justify-between p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <span>Next-Gen AAA</span>
                  <span className="font-bold">{(cpu.info.score + gpu.info.score) / 2 >= 90 ? 'Future-Proof' : 'May Struggle'}</span>
                </div>
              </div>
            </div>
          </div>

          {bottleneck.component !== 'None' && (
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">🔧 Upgrade Recommendations</h5>
              <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-300">
                {bottleneck.component === 'CPU' && (
                  <>
                    <li>• <strong>Priority:</strong> Upgrade CPU to eliminate {bottleneck.percentage.toFixed(1)}% bottleneck</li>
                    <li>• <strong>Impact:</strong> Will improve frame consistency and reduce stuttering</li>
                    <li>• <strong>Budget Option:</strong> Consider a mid-range CPU upgrade first</li>
                  </>
                )}
                {bottleneck.component === 'GPU' && (
                  <>
                    <li>• <strong>Priority:</strong> GPU upgrade will provide the biggest performance boost</li>
                    <li>• <strong>Impact:</strong> Higher frame rates and better visual quality</li>
                    <li>• <strong>Alternative:</strong> Lower resolution/settings can improve performance without upgrading</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 4. Configuration Scoring */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            🔹 4. Configuration Scoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`text-center p-4 border rounded-lg ${ramScore.bgColor}`}>
              <h5 className="font-medium mb-2">RAM Configuration</h5>
              <div className={`text-2xl font-bold ${ramScore.color} mb-1`}>
                {ramScore.rating}
              </div>
              <p className="text-sm text-muted-foreground">{settings.ram}GB DDR4/DDR5</p>
              <p className="text-xs mt-2">
                {parseInt(settings.ram) >= 32 ? 'Perfect for content creation and heavy multitasking' :
                 parseInt(settings.ram) >= 16 ? 'Ideal for modern gaming and productivity' :
                 parseInt(settings.ram) >= 8 ? 'Minimum for gaming, may limit performance' :
                 'Insufficient for modern games'}
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg bg-green-100 dark:bg-green-900/20">
              <h5 className="font-medium mb-2">Storage Performance</h5>
              <div className="text-2xl font-bold text-green-600 mb-1">
                Excellent
              </div>
              <p className="text-sm text-muted-foreground">NVMe SSD (assumed)</p>
              <p className="text-xs mt-2">
                Fast loading times and responsive system
              </p>
            </div>

            <div className={`text-center p-4 border rounded-lg ${getPerformanceScore((cpu.info.score + gpu.info.score) / 2).bgColor}`}>
              <h5 className="font-medium mb-2">Overall System Rating</h5>
              <div className={`text-2xl font-bold ${getPerformanceScore((cpu.info.score + gpu.info.score) / 2).color} mb-1`}>
                {getPerformanceScore((cpu.info.score + gpu.info.score) / 2).rating}
              </div>
              <p className="text-sm text-muted-foreground">
                {settings.purpose === 'gaming' ? 'Gaming Build' : 
                 settings.purpose === 'streaming' ? 'Streaming Setup' :
                 settings.purpose === 'video_editing' ? 'Content Creation' :
                 settings.purpose === '3d_rendering' ? '3D Workstation' : 'General Use'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Expected Load Times</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Game Loading:</span>
                  <span className="font-medium">5-15 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>System Boot:</span>
                  <span className="font-medium">10-20 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>File Transfers:</span>
                  <span className="font-medium">Very Fast</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <h5 className="font-medium mb-2 text-purple-700 dark:text-purple-300">Suitability Scores</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gaming:</span>
                  <span className="font-medium">{getPerformanceScore((cpu.info.score + gpu.info.score) / 2).rating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Productivity:</span>
                  <span className="font-medium">{getPerformanceScore(cpu.info.score).rating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Content Creation:</span>
                  <span className="font-medium">{getPerformanceScore((cpu.info.score * 0.7) + (gpu.info.score * 0.3)).rating}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Bottleneck Analysis */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            🔹 5. Bottleneck Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Main Limiting Component</h4>
              <div className={`p-4 rounded-lg border-2 ${
                bottleneck.component === 'None' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                bottleneck.component === 'CPU' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
              }`}>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    bottleneck.component === 'None' ? 'text-green-600' :
                    bottleneck.component === 'CPU' ? 'text-red-600' : 'text-amber-600'
                  }`}>
                    {bottleneck.component === 'None' ? 'Balanced' : bottleneck.component}
                  </div>
                  <p className="text-sm">
                    {bottleneck.component === 'None' ? 'No significant bottleneck detected' :
                     `${bottleneck.percentage.toFixed(1)}% performance limitation`}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Impact Assessment</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Gaming Impact:</span>
                  <Badge variant={bottleneck.percentage > 10 ? 'destructive' : bottleneck.percentage > 5 ? 'secondary' : 'default'}>
                    {bottleneck.percentage > 10 ? 'High' : bottleneck.percentage > 5 ? 'Moderate' : 'Minimal'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Productivity Impact:</span>
                  <Badge variant={bottleneck.component === 'CPU' && bottleneck.percentage > 15 ? 'destructive' : 'default'}>
                    {bottleneck.component === 'CPU' && bottleneck.percentage > 15 ? 'Noticeable' : 'Minimal'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Upgrade Priority:</span>
                  <Badge variant={bottleneck.percentage > 10 ? 'destructive' : 'default'}>
                    {bottleneck.percentage > 10 ? 'High' : bottleneck.percentage > 5 ? 'Medium' : 'Low'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {bottleneck.component !== 'None' && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">⚠️ Performance Impact Details</h5>
              <p className="text-sm text-red-700 dark:text-red-300">
                {bottleneck.component === 'CPU' ? 
                  `Your CPU is limiting your GPU's potential by ${bottleneck.percentage.toFixed(1)}%. This may cause frame drops, stuttering, and inconsistent performance, especially in CPU-intensive games or when multitasking.` :
                  `Your GPU is the limiting factor by ${bottleneck.percentage.toFixed(1)}%. While this is normal for gaming, upgrading your graphics card would provide the most significant performance improvement.`
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 6. Expected Gaming Experience */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            🔹 6. Expected Gaming Experience at {settings.resolution}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600">🎯 Esports Titles</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <span className="font-medium">CS2 / Valorant</span>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{getResolutionFPS(cpu.info.score * 3, settings.resolution)}+ FPS</div>
                    <div className="text-xs text-muted-foreground">Competitive Ready</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <span className="font-medium">Fortnite / Apex</span>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{getResolutionFPS(Math.min(cpu.info.score, gpu.info.score) * 2.5, settings.resolution)}+ FPS</div>
                    <div className="text-xs text-muted-foreground">High Refresh Rate</div>
                  </div>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 p-2 rounded">
                  ✅ Excellent for competitive gaming with high refresh rate monitors
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">🎮 AAA Titles</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span className="font-medium">Cyberpunk 2077</span>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">{getResolutionFPS(gpu.info.score * 0.8, settings.resolution)} FPS</div>
                    <div className="text-xs text-muted-foreground">{gpu.info.score >= 85 ? 'Ultra Settings' : 'High Settings'}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span className="font-medium">Elden Ring</span>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">{getResolutionFPS(Math.min(cpu.info.score, gpu.info.score) * 0.9, settings.resolution)} FPS</div>
                    <div className="text-xs text-muted-foreground">Smooth Experience</div>
                  </div>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  {(cpu.info.score + gpu.info.score) / 2 >= 80 ? 
                    '✅ Great for modern AAA gaming with high visual fidelity' :
                    '⚠️ May need to adjust settings for optimal performance'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">⚡ Optimization Tips</h5>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="font-medium text-sm mb-2">Graphics Settings:</h6>
                <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-300">
                  {gpu.info.score >= 80 && <li>• Enable DLSS/FSR for better performance</li>}
                  {bottleneck.component === 'GPU' && <li>• Lower shadow quality and anti-aliasing</li>}
                  {gpu.info.score < 70 && <li>• Disable ray tracing for better FPS</li>}
                  <li>• Adjust texture quality based on VRAM</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-sm mb-2">System Optimization:</h6>
                <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-300">
                  {bottleneck.component === 'CPU' && <li>• Close background applications</li>}
                  <li>• Keep drivers updated</li>
                  {cpu.info.score >= 85 && <li>• Consider mild CPU overclocking</li>}
                  {gpu.info.score >= 80 && <li>• Enable GPU overclocking</li>}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Market Prices */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">💰 Current Market Prices</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">CPU Price</p>
                  <p className="font-medium text-sm">{cpu.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ${marketPrices.cpus[cpu.name as keyof typeof marketPrices.cpus] || 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">Current market price</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">GPU Price</p>
                  <p className="font-medium text-sm">{gpu.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ${marketPrices.gpus[gpu.name as keyof typeof marketPrices.gpus] || 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">Current market price</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total System Value</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">CPU + GPU combined</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                  ${((marketPrices.cpus[cpu.name as keyof typeof marketPrices.cpus] || 0) + 
                     (marketPrices.gpus[gpu.name as keyof typeof marketPrices.gpus] || 0)).toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Estimated total</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Recommendation Summary */}
      <Card className="shadow-lg border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="text-center text-primary">🎯 Final Recommendation Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-lg font-semibold">
            Your system is rated <span className={getPerformanceScore((cpu.info.score + gpu.info.score) / 2).color}>
              {getPerformanceScore((cpu.info.score + gpu.info.score) / 2).rating}
            </span> for {settings.purpose === 'gaming' ? 'gaming' : settings.purpose.replace('_', ' ')} at {settings.resolution}
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {bottleneck.component === 'None' ? 
              `Your system is excellently balanced and ready for ${settings.resolution} gaming. You can expect smooth performance in most titles with ${gameRecs.settings.toLowerCase()}. This is an optimal configuration that maximizes your hardware investment.` :
              `Your ${bottleneck.component.toLowerCase()} is creating a ${bottleneck.percentage.toFixed(1)}% bottleneck. Consider upgrading your ${bottleneck.component.toLowerCase()} to unlock your system's full potential and achieve better performance in ${bottleneck.component === 'CPU' ? 'CPU-intensive games and multitasking' : 'graphics-intensive games and higher resolutions'}.`
            }
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Calculate Again
            </Button>
            <Button asChild variant="default">
              <Link href="/fps-calculator" className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Check FPS Performance
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/psu-calculator" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Calculate PSU Needs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ComponentCardProps {
  title: string;
  name: string;
  imageUrl?: string;
  fallbackImage: string;
  searchTerm: string;
  searchUrl: string;
  price?: number;
  performance: { rating: string; color: string; bgColor: string };
  score: number;
}

function ComponentCard({ title, name, imageUrl, fallbackImage, searchTerm, searchUrl, price, performance, score }: ComponentCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <h4 className="font-semibold mb-4">{title}</h4>
        <div className="mb-4">
          <Image
            src={imageUrl || fallbackImage}
            alt={`${name} image`}
            width={120}
            height={120}
            className="mx-auto object-contain rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
        </div>
        <p className="font-medium mb-2 text-sm">{name}</p>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${performance.bgColor} ${performance.color}`}>
          {performance.rating} ({score}/100)
        </div>
        
        {price && (
          <p className="text-lg font-bold text-green-600 mb-3">
            ${price.toLocaleString()}
          </p>
        )}
        <Link
          href={`${searchUrl}${encodeURIComponent(searchTerm)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-semibold transition-colors text-sm"
        >
          View Benchmarks
          <ExternalLink className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}