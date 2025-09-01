import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { QuickToolsBar } from '@/components/layout/quick-tools-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | PC Performance Calculator',
    default: 'PC Performance Calculator - Check Your CPU & GPU Balance'
  },
  description: 'Instantly check your PC for component bottlenecks. Our free calculator analyzes your CPU and GPU to prevent performance loss and help you build a balanced system.',
  keywords: ['PC bottleneck calculator', 'CPU GPU balance', 'gaming performance', 'FPS calculator', 'PSU calculator'],
  authors: [{ name: 'PC Performance Calculator' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'PC Performance Calculator - Optimize Your Gaming Build',
    description: 'Free tools to analyze CPU/GPU bottlenecks, estimate gaming FPS, and calculate PSU requirements.',
    siteName: 'PC Performance Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PC Performance Calculator',
    description: 'Free tools to analyze CPU/GPU bottlenecks, estimate gaming FPS, and calculate PSU requirements.',
  },
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <QuickToolsBar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}