'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, RotateCcw } from 'lucide-react';
import { placeholderImages } from '@/lib/calculator-data';

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
            />
            
            <ComponentCard
              title="Graphics Card (GPU)"
              name={gpu.name}
              imageUrl={gpu.info.imageUrl}
              fallbackImage={placeholderImages.gpu}
              searchTerm={gpu.name}
              searchUrl="https://gpu.userbenchmark.com/Search?searchTerm="
            />
          </div>

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
}

function ComponentCard({ title, name, imageUrl, fallbackImage, searchTerm, searchUrl }: ComponentCardProps) {
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