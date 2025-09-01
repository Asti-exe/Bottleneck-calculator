'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function FpsGuideContent() {
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
              Understanding Your Gaming Performance: The FPS Calculator
            </h2>
            
            <p className="text-justify leading-7">
              In the world of PC gaming, <strong>Frames Per Second (FPS)</strong> is the ultimate measure of performance. It represents how many individual images your computer can display every second, directly translating to the smoothness of your gameplay. A high, stable FPS means a fluid, responsive experience, while a low FPS leads to stuttering and lag.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Why Estimate Your FPS?</h3>
            <p className="text-justify leading-7">
              Knowing your potential <strong>gaming performance</strong> before you buy a new game or upgrade a component is crucial. It empowers you to make informed decisions, manage expectations, and avoid the disappointment of a purchase that your PC can't handle.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">How Does the FPS Calculator Work?</h3>
            <p className="text-justify leading-7">Our calculator uses a sophisticated model based on thousands of real-world benchmarks. It considers three key factors:</p>
            
            <ul className="space-y-3">
              <li><strong>Your CPU's Power:</strong> The processor handles the game's logic, physics, and AI. In many eSports titles, the CPU is the primary driver of high frame rates.</li>
              <li><strong>Your GPU's Power:</strong> The graphics card is responsible for rendering the visuals. In graphically intense AAA titles, the GPU does the heaviest lifting.</li>
              <li><strong>Your Target Resolution:</strong> Playing at 4K requires your GPU to render four times as many pixels as 1080p, which has a massive impact on the final FPS.</li>
            </ul>

            <Separator className="my-10" />

            <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mb-6">
              Low FPS? Your Next Steps to a Better Gaming Experience
            </h2>

            <h3 className="text-xl font-semibold mt-8 mb-4">Step 1: Diagnose the Core Issue with Our Bottleneck Calculator</h3>
            <p className="text-justify leading-7">
              Before you consider an upgrade, you need to know <em>why</em> your FPS is low. Is your powerful GPU being held back by an older CPU? Or is your GPU simply not strong enough for your desired settings?
            </p>
            <p className="text-justify leading-7">
              Our <strong><Link href="/" className="text-primary hover:underline">PC Bottleneck Calculator</Link></strong> is the perfect diagnostic tool. It analyzes the synergy between your CPU and GPU to pinpoint the exact weak link in your system.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Step 2: Ensure You Have Enough Power for an Upgrade</h3>
            <p className="text-justify leading-7">
              If you're planning a GPU upgrade to boost your FPS, there's one critical step you can't ignore: your Power Supply Unit (PSU). Modern graphics cards can be very power-hungry.
            </p>
            <p className="text-justify leading-7">
              Use our <strong><Link href="/psu-calculator" className="text-primary hover:underline">PSU Wattage Calculator</Link></strong> to ensure your power supply can handle any new hardware you're considering.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}