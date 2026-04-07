import '@/app/globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { LenisProvider } from '@/lib/lenis';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-off-white dark:bg-charcoal text-charcoal dark:text-off-white font-sans transition-colors duration-300">
        <ThemeProvider attribute="class" forcedTheme="dark">
          <LenisProvider>
            <Navbar />
            <CustomCursor />
            <ScrollProgress />
            {children}
            <WhatsAppButton />
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
