import type { Metadata, Viewport } from 'next';
import { Unbounded } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Intro, INTRO_SCRIPT } from '@/components/ui/Intro';
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

export const viewport: Viewport = {
  themeColor: '#ffffff',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the intro script sets data-intro before React hydrates
    <html lang="en" className={unbounded.variable} suppressHydrationWarning>
      <body className="bg-bg text-fg antialiased">
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <Intro />
        <SmoothScrollProvider>
          <div
            className="w-full"
            style={{ overflowX: 'clip', maxWidth: '100vw', touchAction: 'pan-y', position: 'relative' }}
          >
            <CustomCursor />
            <ScrollProgress />
            <Header />
            <main className="min-h-svh w-full pt-nav-h">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
