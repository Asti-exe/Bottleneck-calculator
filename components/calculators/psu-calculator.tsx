'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Settings, Zap } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { calculatorData, psuData } from '@/lib/calculator-data';

export function PsuCalculator() {
  const [selectedCpu, setSelectedCpu] = useState('');
  const [selectedGpu, setSelectedGpu] = useState('');
  const [ramCount, setRamCount] = useState(2);
  const [ssdCount, setSsdCount] = useState(1);
  const [hddCount, setHddCount] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState<{ recommended: number; estimated: number } | null>(null);

  const calculateWattage = () => {
    if (!selectedCpu || !selectedGpu) {
      alert('Please select a CPU and a GPU.');
      return;
    }

    const cpuTdp = psuData.cpus[selectedCpu as keyof typeof psuData.cpus] || 0;
    const gpuTdp = psuData.gpus[selectedGpu as keyof typeof psuData.gpus] || 0;

    const estimatedLoad = cpuTdp + gpuTdp +
      (ramCount * psuData.other.RAM_PER_STICK) +
      (ssdCount * psuData.other.SSD_PER_DRIVE) +
      (hddCount * psuData.other.HDD_PER_DRIVE) +
      psuData.other.FANS_AND_MOTHERBOARD;

    const rawRecommended = estimatedLoad / 0.6;
    const recommendedWattage = Math.ceil(rawRecommended / 50) * 50;

    setResults({
      recommended: recommendedWattage,
      estimated: estimatedLoad
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Power Requirements Calculator</CardTitle>
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

          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-0 h-auto font-semibold text-primary">
                <Settings className="h-4 w-4" />
                Advanced Options
                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ram-count">Number of RAM Sticks</Label>
                  <Input
                    id="ram-count"
                    type="number"
                    min="1"
                    max="8"
                    value={ramCount}
                    onChange={(e) => setRamCount(parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ssd-count">Number of SSD/NVMe Drives</Label>
                  <Input
                    id="ssd-count"
                    type="number"
                    min="0"
                    max="10"
                    value={ssdCount}
                    onChange={(e) => setSsdCount(parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hdd-count">Number of Hard Drives (HDD)</Label>
                  <Input
                    id="hdd-count"
                    type="number"
                    min="0"
                    max="10"
                    value={hddCount}
                    onChange={(e) => setHddCount(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button 
            onClick={calculateWattage}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            Calculate Wattage
          </Button>

          {results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 pt-6 border-t"
            >
              <p className="text-lg">
                Estimated System Load: <strong>~{results.estimated} Watts</strong>
              </p>
              
              <div className="flex flex-col items-center gap-2">
                <Zap className="h-8 w-8 text-primary" />
                <div className="text-7xl font-bold text-primary leading-none">
                  {results.recommended}W
                </div>
                <div className="text-xl text-muted-foreground font-medium">
                  Recommended PSU
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                This recommendation includes headroom for system power spikes and ensures your PSU operates at high efficiency, promoting longevity. It is not a substitute for official manufacturer recommendations.
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}