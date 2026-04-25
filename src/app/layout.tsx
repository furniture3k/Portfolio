import type { Metadata } from 'next';
import { Unbounded } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-unbounded',
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
    <html lang="en" className={unbounded.variable}>
      <body className="bg-bg text-fg antialiased">
        <SmoothScrollProvider>
          <div
            className="w-full"
            style={{ overflowX: 'clip', maxWidth: '100vw', touchAction: 'pan-y', position: 'relative' }}
          >
            <CustomCursor />
            <ScrollProgress />
            <Header />
            <main className="min-h-screen w-full pt-[56px]">
              {children}
            </main>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
