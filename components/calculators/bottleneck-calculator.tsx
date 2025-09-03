'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { calculatorData, placeholderImages, ComponentData, getSortedComponents } from '@/lib/calculator-data';
import { BottleneckResults } from './bottleneck-results';

interface CalculationResults {
  cpu: { name: string; info: ComponentData };
  gpu: { name: string; info: ComponentData };
  bottleneck: { percentage: number; component: string };
  settings: {
    resolution: string;
    ram: string;
    purpose: string;
  };
}

export function BottleneckCalculator() {
  const [selectedCpu, setSelectedCpu] = useState('');
  const [selectedGpu, setSelectedGpu] = useState('');
  const [selectedRam, setSelectedRam] = useState('16');
  const [selectedResolution, setSelectedResolution] = useState('1440p');
  const [selectedPurpose, setSelectedPurpose] = useState('gaming');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState<CalculationResults | null>(null);

  const calculateBottleneck = () => {
    if (!selectedCpu || !selectedGpu) {
      alert('Please select both a CPU and a GPU.');
      return;
    }

    const cpuInfo = calculatorData.cpus[selectedCpu as keyof typeof calculatorData.cpus];
    const gpuInfo = calculatorData.gpus[selectedGpu as keyof typeof calculatorData.gpus];
    
    if (!cpuInfo || !gpuInfo) {
      alert('Invalid component selection.');
      return;
    }

    const purposeMod = calculatorData.purposeImpact[selectedPurpose as keyof typeof calculatorData.purposeImpact];
    const resMod = calculatorData.resolutionImpact[selectedResolution as keyof typeof calculatorData.resolutionImpact];
    const ramMod = calculatorData.ramImpact[selectedRam as keyof typeof calculatorData.ramImpact];

    const finalCpuScore = cpuInfo.score * purposeMod.cpu * ramMod;
    const finalGpuScore = gpuInfo.score * purposeMod.gpu * resMod;

    let bottleneck = { percentage: 0, component: 'None' };

    if (finalCpuScore > finalGpuScore * 1.05) {
      bottleneck = {
        percentage: ((finalCpuScore - finalGpuScore) / finalCpuScore) * 100,
        component: 'CPU'
      };
    } else if (finalGpuScore > finalCpuScore * 1.05) {
      bottleneck = {
        percentage: ((finalGpuScore - finalCpuScore) / finalGpuScore) * 100,
        component: 'GPU'
      };
    }

    setResults({
      cpu: { name: selectedCpu, info: cpuInfo },
      gpu: { name: selectedGpu, info: gpuInfo },
      bottleneck,
      settings: {
        resolution: selectedResolution,
        ram: selectedRam,
        purpose: selectedPurpose
      }
    });
  };

  const resetCalculator = () => {
    setResults(null);
  };

  if (results) {
    return <BottleneckResults results={results} onReset={resetCalculator} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Component Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpu-select">Processor (CPU)</Label>
              <SearchableSelect
                value={selectedCpu}
                onValueChange={setSelectedCpu}
                placeholder="-- Select CPU --"
                options={Object.keys(calculatorData.cpus)}
                type="cpu"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpu-select">Graphics Card (GPU)</Label>
              <SearchableSelect
                value={selectedGpu}
                onValueChange={setSelectedGpu}
                placeholder="-- Select GPU --"
                options={Object.keys(calculatorData.gpus)}
                type="gpu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resolution-select">Target Resolution</Label>
            <Select value={selectedResolution} onValueChange={setSelectedResolution}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1080p">1080p (1920x1080)</SelectItem>
                <SelectItem value="1440p">1440p (2560x1440)</SelectItem>
                <SelectItem value="4k">4K (3840x2160)</SelectItem>
                <SelectItem value="ultrawide">Ultrawide (3440x1440)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-0 h-auto font-semibold text-primary">
                <Settings className="h-4 w-4" />
                Advanced Options
                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ram-select">System RAM</Label>
                  <Select value={selectedRam} onValueChange={setSelectedRam}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">8 GB</SelectItem>
                      <SelectItem value="16">16 GB</SelectItem>
                      <SelectItem value="32">32 GB</SelectItem>
                      <SelectItem value="64">64+ GB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose-select">Primary Use Case</Label>
                  <Select value={selectedPurpose} onValueChange={setSelectedPurpose}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="streaming">Gaming & Streaming</SelectItem>
                      <SelectItem value="video_editing">Video Editing</SelectItem>
                      <SelectItem value="3d_rendering">3D Rendering & Design</SelectItem>
                      <SelectItem value="general">General & Office Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button 
            onClick={calculateBottleneck}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            Analyze My System
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}