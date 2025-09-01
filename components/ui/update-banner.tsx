'use client';

import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

export function UpdateBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center gap-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <Rocket className="h-8 w-8 text-green-600" />
        <div>
          <h4 className="font-semibold text-green-800 dark:text-green-200 m-0">
            Database Updated!
          </h4>
          <p className="text-sm text-green-700 dark:text-green-300 m-0">
            Now featuring the latest 2025 CPU & GPU models with up-to-date performance data.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-full text-xs font-bold text-green-800 dark:text-green-200 whitespace-nowrap">
        <Sparkles className="h-3 w-3" />
        Latest
      </div>
    </motion.div>
  );
}