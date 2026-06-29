import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { fontDisplay, fontSans } from '@/app/fonts';
import { site } from '@/content/site';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — Advertising, Marketing & Technology`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'advertising agency Pune',
    'marketing agency Mumbai',
    'digital marketing',
    'government media',
    'lead generation',
    'DPR creation',
    'web development',
    'Bigadtruck',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} — Advertising, Marketing & Technology`,
    description: site.description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a1a2b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        {/* Opt into JS-driven entrance reveals before first paint. If this never
            runs (no JS), the `.reveal` base state stays visible — content is
            never hidden. Runs synchronously above the page content. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        {children}
      </body>
    </html>
  );
}
