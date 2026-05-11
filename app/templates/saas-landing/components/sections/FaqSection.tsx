"use client";

import { FAQSection as FAQ } from "../zenblocks/faq";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FAQ_ITEMS } from "../../data/faq";

/**
 * FAQ section using the ZenBlocks FAQ primitive.
 */
export function FaqSection() {
  return (
    <SectionWrapper id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We've got answers.
          </p>
        </div>
        
        <FAQ items={FAQ_ITEMS} />
      </div>
    </SectionWrapper>
  );
}
