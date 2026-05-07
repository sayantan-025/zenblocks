import { BentoMosaic } from "@/components/landing/bento-mosaic";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { Features } from "@/components/landing/features";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Integration } from "@/components/landing/integration";
import { CTA } from "@/components/landing/cta";

const page = () => {
  return (
    <div className="relative">
      <Hero />
      <BentoMosaic />
      <TestimonialsSection />
      <Features />
      <FAQ />
      <Integration />
      <CTA />
      <Footer />
    </div>
  );
};

export default page;
