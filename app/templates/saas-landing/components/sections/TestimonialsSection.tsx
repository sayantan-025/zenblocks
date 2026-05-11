"use client";

import { Testimonials } from "../zenblocks/testimonials";
import { SectionWrapper } from "../ui/SectionWrapper";
import { TESTIMONIALS } from "../../data/testimonials";

/**
 * Testimonials section using the ZenBlocks testimonials primitive.
 */
export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
          Loved by Builders
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of developers who are already building with ZenBlocks.
        </p>
      </div>
      
      {/* We pass our typed data to the primitive */}
      <Testimonials items={TESTIMONIALS} />
    </SectionWrapper>
  );
}
