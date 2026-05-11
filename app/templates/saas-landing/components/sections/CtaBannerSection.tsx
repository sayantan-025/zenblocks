"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Button } from "@/components/ui/button";

/**
 * Final CTA banner section to drive conversions at the end of the page.
 */
export function CtaBannerSection() {
  return (
    <SectionWrapper className="py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3rem] bg-zinc-900 dark:bg-white px-8 py-20 text-center text-white dark:text-zinc-900 shadow-2xl"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-lg md:text-xl opacity-80 mb-10 leading-relaxed">
            Join 5,000+ developers building high-performance SaaS applications with ZenBlocks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 rounded-full sm:w-64 bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 border-none">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full sm:w-64 border-white/20 hover:bg-white/10 dark:border-zinc-200 dark:hover:bg-zinc-100">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
