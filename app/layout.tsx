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
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a1a2b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
