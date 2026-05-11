import {
  NavbarSection,
  HeroSection,
  LogosSection,
  FeaturesSection,
  HowItWorksSection,
  StatsSection,
  TestimonialsSection,
  PricingSection,
  FaqSection,
  CtaBannerSection,
  FooterSection,
} from "./components";

/**
 * SaaS Landing Page Template
 * Built with ZenBlocks physics-enabled primitives.
 */
export default function SaasLandingPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <NavbarSection />
      
      <div className="flex flex-col">
        <HeroSection />
        <LogosSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaBannerSection />
      </div>

      <FooterSection />
    </main>
  );
}
