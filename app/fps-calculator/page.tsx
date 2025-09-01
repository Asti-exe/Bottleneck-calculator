import { Metadata } from 'next';
import { FpsCalculator } from '@/components/calculators/fps-calculator';
import { InterlinkBox } from '@/components/ui/interlink-box';
import { FpsGuideContent } from '@/components/content/fps-guide-content';

export const metadata: Metadata = {
  title: 'FPS Estimator Calculator - Gaming Performance Predictor',
  description: 'Estimate the Frames Per Second (FPS) you will get in popular games. Select your CPU, GPU, and a game to see your expected gaming performance.',
  keywords: ['FPS calculator', 'gaming performance', 'frame rate estimator', 'PC gaming'],
};

export default function FpsCalculatorPage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            FPS Estimator Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estimate your average Frames Per Second (FPS) in popular games.
          </p>
        </div>

        <FpsCalculator />

        <InterlinkBox
          title="Is your FPS lower than expected?"
          description="Your hardware balance could be the issue. A system bottleneck can prevent your components from reaching their full potential."
          href="/"
          linkText="Analyze with our Bottleneck Calculator →"
          variant="accent"
        />

        <FpsGuideContent />
      </div>
    </div>
  );
}