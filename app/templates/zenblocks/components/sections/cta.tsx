"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, LayoutTemplate } from "lucide-react";
import Link from "next/link";

export const CTA = () => {
  return (
    <section className="relative py-32 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 border-dashed overflow-hidden">
      {/* Subtle Background Grids */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:96px_96px]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="flex flex-col items-center justify-center gap-6 text-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-200 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm dark:border-zinc-800 cursor-pointer group transition-all"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-tight group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                Final Deployment
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8]"
            >
              Ready to <br />
              <span className="text-zinc-300 dark:text-zinc-800 italic">
                Scale.
              </span>
            </motion.h3>

            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl font-medium">
              Join thousands of developers building high-performance interfaces 
              with ZenBlocks primitives. Zero friction. Pure results.
            </p>
          </div>

          {/* Action Buttons - Optimized for browsing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center px-4 sm:px-0"
          >
            {/* Primary Button - Browse Components */}
            <Link
              href="/docs"
              className="group relative w-full sm:w-64 h-12 rounded-full bg-zinc-900 dark:bg-white px-8 text-white dark:text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 flex items-center justify-center gap-3"
            >
              <Layout className="w-4 h-4" />
              <span className="font-semibold text-base whitespace-nowrap">Browse Components</span>
            </Link>

            {/* Secondary Button - Browse Templates */}
            <Link
              href="/templates"
              className="group relative w-full sm:w-64 h-12 rounded-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 px-8 text-zinc-800 dark:text-zinc-200 shadow-sm transition-all hover:bg-white/60 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 flex items-center justify-center gap-3 active:scale-95"
            >
              <LayoutTemplate className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="font-semibold text-base whitespace-nowrap">Browse Templates</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
