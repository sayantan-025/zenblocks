"use client";

import React from "react";
import { motion } from "framer-motion";
import { Testimonials } from "../zenblocks/testimonials";

export const TestimonialsSection = () => {
  return (
    <section className="relative py-32 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 border-dashed overflow-hidden">
      {/* Subtle Background Grids */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:96px_96px]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center gap-20">
          {/* Header */}
          <div className="flex flex-col items-center justify-center gap-6 text-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-200 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm dark:border-zinc-800 cursor-pointer group transition-all"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-tight group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                Real Feedback Loop
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8]"
            >
              Loved by <br />
              <span className="text-zinc-300 dark:text-zinc-800 italic">
                Builders.
              </span>
            </motion.h3>

            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl font-medium">
              Join thousands of developers building high-performance interfaces
              with ZenBlocks primitives.
            </p>
          </div>

          {/* Testimonials */}
          <Testimonials className="px-0" />
        </div>
      </div>
    </section>
  );
};
