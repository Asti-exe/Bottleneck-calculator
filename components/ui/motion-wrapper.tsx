'use client';

import { motion } from 'framer-motion';

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  whileInView?: any;
  viewport?: any;
}

export function MotionWrapper({ 
  children, 
  className,
  initial,
  animate,
  transition,
  whileInView,
  viewport,
  ...props 
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}