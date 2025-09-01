'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ContentGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mb-6">
              Understanding PC Bottlenecks: A Complete Guide to a Balanced System
            </h2>
            
            <p className="text-justify leading-7">
              Welcome to the ultimate resource for PC performance analysis. A <strong>bottleneck</strong> is the single most important concept to understand when building or upgrading a gaming PC. It occurs when one of your components is too slow to keep up with the others, effectively creating a "traffic jam" that limits your entire system's potential. Our <strong>PC Bottleneck Calculator</strong> is designed to instantly identify these issues for you.
            </p>
            
            <p className="text-justify leading-7">
              By preventing <strong>bottlenecks</strong>, you ensure that every dollar you spend on hardware translates directly into the <strong>performance</strong> you expect. A <strong>balanced PC</strong> is a powerful, efficient, and cost-effective PC.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">What is a CPU Bottleneck? (The "Bad" Bottleneck)</h3>
            <p className="text-justify leading-7">
              A <strong>CPU bottleneck</strong> happens when your processor (CPU) cannot process data and instructions fast enough to keep your graphics card (GPU) fully occupied. This is the most common and problematic type of <strong>bottleneck</strong> for gamers, as it leads to inconsistent performance that can't be fixed by simply lowering graphics settings.
            </p>
            
            <p><strong>Common Symptoms:</strong></p>
            <ul className="space-y-2">
              <li><strong>Stuttering</strong> or choppy gameplay, especially during intense action.</li>
              <li>Low <strong>FPS</strong> in <strong>CPU-intensive games</strong> (e.g., Valorant, Counter-Strike 2, or large-scale strategy games).</li>
              <li>Your <strong>GPU usage</strong> is unexpectedly low (e.g., 60-70%) while one or more <strong>CPU cores</strong> are at 100%.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">What is a GPU Bottleneck? (The "Good" Bottleneck)</h3>
            <p className="text-justify leading-7">
              A <strong>GPU bottleneck</strong>, also known as being "GPU limited," occurs when your graphics card is running at full capacity (99-100% usage). It is the component dictating your maximum <strong>frame rate</strong> because it's working as hard as possible to render the best visuals.
            </p>
            
            <p className="text-justify leading-7">
              <strong>This is generally the ideal scenario for gaming.</strong> It means you are getting every bit of <strong>performance</strong> you paid for out of your graphics card. This typically happens when playing graphically demanding AAA titles at high <strong>resolutions</strong> (1440p or 4K) with settings like textures and ray tracing on "Ultra."
            </p>

            <Separator className="my-10" />

            <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mb-6">
              How to Fix a Bottleneck: Your Action Plan
            </h2>
            
            <p className="text-justify leading-7">
              Once our calculator identifies a <strong>bottleneck</strong>, the next step is to address it. Here are the most effective, solution-oriented steps you can take for each scenario.
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
              <h5 className="text-lg font-semibold mb-3">Real-World Example: Upgrading Your CPU for a Modern GPU</h5>
              <p className="text-justify leading-7">
                Consider a user who just upgraded to a brand new, powerful graphics card like the <strong>NVIDIA RTX 4070</strong>. Their existing processor is a well-regarded but older CPU, such as the <strong>AMD Ryzen 5 3600</strong>.
              </p>
              <p className="text-justify leading-7 mt-3">
                <strong>The Solution:</strong> This is a clear <strong>CPU bottleneck</strong>. By <strong>upgrading the CPU</strong> to a modern equivalent like an <strong>AMD Ryzen 5 7600X</strong> or an <strong>Intel Core i5-14600K</strong>, the <strong>system's balance is restored</strong>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}