import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { DivisionsBento } from '@/components/sections/DivisionsBento';
import { SignatureWork } from '@/components/sections/SignatureWork';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { Stats } from '@/components/sections/Stats';
import { ProcessStepper } from '@/components/sections/ProcessStepper';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTASection } from '@/components/sections/CTASection';
import { getDivisions, getFeaturedCaseStudies, getServices, getTestimonials } from '@/lib/cms';

export default async function HomePage() {
  const [divisions, featured, services, testimonials] = await Promise.all([
    getDivisions(),
    getFeaturedCaseStudies(),
    getServices(),
    getTestimonials(),
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
      <CTASection />
    </>
  );
}
