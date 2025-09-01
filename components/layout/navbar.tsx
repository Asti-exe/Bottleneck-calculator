'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { FileText } from 'lucide-react';

export function Navbar() {
  return (
    <header className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 font-semibold text-lg hover:text-blue-200 transition-colors">
            <FileText className="h-6 w-6" />
            <span>PC Performance Calculator</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}