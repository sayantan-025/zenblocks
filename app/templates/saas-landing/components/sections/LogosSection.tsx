"use client";

import { LogoLoop } from "../zenblocks/logo-loop";
import { SectionWrapper } from "../ui/SectionWrapper";

/**
 * Logos section displaying trusted partners or integrations.
 */
export function LogosSection() {
  return (
    <SectionWrapper className="py-12 md:py-16 bg-muted/30">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by the world's most innovative teams
        </p>
      </div>
      <LogoLoop speed={60} />
    </SectionWrapper>
  );
}
