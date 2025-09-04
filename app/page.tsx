import { Metadata } from 'next';
import { EnhancedBottleneckCalculator } from '@/components/calculators/enhanced-bottleneck-calculator';
import { UpdateBanner } from '@/components/ui/update-banner';
import { InterlinkBox } from '@/components/ui/interlink-box';
import { FAQSection } from '@/components/faq/faq-section';
import { ContentGuide } from '@/components/content/content-guide';

export const metadata: Metadata = {
  title: 'PC Bottleneck Calculator - Check Your CPU & GPU Balance',
  description: 'Instantly check your PC for component bottlenecks. Our free calculator analyzes your CPU and GPU to prevent performance loss and help you build a balanced system.',
  keywords: ['PC bottleneck calculator', 'CPU GPU balance', 'gaming performance', 'system optimization'],
};

export default function HomePage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            PC Performance & Bottleneck Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Unlock your PC's true potential. Our advanced calculator analyzes the critical balance between your CPU and GPU, pinpointing performance bottlenecks to ensure your system is optimized for elite gaming and demanding productivity.
          </p>
          <p className="text-muted-foreground">
            Select your components to analyze your PC's performance balance.
          </p>
        </div>

        <UpdateBanner />
        <EnhancedBottleneckCalculator />

        <InterlinkBox
          title="Curious about gaming performance?"
          description="Estimate your average Frames Per Second in popular titles with our new tool."
          href="/fps-calculator"
          linkText="Try the FPS Estimator →"
          variant="primary"
        />

        <ContentGuide />
        <FAQSection />
      </div>
    </div>
  );
}