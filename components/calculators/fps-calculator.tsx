'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { calculatorData } from '@/lib/calculator-data';

interface GameData {
  baseFps: number;
  cpuWeight: number;
  gpuWeight: number;
}

const gamesData: Record<string, GameData> = {
  "Cyberpunk 2077": { baseFps: 70, cpuWeight: 0.4, gpuWeight: 0.6 },
  "Valorant": { baseFps: 350, cpuWeight: 0.7, gpuWeight: 0.3 },
  "Call of Duty: Modern Warfare III": { baseFps: 140, cpuWeight: 0.5, gpuWeight: 0.5 },
  "Starfield": { baseFps: 60, cpuWeight: 0.6, gpuWeight: 0.4 },
  "Baldur's Gate 3": { baseFps: 90, cpuWeight: 0.65, gpuWeight: 0.35 },
  "Fortnite": { baseFps: 200, cpuWeight: 0.6, gpuWeight: 0.4 },
  "Apex Legends": { baseFps: 180, cpuWeight: 0.5, gpuWeight: 0.5 },
  "Red Dead Redemption 2": { baseFps: 80, cpuWeight: 0.4, gpuWeight: 0.6 },
  "The Witcher 3: Wild Hunt": { baseFps: 110, cpuWeight: 0.3, gpuWeight: 0.7 },
  "Elden Ring": { baseFps: 60, cpuWeight: 0.5, gpuWeight: 0.5 },
  "Counter-Strike 2": { baseFps: 300, cpuWeight: 0.7, gpuWeight: 0.3 },
};

const resolutionMultipliers = {
  "1080p": 1.2,
  "1440p": 1.0,
  "4k": 0.7
};

export function FpsCalculator() {
  const [selectedCpu, setSelectedCpu] = useState('');
  const [selectedGpu, setSelectedGpu] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedResolution, setSelectedResolution] = useState('1440p');
  const [results, setResults] = useState<{ fps: number; game: string; resolution: string } | null>(null);

  const getPerformanceScore = (componentScore: number) => {
    return Math.pow(componentScore / 100, 0.7);
  };

  const calculateFps = () => {
    if (!selectedCpu || !selectedGpu || !selectedGame) {
      alert('Please select a CPU, GPU, and a game.');
      return;
    }

    const cpuData = calculatorData.cpus[selectedCpu as keyof typeof calculatorData.cpus];
    const gpuData = calculatorData.gpus[selectedGpu as keyof typeof calculatorData.gpus];
    
    if (!cpuData || !gpuData) {
      alert('Invalid component selection.');
      return;
    }

    const cpuScore = getPerformanceScore(cpuData.score);
    const gpuScore = getPerformanceScore(gpuData.score);
    const game = gamesData[selectedGame];
    const resMultiplier = resolutionMultipliers[selectedResolution as keyof typeof resolutionMultipliers];

    const weightedHardwareScore = (cpuScore * game.cpuWeight) + (gpuScore * game.gpuWeight);
    const estimatedFps = game.baseFps * weightedHardwareScore * resMultiplier;

    setResults({
      fps: Math.round(estimatedFps),
      game: selectedGame,
      resolution: selectedResolution
    });
  };

  const getPerformanceTier = (fps: number) => {
    if (fps < 30) return { tier: 'struggle', color: 'text-destructive' };
    if (fps < 60) return { tier: 'playable', color: 'text-amber-600' };
    if (fps > 120) return { tier: 'excellent', color: 'text-green-600' };
    return { tier: 'smooth', color: 'text-primary' };
  };

  const getPerformanceMessage = (fps: number) => {
    const messages = {
      struggle: 'The game will likely struggle to run at playable framerates. Expect significant performance issues.',
      playable: 'You should get a playable experience, though you may need to lower some settings for consistent performance.',
      smooth: 'You can expect a smooth gaming experience at these settings.',
      excellent: 'Your system should provide an excellent, high-framerate experience in this title.'
    };
    
    const tier = getPerformanceTier(fps).tier as keyof typeof messages;
    return messages[tier];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Gaming Performance Estimator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpu-select">Processor (CPU)</Label>
              <Select value={selectedCpu} onValueChange={setSelectedCpu}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select CPU --" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(calculatorData.cpus).map((cpu) => (
                    <SelectItem key={cpu} value={cpu}>{cpu}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpu-select">Graphics Card (GPU)</Label>
              <Select value={selectedGpu} onValueChange={setSelectedGpu}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select GPU --" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(calculatorData.gpus).map((gpu) => (
                    <SelectItem key={gpu} value={gpu}>{gpu}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="game-select">Select a Game</Label>
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select Game --" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(gamesData).map((game) => (
                    <SelectItem key={game} value={game}>{game}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution-select">Target Resolution</Label>
              <Select value={selectedResolution} onValueChange={setSelectedResolution}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1080p">1080p (FHD)</SelectItem>
                  <SelectItem value="1440p">1440p (QHD)</SelectItem>
                  <SelectItem value="4k">4K (UHD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={calculateFps}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            Estimate My FPS
          </Button>

          {results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4 pt-6 border-t"
            >
              <p className="text-lg">
                Estimated average performance for <strong>{results.game}</strong> at <strong>{results.resolution}</strong>:
              </p>
              
              <div className={`text-7xl font-bold ${getPerformanceTier(results.fps).color} leading-none`}>
                {results.fps}
              </div>
              
              <div className="text-xl text-muted-foreground font-medium">
                Average FPS
              </div>
              
              <p className="text-base max-w-md mx-auto leading-relaxed">
                {getPerformanceMessage(results.fps)}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}