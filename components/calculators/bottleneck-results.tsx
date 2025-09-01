'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, RotateCcw, DollarSign } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Bottleneck Analysis at {settings.resolution}</CardTitle>
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
            />
            
            <ComponentCard
              title="Graphics Card (GPU)"
              name={gpu.name}
              imageUrl={gpu.info.imageUrl}
              fallbackImage={placeholderImages.gpu}
              searchTerm={gpu.name}
              searchUrl="https://gpu.userbenchmark.com/Search?searchTerm="
              price={marketPrices.gpus[gpu.name as keyof typeof marketPrices.gpus]}
            />
          </div>

          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">Current Market Prices</h3>
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

          <div className="text-center">
            <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Calculate Again
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
}

function ComponentCard({ title, name, imageUrl, fallbackImage, searchTerm, searchUrl, price }: ComponentCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <h4 className="font-semibold mb-4">{title}</h4>
        <div className="mb-4">
          <Image
            src={imageUrl || fallbackImage}
            alt={`${name} logo`}
            width={100}
            height={100}
            className="mx-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
        </div>
        <p className="font-medium mb-3">{name}</p>
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