import { BentoMosaic } from "../components/sections/bento-mosaic";
import { TestimonialsSection } from "../components/sections/testimonials";
import { Features } from "../components/sections/features";
import { FAQ } from "../components/sections/faq";
import { Hero } from "../components/sections/hero";
import { Integration } from "../components/sections/integration";
import { CTA } from "../components/sections/cta";

const Page = () => {
  return (
    <div className="relative">
      <Hero />
      <BentoMosaic />
      <TestimonialsSection />
      <Features />
      <FAQ />
      <Integration />
      <CTA />
    </div>
  );
};

export default Page;
