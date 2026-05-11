"use client";

import { motion } from "framer-motion";
import { OrbField } from "../zenblocks/orb-field";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "../ui/SectionWrapper";

/**
 * Hero section with animated orb background and primary call to action.
 */
export function HeroSection() {
  return (
    <SectionWrapper className="relative min-h-[90vh] flex items-center pt-32 pb-20">
      <div className="absolute inset-0 -z-10">
        <OrbField />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Build Faster with <br /> Physics-Enabled Blocks
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Create stunning, high-performance SaaS landing pages in minutes. 
            Beautifully animated components that just work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 rounded-full sm:w-64">
              Start Building Now
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full sm:w-64">
              View Components
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 blur-2xl -z-10" />
          <div className="aspect-video rounded-2xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Placeholder for product dashboard or demo video */}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              [ Product Dashboard Preview ]
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
