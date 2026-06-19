import { Bricolage_Grotesque, Inter } from 'next/font/google';

/**
 * Self-hosted (build-time downloaded) fonts via next/font — no blocking CDN.
 * Display: Bricolage Grotesque (expressive, Clash-Display energy).
 * Body: Inter (clean, highly legible).
 * To swap in Satoshi/General Sans/Clash Display from Fontshare, replace these
 * with next/font/local and drop the .woff2 files into /app/fonts.
 */
export const fontDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
});

export const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
