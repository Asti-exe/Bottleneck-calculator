import { Metadata } from 'next';
import { PsuCalculator } from '@/components/calculators/psu-calculator';
import { InterlinkBox } from '@/components/ui/interlink-box';

export const metadata: Metadata = {
  title: 'PSU Wattage Calculator - Power Your PC Build',
  description: 'Calculate the recommended power supply (PSU) wattage for your PC build. Select your CPU and GPU to get an estimated load and a safe PSU recommendation.',
  keywords: ['PSU calculator', 'power supply calculator', 'PC wattage', 'system power requirements'],
};

export default function PsuCalculatorPage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            PSU Wattage Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ensure your PC has enough power. Select your core components to get a recommended PSU wattage.
          </p>
        </div>

        <PsuCalculator />

        <InterlinkBox
          title="Got your power sorted?"
          description="Now, make sure your CPU and GPU are a balanced match for peak performance. An unbalanced system can waste your hardware's potential."
          href="/"
          linkText="Check for Bottlenecks →"
          variant="primary"
        />
      </div>
    </div>
  );
}