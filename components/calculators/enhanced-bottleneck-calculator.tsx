"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedSearchableSelect } from '@/components/ui/enhanced-searchable-select';
import { ComprehensiveBottleneckResults } from './comprehensive-bottleneck-results';
import { allCPUs, allGPUs, getCPUById, getGPUById } from '@/lib/hardware-database';
import { Cpu, Zap, HardDrive, Monitor, Calculator } from 'lucide-react';

const ramOptions = [
  { id: '8gb-ddr4-2400', name: '8GB DDR4-2400', tier: 'Entry-Level', specs: '8GB, 2400MHz, DDR4', price: 35 },
  { id: '8gb-ddr4-3200', name: '8GB DDR4-3200', tier: 'Budget', specs: '8GB, 3200MHz, DDR4', price: 45 },
  { id: '16gb-ddr4-3200', name: '16GB DDR4-3200', tier: 'Budget', specs: '16GB, 3200MHz, DDR4', price: 65 },
  { id: '16gb-ddr4-3600', name: '16GB DDR4-3600', tier: 'Mid-Range', specs: '16GB, 3600MHz, DDR4', price: 75 },
  { id: '32gb-ddr4-3600', name: '32GB DDR4-3600', tier: 'High-End', specs: '32GB, 3600MHz, DDR4', price: 145 },
  { id: '16gb-ddr5-5600', name: '16GB DDR5-5600', tier: 'Mid-Range', specs: '16GB, 5600MHz, DDR5', price: 95 },
  { id: '32gb-ddr5-5600', name: '32GB DDR5-5600', tier: 'High-End', specs: '32GB, 5600MHz, DDR5', price: 185 },
  { id: '32gb-ddr5-6000', name: '32GB DDR5-6000', tier: 'High-End', specs: '32GB, 6000MHz, DDR5', price: 215 },
  { id: '64gb-ddr5-6000', name: '64GB DDR5-6000', tier: 'High-End', specs: '64GB, 6000MHz, DDR5', price: 425 }
];

const resolutionOptions = [
  { id: '1080p', name: '1920×1080 (1080p)', tier: 'Standard', specs: 'Full HD, 60-144Hz recommended', price: 0 },
  { id: '1440p', name: '2560×1440 (1440p)', tier: 'High-End', specs: 'Quad HD, 144Hz recommended', price: 0 },
  { id: '4K', name: '3840×2160 (4K)', tier: 'Premium', specs: 'Ultra HD, 60-120Hz', price: 0 }
];

export function EnhancedBottleneckCalculator() {
  const [selectedCPU, setSelectedCPU] = useState('');
  const [selectedGPU, setSelectedGPU] = useState('');
  const [selectedRAM, setSelectedRAM] = useState('');
  const [selectedResolution, setSelectedResolution] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Transform CPU data for the select component
  const cpuOptions = allCPUs.map(cpu => ({
    id: cpu.id,
    name: cpu.name,
    tier: cpu.tier,
    benchmarkScore: cpu.benchmarkScore,
    specs: `${cpu.cores}C/${cpu.threads}T, ${cpu.boostClock}GHz, ${cpu.tdp}W`,
    price: cpu.currentPrice
  }));

  // Transform GPU data for the select component
  const gpuOptions = allGPUs.map(gpu => ({
    id: gpu.id,
    name: gpu.name,
    tier: gpu.tier,
    benchmarkScore: gpu.benchmarkScore,
    specs: `${gpu.vram}GB VRAM, ${gpu.boostClock}MHz, ${gpu.tdp}W`,
    price: gpu.currentPrice
  }));

  const handleAnalyze = () => {
    if (selectedCPU && selectedGPU && selectedRAM && selectedResolution) {
      setShowResults(true);
    }
  };

  const isFormComplete = selectedCPU && selectedGPU && selectedRAM && selectedResolution;

  if (showResults) {
    const cpu = getCPUById(selectedCPU);
    const gpu = getGPUById(selectedGPU);
    const ram = ramOptions.find(r => r.id === selectedRAM);
    
    if (cpu && gpu && ram) {
      return (
        <ComprehensiveBottleneckResults
          cpu={cpu}
          gpu={gpu}
          ram={ram}
          resolution={selectedResolution}
          onBack={() => setShowResults(false)}
        />
      );
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
          <Calculator className="w-8 h-8 text-blue-600" />
          <span>Advanced Bottleneck Calculator</span>
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze your system performance with comprehensive hardware database (2017-2025)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Cpu className="w-4 h-4" />
              <span>Processor (CPU)</span>
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
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Zap className="w-4 h-4" />
              <span>Graphics Card (GPU)</span>
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
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <HardDrive className="w-4 h-4" />
              <span>Memory (RAM)</span>
            </label>
            <EnhancedSearchableSelect
              options={ramOptions}
              value={selectedRAM}
              onValueChange={setSelectedRAM}
              placeholder="Select your RAM..."
              type="ram"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Monitor className="w-4 h-4" />
              <span>Gaming Resolution</span>
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
            onClick={handleAnalyze}
            disabled={!isFormComplete}
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            {isFormComplete ? (
              <>
                <Calculator className="w-5 h-5 mr-2" />
                Analyze My System
              </>
            ) : (
              'Please select all components'
            )}
          </Button>
        </div>

        {isFormComplete && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Ready for Analysis</h3>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <p>✓ CPU: {cpuOptions.find(c => c.id === selectedCPU)?.name}</p>
              <p>✓ GPU: {gpuOptions.find(g => g.id === selectedGPU)?.name}</p>
              <p>✓ RAM: {ramOptions.find(r => r.id === selectedRAM)?.name}</p>
              <p>✓ Resolution: {resolutionOptions.find(r => r.id === selectedResolution)?.name}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}