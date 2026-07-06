import { organizationJsonLd, localBusinessJsonLd, websiteJsonLd } from '@/lib/seo';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Cursor } from '@/components/layout/Cursor';
import { PageTransition } from '@/components/layout/PageTransition';
import { ChatAssistant } from '@/components/layout/ChatAssistant';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { MotionProvider } from '@/components/layout/MotionProvider';

/**
 * Chrome for the public marketing site: smooth scroll, custom cursor, navbar,
 * footer, page transitions and site-wide structured data. The /studio route
 * sits outside this group so the CMS renders full-screen.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <MotionProvider>
        <SmoothScroll />
        <Cursor />
        <Navbar />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatAssistant />
      </MotionProvider>
    </div>
  );
}
