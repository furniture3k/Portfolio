import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { BottomNav } from '@/components/layout/BottomNav';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Joshua Trow — Portfolio',
    template: '%s — Joshua Trow',
  },
  description:
    'Joshua Trow is a creative working across fashion, graphic design, branding, and photography.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Joshua Trow',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-bg text-fg antialiased">
        <SmoothScrollProvider>
          {/* pb-nav-h ensures page content is never hidden behind the fixed bottom nav */}
          <main className="pb-nav-h min-h-screen">
            {children}
          </main>
          <BottomNav />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
