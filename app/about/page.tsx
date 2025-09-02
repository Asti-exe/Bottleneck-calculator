import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { MotionWrapper } from '@/components/ui/motion-wrapper';

export const metadata: Metadata = {
  title: 'About Us - PC Performance Calculator',
  description: 'Learn about our mission to make PC building accessible and help you create balanced, high-performance systems.',
};

export default function AboutPage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-lg">
            <CardContent className="pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-primary mb-6">About Us</h1>
                
                <p className="leading-7">
                  Welcome to the PC Performance Calculator, your go-to resource for building and upgrading PCs with confidence. We are a team of PC enthusiasts and developers passionate about making computer hardware accessible and understandable for everyone.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  Our Mission
                </h2>
                
                <p className="leading-7">
                  Building a personal computer can be a complex and intimidating process. With countless combinations of components available, it's difficult to know which parts will work well together. Our mission is to simplify this process. We provide a powerful, data-driven tool that helps you identify potential performance issues—or "bottlenecks"—before you ever spend a dime.
                </p>
                
                <p className="leading-7">
                  We believe that everyone deserves a PC that performs to its full potential, whether it's for gaming, streaming, video editing, or professional work. Our calculator is designed to empower you with the knowledge to make informed decisions, ensuring you get the most performance for your budget.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  How It Works
                </h2>
                
                <p className="leading-7">
                  Our calculator uses a sophisticated algorithm that analyzes a massive database of component performance benchmarks. By selecting a CPU, GPU, and other system details, our tool simulates how those components will interact under various workloads and resolutions. The result is a simple, clear analysis of your system's balance, along with actionable recommendations to help you optimize your build.
                </p>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
}