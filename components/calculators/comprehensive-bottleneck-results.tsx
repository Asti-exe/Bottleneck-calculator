import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Monitor,
  Gamepad2,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Zap,
  HardDrive,
  Cpu,
  BarChart3,
  Settings,
  Star
} from 'lucide-react';
import { CPU, GPU, calculateBottleneckPercentage, getBottleneckType, estimateFPS, calculatePSURequirement, allGames } from '@/lib/hardware-database';

interface ComprehensiveBottleneckResultsProps {
  cpu: CPU;
  gpu: GPU;
  ram: { id: string; name: string; tier: string; specs: string; price: number };
  resolution: string;
  onBack: () => void;
}

export function ComprehensiveBottleneckResults({ 
  cpu, 
  gpu, 
  ram, 
  resolution, 
  onBack 
}: ComprehensiveBottleneckResultsProps) {
  const bottleneckPercentage = calculateBottleneckPercentage(cpu, gpu);
  const bottleneckType = getBottleneckType(cpu, gpu);
  const psuRequirement = calculatePSURequirement(cpu, gpu);

  // Resolution impact calculations
  const resolutions = ['1080p', '1440p', '4K'];
  const resolutionImpact = resolutions.map(res => {
    const multiplier = { '1080p': 1.0, '1440p': 0.7, '4K': 0.4 }[res] || 1.0;
    const cpuScore = cpu.benchmarkScore * (res === '1080p' ? 0.9 : 1.0); // CPU matters less at higher res
    const gpuScore = gpu.benchmarkScore * multiplier;
    const limitingFactor = cpuScore < gpuScore ? 'CPU' : 'GPU';
    
    return {
      resolution: res,
      cpuScore: Math.round(cpuScore),
      gpuScore: Math.round(gpuScore),
      limitingFactor,
      estimatedFPS: Math.round(Math.min(cpuScore, gpuScore) * 1.2)
    };
  });

  // Gaming performance assessment
  const cpuGamingScore = Math.min(100, cpu.benchmarkScore + (cpu.cores >= 8 ? 5 : 0) + (cpu.boostClock >= 4.5 ? 5 : 0));
  const gpuGamingScore = gpu.benchmarkScore;
  
  const getCPUGamingRating = (score: number) => {
    if (score >= 90) return { rating: 'Excellent', color: 'text-green-600', description: 'Handles all modern games flawlessly' };
    if (score >= 75) return { rating: 'Very Good', color: 'text-blue-600', description: 'Great for most games with high settings' };
    if (score >= 60) return { rating: 'Good', color: 'text-yellow-600', description: 'Suitable for most games with medium settings' };
    if (score >= 45) return { rating: 'Fair', color: 'text-orange-600', description: 'May struggle with demanding games' };
    return { rating: 'Poor', color: 'text-red-600', description: 'Not recommended for modern gaming' };
  };

  const getGPUGamingRating = (score: number) => {
    if (score >= 90) return { rating: 'Excellent', color: 'text-green-600', description: 'Ultra settings at high resolutions' };
    if (score >= 75) return { rating: 'Very Good', color: 'text-blue-600', description: 'High settings at 1440p+' };
    if (score >= 60) return { rating: 'Good', color: 'text-yellow-600', description: 'Medium-High settings at 1080p-1440p' };
    if (score >= 45) return { rating: 'Fair', color: 'text-orange-600', description: 'Medium settings at 1080p' };
    return { rating: 'Poor', color: 'text-red-600', description: 'Low settings recommended' };
  };

  const cpuRating = getCPUGamingRating(cpuGamingScore);
  const gpuRating = getGPUGamingRating(gpuGamingScore);

  // Configuration scoring
  const getRamScore = (ramId: string) => {
    if (ramId.includes('64gb')) return { score: 'Excellent', color: 'text-green-600', description: 'Overkill for gaming, perfect for content creation' };
    if (ramId.includes('32gb')) return { score: 'Excellent', color: 'text-green-600', description: 'Future-proof, great for multitasking' };
    if (ramId.includes('16gb') && ramId.includes('ddr5')) return { score: 'Very Good', color: 'text-blue-600', description: 'Modern standard, excellent performance' };
    if (ramId.includes('16gb')) return { score: 'Good', color: 'text-yellow-600', description: 'Current gaming standard' };
    if (ramId.includes('8gb')) return { score: 'Fair', color: 'text-orange-600', description: 'Minimum for modern games' };
    return { score: 'Poor', color: 'text-red-600', description: 'Insufficient for modern gaming' };
  };

  const ramScore = getRamScore(ram.id);

  // Gaming recommendations
  const getGameTypeRecommendations = () => {
    const avgScore = (cpu.benchmarkScore + gpu.benchmarkScore) / 2;
    
    if (avgScore >= 85) {
      return {
        primary: 'All Games',
        description: 'Your system can handle any game at high settings',
        games: ['AAA titles at Ultra settings', 'Competitive esports at 240+ FPS', 'VR gaming', 'Content creation']
      };
    } else if (avgScore >= 70) {
      return {
        primary: 'AAA & Esports',
        description: 'Great for most modern games',
        games: ['AAA titles at High settings', 'Esports at 144+ FPS', 'Streaming while gaming']
      };
    } else if (avgScore >= 55) {
      return {
        primary: 'Esports & Casual',
        description: 'Good for competitive and casual gaming',
        games: ['Esports at 60-144 FPS', 'Older AAA titles', 'Indie games']
      };
    } else {
      return {
        primary: 'Casual Gaming',
        description: 'Best suited for less demanding games',
        games: ['Esports at 60 FPS', 'Indie games', 'Older titles']
      };
    }
  };

  const gameRecommendations = getGameTypeRecommendations();

  // Expected gaming experience
  const esportsGames = allGames.filter(game => game.category === 'Esports').slice(0, 4);
  const aaaGames = allGames.filter(game => game.category === 'AAA').slice(0, 4);

  const getSettingsRecommendation = (fps: number) => {
    if (fps >= 120) return { settings: 'Ultra', color: 'text-green-600' };
    if (fps >= 90) return { settings: 'High', color: 'text-blue-600' };
    if (fps >= 60) return { settings: 'Medium', color: 'text-yellow-600' };
    if (fps >= 30) return { settings: 'Low', color: 'text-orange-600' };
    return { settings: 'Very Low', color: 'text-red-600' };
  };

  // Calculate total system price
  const totalSystemPrice = cpu.currentPrice + gpu.currentPrice + ram.price;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Calculator</span>
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">System Analysis Results</h1>
              <p className="text-gray-600 dark:text-gray-400">Comprehensive performance breakdown</p>
            </div>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </CardHeader>
      </Card>

      {/* 🔹 1. Resolution Impact & Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="w-6 h-6 text-blue-600" />
            <span>🔹 Resolution Impact & Benchmarks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resolutionImpact.map((impact) => (
              <div 
                key={impact.resolution}
                className={`p-4 rounded-lg border-2 ${
                  impact.resolution === resolution 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-lg">{impact.resolution}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Estimated: {impact.estimatedFPS} FPS
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CPU Performance</span>
                    <span className="font-medium">{impact.cpuScore}%</span>
                  </div>
                  <Progress value={impact.cpuScore} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GPU Performance</span>
                    <span className="font-medium">{impact.gpuScore}%</span>
                  </div>
                  <Progress value={impact.gpuScore} className="h-2" />
                  
                  <div className="flex items-center justify-center mt-3">
                    <Badge variant={impact.limitingFactor === 'CPU' ? 'destructive' : 'secondary'}>
                      {impact.limitingFactor} Limited
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 🔹 2. Gaming Performance Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gamepad2 className="w-6 h-6 text-green-600" />
            <span>🔹 Gaming Performance Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center space-x-2">
                <Cpu className="w-5 h-5" />
                <span>CPU Gaming Performance</span>
              </h3>
              <div className="flex items-center justify-between">
                <span>Gaming Score</span>
                <span className="font-bold text-lg">{cpuGamingScore}/100</span>
              </div>
              <Progress value={cpuGamingScore} className="h-3" />
              <div className={`font-semibold ${cpuRating.color}`}>
                {cpuRating.rating}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {cpuRating.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>GPU Gaming Performance</span>
              </h3>
              <div className="flex items-center justify-between">
                <span>Gaming Score</span>
                <span className="font-bold text-lg">{gpuGamingScore}/100</span>
              </div>
              <Progress value={gpuGamingScore} className="h-3" />
              <div className={`font-semibold ${gpuRating.color}`}>
                {gpuRating.rating}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {gpuRating.description}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">System Balance</h4>
            <div className="flex items-center space-x-2">
              {bottleneckType === 'Balanced' ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">Well Balanced System</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-600 font-medium">
                    {bottleneckPercentage}% {bottleneckType} Bottleneck
                  </span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 3. Gaming Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-purple-600" />
            <span>🔹 Gaming Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Recommended Game Types</h3>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  {gameRecommendations.primary}
                </div>
                <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                  {gameRecommendations.description}
                </p>
                <ul className="space-y-1">
                  {gameRecommendations.games.map((game, index) => (
                    <li key={index} className="text-sm flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>{game}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Upgrade Priority</h3>
              <div className="space-y-3">
                {bottleneckType === 'CPU' && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-900 dark:text-red-100">Priority: Upgrade CPU</span>
                    </div>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      Your CPU is limiting GPU performance by {bottleneckPercentage}%
                    </p>
                  </div>
                )}
                
                {bottleneckType === 'GPU' && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-900 dark:text-red-100">Priority: Upgrade GPU</span>
                    </div>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      Your GPU is the limiting factor by {bottleneckPercentage}%
                    </p>
                  </div>
                )}

                {bottleneckType === 'Balanced' && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900 dark:text-green-100">Well Balanced</span>
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      No immediate upgrades needed
                    </p>
                  </div>
                )}

                {ram.id.includes('8gb') && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <HardDrive className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-900 dark:text-yellow-100">Consider: More RAM</span>
                    </div>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      16GB recommended for modern gaming
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 4. Configuration Scoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-yellow-600" />
            <span>🔹 Configuration Scoring</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <HardDrive className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold mb-1">Memory (RAM)</h3>
              <div className={`text-lg font-bold ${ramScore.color} mb-2`}>
                {ramScore.score}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {ramScore.description}
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <HardDrive className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold mb-1">Storage</h3>
              <div className="text-lg font-bold text-green-600 mb-2">
                Good
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Modern SSD recommended for best load times
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Star className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold mb-1">Overall Rating</h3>
              <div className="text-lg font-bold text-purple-600 mb-2">
                {bottleneckType === 'Balanced' ? 'Excellent' : 'Good'}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {bottleneckType === 'Balanced' 
                  ? 'Perfect for gaming and productivity' 
                  : 'Good performance with room for improvement'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 5. Bottleneck Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-red-600" />
            <span>🔹 Bottleneck Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {bottleneckPercentage}% {bottleneckType} Bottleneck
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {bottleneckType === 'Balanced' 
                  ? 'Your system components are well matched'
                  : `Your ${bottleneckType} is limiting overall performance`
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">CPU Utilization</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {bottleneckType === 'CPU' ? 'Maxed Out' : 'Optimal'}
                  </span>
                </div>
                <Progress 
                  value={bottleneckType === 'CPU' ? 95 : 75} 
                  className="h-3"
                />
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">GPU Utilization</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {bottleneckType === 'GPU' ? 'Maxed Out' : 'Optimal'}
                  </span>
                </div>
                <Progress 
                  value={bottleneckType === 'GPU' ? 95 : 85} 
                  className="h-3"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Performance Impact</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {bottleneckType === 'Balanced' 
                  ? 'No significant performance loss. Your components work together efficiently.'
                  : `The ${bottleneckType} bottleneck may reduce overall gaming performance by approximately ${bottleneckPercentage}% in ${bottleneckType === 'CPU' ? 'CPU-intensive' : 'graphics-intensive'} scenarios.`
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 6. Expected Gaming Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gamepad2 className="w-6 h-6 text-indigo-600" />
            <span>🔹 Expected Gaming Experience ({resolution})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Esports Titles</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {esportsGames.map((game) => {
                  const fps = estimateFPS(cpu, gpu, game, resolution);
                  const settings = getSettingsRecommendation(fps);
                  return (
                    <div key={game.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{game.name}</span>
                        <span className="font-bold text-blue-600">{fps} FPS</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Recommended</span>
                        <span className={`font-medium ${settings.color}`}>{settings.settings}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span>AAA Titles</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aaaGames.map((game) => {
                  const fps = estimateFPS(cpu, gpu, game, resolution);
                  const settings = getSettingsRecommendation(fps);
                  return (
                    <div key={game.id} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{game.name}</span>
                        <span className="font-bold text-purple-600">{fps} FPS</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Recommended</span>
                        <span className={`font-medium ${settings.color}`}>{settings.settings}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                <span>Optimization Tips</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Graphics Settings</h5>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Enable DLSS/FSR for better performance</li>
                    <li>• Reduce shadow quality for FPS boost</li>
                    <li>• Use medium textures if VRAM limited</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">System Optimization</h5>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Close background applications</li>
                    <li>• Enable Game Mode in Windows</li>
                    <li>• Consider overclocking if cooling allows</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 💰 Current Market Prices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-amber-600" />
            <span>💰 Current Market Prices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">CPU Price</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{cpu.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">${cpu.currentPrice}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Current market price</div>
                </div>
              </div>
              {cpu.launchPrice !== cpu.currentPrice && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Launch price: ${cpu.launchPrice} 
                  <span className={cpu.currentPrice < cpu.launchPrice ? 'text-green-600' : 'text-red-600'}>
                    ({cpu.currentPrice < cpu.launchPrice ? '-' : '+'}${Math.abs(cpu.launchPrice - cpu.currentPrice)})
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100">GPU Price</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">{gpu.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">${gpu.currentPrice}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Current market price</div>
                </div>
              </div>
              {gpu.launchPrice !== gpu.currentPrice && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Launch price: ${gpu.launchPrice}
                  <span className={gpu.currentPrice < gpu.launchPrice ? 'text-green-600' : 'text-red-600'}>
                    ({gpu.currentPrice < gpu.launchPrice ? '-' : '+'}${Math.abs(gpu.launchPrice - gpu.currentPrice)})
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">Total System Value</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">CPU + GPU + RAM combined</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-600">${totalSystemPrice}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Estimated total</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-gray-900 dark:text-gray-100">${cpu.currentPrice}</div>
                <div className="text-gray-600 dark:text-gray-400">CPU</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900 dark:text-gray-100">${gpu.currentPrice}</div>
                <div className="text-gray-600 dark:text-gray-400">GPU</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900 dark:text-gray-100">${ram.price}</div>
                <div className="text-gray-600 dark:text-gray-400">RAM</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span>Power Requirements</span>
            </h4>
            <div className="flex items-center justify-between">
              <span>Recommended PSU</span>
              <span className="font-bold">{psuRequirement}W</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Includes 20% safety margin for stable operation
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Final Recommendation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span>🎯 Final Recommendation Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                System Verdict: {bottleneckType === 'Balanced' ? 'Excellent Build' : 'Good Build with Optimization Potential'}
              </h3>
              <p className="text-sm text-green-800 dark:text-green-200">
                {bottleneckType === 'Balanced' 
                  ? `Your system is well-balanced and ready for ${resolution} gaming. You can expect smooth performance in most games with high settings.`
                  : `Your system will perform well, but upgrading the ${bottleneckType} would unlock ${bottleneckPercentage}% more performance potential.`
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="font-semibold text-blue-900 dark:text-blue-100">Gaming</div>
                <div className="text-blue-700 dark:text-blue-300">{gameRecommendations.primary}</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="font-semibold text-purple-900 dark:text-purple-100">Resolution</div>
                <div className="text-purple-700 dark:text-purple-300">{resolution} Ready</div>
              </div>
              <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="font-semibold text-amber-900 dark:text-amber-100">Value</div>
                <div className="text-amber-700 dark:text-amber-300">${totalSystemPrice} Total</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}