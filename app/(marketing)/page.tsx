import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { DivisionsBento } from '@/components/sections/DivisionsBento';
import { SignatureWork } from '@/components/sections/SignatureWork';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { Stats } from '@/components/sections/Stats';
import { ProcessStepper } from '@/components/sections/ProcessStepper';
import { Testimonials } from '@/components/sections/Testimonials';
import { FounderNote } from '@/components/sections/FounderNote';
import { InsightsHome } from '@/components/sections/InsightsHome';
import { CTASection } from '@/components/sections/CTASection';
import { getDivisions, getFeaturedCaseStudies, getServices, getTestimonials, getPosts } from '@/lib/cms';

export const metadata: Metadata = {
  ...pageMeta({
    title: 'Bigadtruck Group — Advertising, Marketing & Technology',
    description:
      'A 360° advertising, marketing & technology agency in Pune & Mumbai. One team for strategy, creative, media, web, government media and project delivery.',
    path: '/',
  }),
  // Bypass the root title.template so the home title isn't suffixed twice.
  title: { absolute: 'Bigadtruck Group — Advertising, Marketing & Technology' },
};

export default async function HomePage() {
  const [divisions, featured, services, testimonials, posts] = await Promise.all([
    getDivisions(),
    getFeaturedCaseStudies(),
    getServices(),
    getTestimonials(),
    getPosts(),
  ]);

  return (
    <>
      <Hero />
      <TrustStrip />
      <DivisionsBento divisions={divisions} />
      <SignatureWork studies={featured.slice(0, 3)} />
      <ServicesOverview services={services} />
      <Stats />
      <ProcessStepper />
      <Testimonials testimonials={testimonials} />
      <InsightsHome posts={posts} />
      <FounderNote />
      <CTASection />
    </>
  );
}
