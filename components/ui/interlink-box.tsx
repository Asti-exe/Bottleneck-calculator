'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface InterlinkBoxProps {
  title: string;
  description: string;
  href: string;
  linkText: string;
  variant?: 'primary' | 'accent';
}

export function InterlinkBox({ title, description, href, linkText, variant = 'primary' }: InterlinkBoxProps) {
  const colorClasses = {
    primary: 'border-l-primary bg-primary/5 text-primary',
    accent: 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
  };

  const buttonClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    accent: 'bg-amber-500 hover:bg-amber-600 text-white'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`border border-border border-l-4 ${colorClasses[variant]} rounded-lg p-6 text-center`}
    >
      <h4 className={`font-semibold text-lg mb-2 ${colorClasses[variant].split(' ')[2]}`}>
        {title}
      </h4>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link
        href={href}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all duration-200 hover:scale-105 ${buttonClasses[variant]}`}
      >
        {linkText}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}