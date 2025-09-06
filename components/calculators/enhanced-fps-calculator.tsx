import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedSearchableSelect } from '@/components/ui/enhanced-searchable-select';
import { allCPUs, allGPUs, allGames, getCPUById, getGPUById, getGameById, estimateFPS } from '@/lib/hardware-database';
import { Gamepad2, Monitor, BarChart3, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const resolutionOptions = [
  { id: '1080p', name: '1920×1080 (1080p)', tier: 'Standard', specs: 'Full HD, 60-144Hz recommended', price: 0 },
  { id: '1440p', name: '2560×1440 (1440p)', tier: 'High-End', specs: 'Quad HD, 144Hz recommended', price: 0 },
  { id: '4K', name: '3840×2160 (4K)', tier: 'Premium', specs: 'Ultra HD, 60-120Hz', price: 0 }
];

export function EnhancedFPSCalculator() {
  const [selectedCPU, setSelectedCPU] = useState('');
  const [selectedGPU, setSelectedGPU] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedResolution, setSelectedResolution] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Transform data for select components
  const cpuOptions = allCPUs.map(cpu => ({
    id: cpu.id,
    name: cpu.name,
    tier: cpu.tier,
    benchmarkScore: cpu.benchmarkScore,
    specs: `${cpu.cores}C/${cpu.threads}T, ${cpu.boostClock}GHz`,
    price: cpu.currentPrice
  }));

  const gpuOptions = allGPUs.map(gpu => ({
    id: gpu.id,
    name: gpu.name,
    tier: gpu.tier,
    benchmarkScore: gpu.benchmarkScore,
    specs: `${gpu.vram}GB VRAM, ${gpu.boostClock}MHz`,
    price: gpu.currentPrice
  }));

  const gameOptions = allGames.map(game => ({
    id: game.id,
    name: game.name,
    tier: game.category,
    specs: `${game.releaseYear}, ${game.cpuDemand} CPU / ${game.gpuDemand} GPU demand`,
    price: 0
  }));

  const handleCalculate = () => {
    if (selectedCPU && selectedGPU && selectedGame && selectedResolution) {
      setShowResults(true);
    }
  };

  const isFormComplete = selectedCPU && selectedGPU && selectedGame && selectedResolution;

  if (showResults) {
    const cpu = getCPUById(selectedCPU);
    const gpu = getGPUById(selectedGPU);
    const game = getGameById(selectedGame);
    
    if (cpu && gpu && game) {
      const estimatedFPS = estimateFPS(cpu, gpu, game, selectedResolution);
      
      // Calculate FPS for all resolutions
      const allResolutionFPS = resolutionOptions.map(res => ({
        resolution: res.name,
        fps: estimateFPS(cpu, gpu, game, res.id)
      }));

      const getPerformanceRating = (fps: number) => {
        if (fps >= 120) return { rating: 'Excellent', color: 'text-green-600', description: 'Smooth high refresh rate gaming' };
        if (fps >= 90) return { rating: 'Very Good', color: 'text-blue-600', description: 'Great gaming experience' };
        if (fps >= 60) return { rating: 'Good', color: 'text-yellow-600', description: 'Playable with good experience' };
        if (fps >= 30) return { rating: 'Fair', color: 'text-orange-600', description: 'Playable but not ideal' };
        return { rating: 'Poor', color: 'text-red-600', description: 'Not recommended' };
      };

      const performanceRating = getPerformanceRating(estimatedFPS);

      return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowResults(false)}
                  className="flex items-center space-x-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Back to Calculator</span>
                </Button>
                <div className="text-center">
                  <h1 className="text-2xl font-bold">FPS Analysis Results</h1>
                  <p className="text-gray-600 dark:text-gray-400">{game.name} Performance</p>
                </div>
                <div className="w-32" />
              </div>
            </CardHeader>
          </Card>

          {/* Main FPS Result */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <span>Performance Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-blue-600 mb-2">{estimatedFPS}</div>
                <div className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  Average FPS at {selectedResolution}
                </div>
                <div className={`text-lg font-semibold ${performanceRating.color} mb-2`}>
                  {performanceRating.rating}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {performanceRating.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allResolutionFPS.map((result, index) => (
                  <div 
                    key={result.resolution}
                    className={`p-4 rounded-lg border-2 ${
                      result.resolution.includes(selectedResolution) 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="text-center">
                      <h3 className="font-semibold">{result.resolution}</h3>
                      <div className="text-2xl font-bold text-blue-600 my-2">{result.fps} FPS</div>
                      <Progress value={Math.min(100, (result.fps / 144) * 100)} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Components */}
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <img src={cpu.imageUrl} alt={cpu.name} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <h3 className="font-semibold">{cpu.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {cpu.cores}C/{cpu.threads}T, {cpu.boostClock}GHz
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <img src={gpu.imageUrl} alt={gpu.name} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <h3 className="font-semibold">{gpu.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {gpu.vram}GB VRAM, {gpu.boostClock}MHz
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="font-semibold mb-2">Game Requirements</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>CPU Demand:</span>
                        <span className="font-medium">{game.cpuDemand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GPU Demand:</span>
                        <span className="font-medium">{game.gpuDemand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RAM Required:</span>
                        <span className="font-medium">{game.ramRequirement}GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage:</span>
                        <span className="font-medium">{game.storageRequirement}GB</span>
                      </div>
                    </div>
                  </div>

                  {game.optimizations.length > 0 && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-semibold mb-2 text-green-900 dark:text-green-100">
                        Available Optimizations
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {game.optimizations.map((opt, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded text-xs font-medium"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
          <Gamepad2 className="w-8 h-8 text-green-600" />
          <span>Advanced FPS Calculator</span>
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate expected frame rates with latest hardware and games (2017-2025)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Processor (CPU)
            </label>
            <EnhancedSearchableSelect
              options={cpuOptions}
              value={selectedCPU}
              onValueChange={setSelectedCPU}
              placeholder="Select your CPU..."
              type="cpu"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Graphics Card (GPU)
            </label>
            <EnhancedSearchableSelect
              options={gpuOptions}
              value={selectedGPU}
              onValueChange={setSelectedGPU}
              placeholder="Select your GPU..."
              type="gpu"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Game Title
            </label>
            <EnhancedSearchableSelect
              options={gameOptions}
              value={selectedGame}
              onValueChange={setSelectedGame}
              placeholder="Select a game..."
              type="cpu"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Gaming Resolution
            </label>
            <EnhancedSearchableSelect
              options={resolutionOptions}
              value={selectedResolution}
              onValueChange={setSelectedResolution}
              placeholder="Select resolution..."
              type="resolution"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleCalculate}
            disabled={!isFormComplete}
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            {isFormComplete ? (
              <>
                <BarChart3 className="w-5 h-5 mr-2" />
                Calculate FPS
              </>
            ) : (
              'Please select all options'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}