'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, RotateCcw, DollarSign, Monitor, Gamepad2, Zap, HardDrive, Trophy, Settings2 } from 'lucide-react';
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
    if (ramGB >= 32) return { rating: 'Excellent', color: 'text-green-600' };
    if (ramGB >= 16) return { rating: 'Good', color: 'text-blue-600' };
    if (ramGB >= 8) return { rating: 'Fair', color: 'text-amber-600' };
    return { rating: 'Poor', color: 'text-red-600' };
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
        settings: 'Ultra/Max settings recommended'
      };
    } else if (avgScore >= 80) {
      return {
        category: 'AAA Games at High Settings',
        description: 'Perfect for modern AAA titles with high to ultra settings.',
        settings: 'High to Ultra settings'
      };
    } else if (avgScore >= 65) {
      return {
        category: 'Most Games at Medium-High Settings',
        description: 'Great for most games with medium to high settings.',
        settings: 'Medium to High settings'
      };
    } else {
      return {
        category: 'Esports & Older Games',
        description: 'Best suited for competitive esports titles and older games.',
        settings: 'Low to Medium settings'
      };
    }
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

      {/* Resolution Impact & Benchmarks */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            🔹 Resolution Impact & Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['1080p', '1440p', '4k'].map((res) => {
              const cpuFps = getResolutionFPS(cpu.info.score * 2.5, res);
              const gpuFps = getResolutionFPS(gpu.info.score * 2.2, res);
              const isSelected = res === settings.resolution;
              
              return (
                <div key={res} className={`p-4 rounded-lg border-2 ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <h4 className="font-semibold mb-2">{res.toUpperCase()}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>CPU Performance:</span>
                      <span className="font-medium">{cpuFps} FPS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GPU Performance:</span>
                      <span className="font-medium">{gpuFps} FPS</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {cpuFps < gpuFps ? 'CPU Limited' : 'GPU Limited'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            Higher resolutions put more stress on the GPU, while CPU performance remains relatively consistent across resolutions.
          </p>
        </CardContent>
      </Card>

      {/* Gaming Performance Assessment */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            🔹 Gaming Performance Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">CPU Gaming Performance</h4>
              <div className={`p-4 rounded-lg ${cpuPerf.bgColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Rating:</span>
                  <Badge className={cpuPerf.color}>{cpuPerf.rating}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {cpu.info.score >= 90 ? 'Excellent for all modern games including CPU-intensive titles like strategy games and simulators.' :
                   cpu.info.score >= 75 ? 'Good performance in most games. May struggle with very CPU-intensive titles.' :
                   cpu.info.score >= 60 ? 'Adequate for gaming but may limit performance in demanding titles.' :
                   'May struggle with modern games. Consider upgrading for better performance.'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">GPU Gaming Performance</h4>
              <div className={`p-4 rounded-lg ${gpuPerf.bgColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Rating:</span>
                  <Badge className={gpuPerf.color}>{gpuPerf.rating}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {gpu.info.score >= 90 ? 'Exceptional graphics performance. Can handle ray tracing and ultra settings.' :
                   gpu.info.score >= 75 ? 'Strong graphics performance for high settings in most games.' :
                   gpu.info.score >= 60 ? 'Good for medium to high settings in most titles.' :
                   'Entry-level graphics. Best suited for esports titles and older games.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">System Balance</h4>
            <p className="text-sm">
              {bottleneck.component === 'None' ? 
                'Your CPU and GPU are well-balanced, ensuring optimal performance across all gaming scenarios.' :
                `Your ${bottleneck.component} is ${bottleneck.percentage.toFixed(1)}% weaker than your ${bottleneck.component === 'CPU' ? 'GPU' : 'CPU'}, which may limit performance in ${bottleneck.component === 'CPU' ? 'CPU-intensive' : 'graphics-intensive'} games.`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Gaming Recommendations */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            🔹 Gaming Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">Best Suited For: {gameRecs.category}</h4>
            <p className="text-sm mb-3">{gameRecs.description}</p>
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span className="text-sm font-medium">Recommended Settings: {gameRecs.settings}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="font-medium">Game Type Recommendations:</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Esports titles (CS2, Valorant, Apex)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${(cpu.info.score + gpu.info.score) / 2 >= 80 ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                  <span>AAA single-player games</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${gpu.info.score >= 85 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>Ray tracing enabled games</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium">Upgrade Priority:</h5>
              <div className="space-y-2 text-sm">
                {bottleneck.component === 'CPU' && (
                  <p className="text-amber-600">🔸 Consider CPU upgrade for better performance</p>
                )}
                {bottleneck.component === 'GPU' && (
                  <p className="text-amber-600">🔸 Consider GPU upgrade for higher settings</p>
                )}
                {bottleneck.component === 'None' && (
                  <p className="text-green-600">✅ System is well balanced</p>
                )}
                {parseInt(settings.ram) < 16 && (
                  <p className="text-amber-600">🔸 Consider upgrading to 16GB+ RAM</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Scoring */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            🔹 Configuration Scoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h5 className="font-medium mb-2">RAM Configuration</h5>
              <div className={`text-2xl font-bold ${ramScore.color} mb-1`}>
                {ramScore.rating}
              </div>
              <p className="text-sm text-muted-foreground">{settings.ram}GB DDR4/DDR5</p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <h5 className="font-medium mb-2">Storage Performance</h5>
              <div className="text-2xl font-bold text-green-600 mb-1">
                Excellent
              </div>
              <p className="text-sm text-muted-foreground">NVMe SSD (assumed)</p>
            </div>

            <div className="text-center p-4 border rounded-lg">
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

          <div className="bg-muted/50 p-4 rounded-lg">
            <h5 className="font-medium mb-2">Expected Load Times:</h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Game Loading:</span> 5-15 seconds (NVMe SSD)
              </div>
              <div>
                <span className="font-medium">System Boot:</span> 10-20 seconds
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expected Gaming Experience */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            🔹 Expected Gaming Experience at {settings.resolution}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600">🎯 Esports Titles</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="font-medium">CS2 / Valorant</span>
                  <span className="font-bold text-green-600">{getResolutionFPS(cpu.info.score * 3, settings.resolution)}+ FPS</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="font-medium">Fortnite / Apex</span>
                  <span className="font-bold text-green-600">{getResolutionFPS(Math.min(cpu.info.score, gpu.info.score) * 2.5, settings.resolution)}+ FPS</span>
                </div>
                <p className="text-xs text-muted-foreground">Excellent competitive gaming performance</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">🎮 AAA Titles</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="font-medium">Cyberpunk 2077</span>
                  <span className="font-bold text-blue-600">{getResolutionFPS(gpu.info.score * 0.8, settings.resolution)} FPS</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="font-medium">Elden Ring</span>
                  <span className="font-bold text-blue-600">{getResolutionFPS(Math.min(cpu.info.score, gpu.info.score) * 0.9, settings.resolution)} FPS</span>
                </div>
                <p className="text-xs text-muted-foreground">Modern AAA gaming experience</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">⚡ Optimization Tips</h5>
            <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-300">
              {gpu.info.score >= 80 && <li>• Enable DLSS/FSR for better performance with minimal quality loss</li>}
              {bottleneck.component === 'CPU' && <li>• Close background applications while gaming</li>}
              {bottleneck.component === 'GPU' && <li>• Lower shadow quality and anti-aliasing for better FPS</li>}
              <li>• Keep drivers updated for optimal performance</li>
              {cpu.info.score >= 85 && <li>• Consider mild CPU overclocking for extra performance</li>}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Current Market Prices */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">🔹 Current Market Prices</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">CPU Price</p>
                  <p className="font-medium">{cpu.name}</p>
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
                  <p className="font-medium">{gpu.name}</p>
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
                     (marketPrices.gpus[gpu.name as keyof typeof marketPrices.gpus] || 0))}
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
            </span> for {settings.purpose === 'gaming' ? 'gaming' : settings.purpose.replace('_', ' ')}
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {bottleneck.component === 'None' ? 
              `Your system is well-balanced and ready for ${settings.resolution} gaming. You can expect smooth performance in most titles with ${gameRecs.settings.toLowerCase()}.` :
              `Consider upgrading your ${bottleneck.component.toLowerCase()} to eliminate the ${bottleneck.percentage.toFixed(1)}% bottleneck and unlock your system's full potential.`
            }
          </p>

          <Button onClick={onReset} variant="outline" className="flex items-center gap-2 mx-auto">
            <RotateCcw className="h-4 w-4" />
            Calculate Again
          </Button>
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
        <p className="font-medium mb-2">{name}</p>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${performance.bgColor} ${performance.color}`}>
          {performance.rating} ({score}/100)
        </div>
        
        {price && (
          <p className="text-lg font-bold text-green-600 mb-3">
            ${price}
          </p>
        )}
        <Link
          href={`${searchUrl}${encodeURIComponent(searchTerm)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-semibold transition-colors"
        >
          View Benchmarks
          <ExternalLink className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}