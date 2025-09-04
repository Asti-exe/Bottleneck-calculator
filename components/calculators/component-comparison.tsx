import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedSearchableSelect } from '@/components/ui/enhanced-searchable-select';
import { allCPUs, allGPUs, getCPUById, getGPUById } from '@/lib/hardware-database';
import { BarChart3, Cpu, Zap, TrendingUp, TrendingDown, Minus, DollarSign } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export function ComponentComparison() {
  const [selectedCPU1, setSelectedCPU1] = useState('');
  const [selectedCPU2, setSelectedCPU2] = useState('');
  const [selectedGPU1, setSelectedGPU1] = useState('');
  const [selectedGPU2, setSelectedGPU2] = useState('');
  const [comparisonType, setComparisonType] = useState<'cpu' | 'gpu'>('cpu');

  // Transform data for select components
  const cpuOptions = allCPUs.map(cpu => ({
    id: cpu.id,
    name: cpu.name,
    tier: cpu.tier,
    benchmarkScore: cpu.benchmarkScore,
    imageUrl: cpu.imageUrl,
    specs: `${cpu.cores}C/${cpu.threads}T, ${cpu.boostClock}GHz`,
    price: cpu.currentPrice
  }));

  const gpuOptions = allGPUs.map(gpu => ({
    id: gpu.id,
    name: gpu.name,
    tier: gpu.tier,
    benchmarkScore: gpu.benchmarkScore,
    imageUrl: gpu.imageUrl,
    specs: `${gpu.vram}GB VRAM, ${gpu.boostClock}MHz`,
    price: gpu.currentPrice
  }));

  const renderCPUComparison = () => {
    const cpu1 = getCPUById(selectedCPU1);
    const cpu2 = getCPUById(selectedCPU2);

    if (!cpu1 || !cpu2) return null;

    const performanceDiff = ((cpu1.benchmarkScore - cpu2.benchmarkScore) / cpu2.benchmarkScore) * 100;
    const priceDiff = cpu1.currentPrice - cpu2.currentPrice;
    const valueRatio1 = cpu1.benchmarkScore / cpu1.currentPrice;
    const valueRatio2 = cpu2.benchmarkScore / cpu2.currentPrice;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CPU 1 */}
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <img src={cpu1.imageUrl} alt={cpu1.name} className="w-12 h-12 rounded object-cover" />
                <div>
                  <CardTitle className="text-lg">{cpu1.name}</CardTitle>
                  <Badge variant="secondary">{cpu1.tier}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Performance Score</span>
                  <span className="font-bold">{cpu1.benchmarkScore}/100</span>
                </div>
                <Progress value={cpu1.benchmarkScore} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Cores/Threads</span>
                    <div className="font-medium">{cpu1.cores}C/{cpu1.threads}T</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Boost Clock</span>
                    <div className="font-medium">{cpu1.boostClock}GHz</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">TDP</span>
                    <div className="font-medium">{cpu1.tdp}W</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Price</span>
                    <div className="font-medium text-green-600">${cpu1.currentPrice}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CPU 2 */}
          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <img src={cpu2.imageUrl} alt={cpu2.name} className="w-12 h-12 rounded object-cover" />
                <div>
                  <CardTitle className="text-lg">{cpu2.name}</CardTitle>
                  <Badge variant="secondary">{cpu2.tier}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Performance Score</span>
                  <span className="font-bold">{cpu2.benchmarkScore}/100</span>
                </div>
                <Progress value={cpu2.benchmarkScore} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Cores/Threads</span>
                    <div className="font-medium">{cpu2.cores}C/{cpu2.threads}T</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Boost Clock</span>
                    <div className="font-medium">{cpu2.boostClock}GHz</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">TDP</span>
                    <div className="font-medium">{cpu2.tdp}W</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Price</span>
                    <div className="font-medium text-green-600">${cpu2.currentPrice}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Comparison Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {performanceDiff > 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : performanceDiff < 0 ? (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  ) : (
                    <Minus className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className="font-semibold">Performance</div>
                <div className={`text-lg font-bold ${
                  performanceDiff > 0 ? 'text-green-600' : 
                  performanceDiff < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {performanceDiff > 0 ? '+' : ''}{performanceDiff.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {cpu1.name} vs {cpu2.name}
                </div>
              </div>

              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="w-5 h-5 mx-auto mb-2 text-green-600" />
                <div className="font-semibold">Price Difference</div>
                <div className={`text-lg font-bold ${
                  priceDiff > 0 ? 'text-red-600' : 
                  priceDiff < 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {priceDiff > 0 ? '+' : ''}${priceDiff}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Cost difference
                </div>
              </div>

              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <BarChart3 className="w-5 h-5 mx-auto mb-2 text-purple-600" />
                <div className="font-semibold">Value Winner</div>
                <div className="text-lg font-bold text-purple-600">
                  {valueRatio1 > valueRatio2 ? cpu1.name.split(' ').slice(-1)[0] : cpu2.name.split(' ').slice(-1)[0]}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Best performance per dollar
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderGPUComparison = () => {
    const gpu1 = getGPUById(selectedGPU1);
    const gpu2 = getGPUById(selectedGPU2);

    if (!gpu1 || !gpu2) return null;

    const performanceDiff = ((gpu1.benchmarkScore - gpu2.benchmarkScore) / gpu2.benchmarkScore) * 100;
    const priceDiff = gpu1.currentPrice - gpu2.currentPrice;
    const valueRatio1 = gpu1.benchmarkScore / gpu1.currentPrice;
    const valueRatio2 = gpu2.benchmarkScore / gpu2.currentPrice;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GPU 1 */}
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <img src={gpu1.imageUrl} alt={gpu1.name} className="w-12 h-12 rounded object-cover" />
                <div>
                  <CardTitle className="text-lg">{gpu1.name}</CardTitle>
                  <Badge variant="secondary">{gpu1.tier}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Performance Score</span>
                  <span className="font-bold">{gpu1.benchmarkScore}/100</span>
                </div>
                <Progress value={gpu1.benchmarkScore} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">VRAM</span>
                    <div className="font-medium">{gpu1.vram}GB</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Boost Clock</span>
                    <div className="font-medium">{gpu1.boostClock}MHz</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">TDP</span>
                    <div className="font-medium">{gpu1.tdp}W</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Price</span>
                    <div className="font-medium text-green-600">${gpu1.currentPrice}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GPU 2 */}
          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <img src={gpu2.imageUrl} alt={gpu2.name} className="w-12 h-12 rounded object-cover" />
                <div>
                  <CardTitle className="text-lg">{gpu2.name}</CardTitle>
                  <Badge variant="secondary">{gpu2.tier}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Performance Score</span>
                  <span className="font-bold">{gpu2.benchmarkScore}/100</span>
                </div>
                <Progress value={gpu2.benchmarkScore} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">VRAM</span>
                    <div className="font-medium">{gpu2.vram}GB</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Boost Clock</span>
                    <div className="font-medium">{gpu2.boostClock}MHz</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">TDP</span>
                    <div className="font-medium">{gpu2.tdp}W</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Price</span>
                    <div className="font-medium text-green-600">${gpu2.currentPrice}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Comparison Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {performanceDiff > 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : performanceDiff < 0 ? (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  ) : (
                    <Minus className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className="font-semibold">Performance</div>
                <div className={`text-lg font-bold ${
                  performanceDiff > 0 ? 'text-green-600' : 
                  performanceDiff < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {performanceDiff > 0 ? '+' : ''}{performanceDiff.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {gpu1.name.split(' ').slice(-1)[0]} vs {gpu2.name.split(' ').slice(-1)[0]}
                </div>
              </div>

              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="w-5 h-5 mx-auto mb-2 text-green-600" />
                <div className="font-semibold">Price Difference</div>
                <div className={`text-lg font-bold ${
                  priceDiff > 0 ? 'text-red-600' : 
                  priceDiff < 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {priceDiff > 0 ? '+' : ''}${priceDiff}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Cost difference
                </div>
              </div>

              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <BarChart3 className="w-5 h-5 mx-auto mb-2 text-purple-600" />
                <div className="font-semibold">Value Winner</div>
                <div className="text-lg font-bold text-purple-600">
                  {valueRatio1 > valueRatio2 ? gpu1.name.split(' ').slice(-1)[0] : gpu2.name.split(' ').slice(-1)[0]}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Best performance per dollar
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <span>Component Comparison Tool</span>
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Compare CPUs and GPUs side by side with detailed analysis
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <Button
                variant={comparisonType === 'cpu' ? 'default' : 'ghost'}
                onClick={() => setComparisonType('cpu')}
                className="flex items-center space-x-2"
              >
                <Cpu className="w-4 h-4" />
                <span>Compare CPUs</span>
              </Button>
              <Button
                variant={comparisonType === 'gpu' ? 'default' : 'ghost'}
                onClick={() => setComparisonType('gpu')}
                className="flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Compare GPUs</span>
              </Button>
            </div>
          </div>

          {comparisonType === 'cpu' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First CPU
                  </label>
                  <EnhancedSearchableSelect
                    options={cpuOptions}
                    value={selectedCPU1}
                    onValueChange={setSelectedCPU1}
                    placeholder="Select first CPU..."
                    type="cpu"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Second CPU
                  </label>
                  <EnhancedSearchableSelect
                    options={cpuOptions}
                    value={selectedCPU2}
                    onValueChange={setSelectedCPU2}
                    placeholder="Select second CPU..."
                    type="cpu"
                  />
                </div>
              </div>

              {selectedCPU1 && selectedCPU2 && renderCPUComparison()}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First GPU
                  </label>
                  <EnhancedSearchableSelect
                    options={gpuOptions}
                    value={selectedGPU1}
                    onValueChange={setSelectedGPU1}
                    placeholder="Select first GPU..."
                    type="gpu"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Second GPU
                  </label>
                  <EnhancedSearchableSelect
                    options={gpuOptions}
                    value={selectedGPU2}
                    onValueChange={setSelectedGPU2}
                    placeholder="Select second GPU..."
                    type="gpu"
                  />
                </div>
              </div>

              {selectedGPU1 && selectedGPU2 && renderGPUComparison()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}