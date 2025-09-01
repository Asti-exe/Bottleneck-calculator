'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Settings, Zap } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const psuData = {
  cpus: {
    "AMD Ryzen 9 9950X3D": 180, "AMD Ryzen 9 9900X3D": 150, "AMD Ryzen 7 9800X3D": 130, "AMD Ryzen 9 9950X": 170,
    "Intel Core Ultra 9 285K": 250, "AMD Ryzen 9 9900X": 150, "AMD Ryzen 7 9700X": 120, "Intel Core Ultra 7 265K": 180,
    "AMD Ryzen 5 9600X": 105, "Intel Core i9-14900K": 253, "AMD Ryzen 9 7950X3D": 120, "Intel Core i9-13900K": 253,
    "AMD Ryzen 7 7800X3D": 120, "Intel Core i7-14700K": 253, "AMD Ryzen 9 7900X": 170, "Intel Core i9-12900K": 241,
    "AMD Ryzen 7 7700X": 105, "Intel Core i5-14600K": 181, "Intel Core i7-13700K": 253, "Intel Core i5-13600K": 181,
    "AMD Ryzen 9 5950X": 105, "AMD Ryzen 5 7600X": 105, "AMD Ryzen 5 7600": 65, "AMD Ryzen 7 5800X3D": 105,
    "Intel Core i9-11900K": 125, "AMD Ryzen 7 5800X": 105, "Intel Core i5-12400": 65, "Intel Core i7-11700K": 125,
    "Intel Core i5-12600K": 150, "AMD Ryzen 9 3950X": 105, "AMD Ryzen 5 5600X": 65, "Intel Core i9-10900K": 125,
    "AMD Ryzen 9 3900X": 105, "Intel Core i5-11600K": 125, "AMD Ryzen 7 3700X": 65, "Intel Core i7-10700K": 125,
    "Intel Core i9-9900K": 95, "AMD Ryzen 5 3600X": 95, "AMD Ryzen 5 3600": 65, "Intel Core i5-10600K": 125,
    "AMD Ryzen 7 2700X": 105, "Intel Core i5-9600K": 95, "Intel Core i7-8700K": 95
  },
  gpus: {
    "NVIDIA GeForce RTX 5090": 500, "NVIDIA GeForce RTX 5080": 350, "NVIDIA GeForce RTX 5070 Ti": 300,
    "AMD Radeon RX 9070 XT": 320, "NVIDIA GeForce RTX 5070": 250, "AMD Radeon RX 9070": 280,
    "Intel Arc Battlemage 24GB": 250, "NVIDIA GeForce RTX 5060 Ti": 200, "AMD Radeon RX 9060 XT": 200,
    "NVIDIA GeForce RTX 5060": 150, "NVIDIA GeForce RTX 5050": 120, "NVIDIA GeForce RTX 4090": 450,
    "AMD Radeon RX 7900 XTX": 355, "NVIDIA GeForce RTX 3090 Ti": 450, "AMD Radeon RX 6950 XT": 335,
    "NVIDIA GeForce RTX 4080 Super": 320, "AMD Radeon RX 7900 XT": 315, "NVIDIA GeForce RTX 4070 Ti Super": 285,
    "NVIDIA GeForce RTX 3080 Ti": 350, "AMD Radeon RX 6900 XT": 300, "NVIDIA GeForce RTX 3080": 320,
    "AMD Radeon RX 6800 XT": 300, "NVIDIA GeForce RTX 4070 Super": 220, "NVIDIA GeForce RTX 3070 Ti": 290,
    "AMD Radeon RX 7800 XT": 263, "NVIDIA GeForce RTX 2080 Ti": 260, "NVIDIA GeForce RTX 3070": 220,
    "AMD Radeon RX 6800": 250, "AMD Radeon RX 7700 XT": 245, "NVIDIA GeForce RTX 4060 Ti": 160,
    "AMD Radeon RX 5700 XT": 225, "NVIDIA GeForce RTX 3060 Ti": 200, "AMD Radeon RX 6700 XT": 230,
    "NVIDIA GeForce RTX 4060": 115, "NVIDIA GeForce RTX 2080 Super": 250, "NVIDIA GeForce GTX 1080 Ti": 250,
    "AMD Radeon RX 6700": 175, "NVIDIA GeForce RTX 3060": 170, "AMD Radeon RX 7600": 165,
    "NVIDIA GeForce RTX 2070 Super": 215, "AMD Radeon RX 6600 XT": 160, "AMD Radeon RX 5700": 180,
    "NVIDIA GeForce RTX 2060 Super": 175, "AMD Radeon RX 6600": 132, "NVIDIA GeForce GTX 1080": 180,
    "AMD Radeon RX 5600 XT": 150, "NVIDIA GeForce RTX 2060": 160, "Intel Arc A770": 225,
    "NVIDIA GeForce GTX 1660 Super": 125, "AMD Radeon RX 590": 225, "AMD Radeon RX 580": 185,
    "NVIDIA GeForce GTX 1070": 150, "NVIDIA GeForce GTX 1660": 120, "AMD Radeon RX 5500 XT": 130,
    "NVIDIA GeForce GTX 970": 145, "AMD Radeon RX 570": 150, "NVIDIA GeForce GTX 1650 Super": 100,
    "NVIDIA GeForce GTX 1060": 120, "Intel Arc A380": 75, "NVIDIA GeForce GTX 1650": 75,
    "NVIDIA GeForce GTX 1050 Ti": 75, "NVIDIA GeForce GTX 750 Ti": 60
  },
  other: {
    RAM_PER_STICK: 5,
    SSD_PER_DRIVE: 8,
    HDD_PER_DRIVE: 10,
    FANS_AND_MOTHERBOARD: 50
  }
};

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
              <Select value={selectedCpu} onValueChange={setSelectedCpu}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select CPU --" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(psuData.cpus).map((cpu) => (
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
                  {Object.keys(psuData.gpus).map((gpu) => (
                    <SelectItem key={gpu} value={gpu}>{gpu}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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