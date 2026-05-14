"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Layout } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { OrbField } from "../zenblocks/orb-field";
import { PressureTest } from "../zenblocks/pressure-test";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

export const Hero = () => {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleCopy = () => {
    navigator.clipboard.writeText("npx shadcn@latest add zenblocks");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic Colors based on Theme
  const isLight = resolvedTheme === "light";
  const orbColors = isLight
    ? [0x18181b, 0x71717a, 0xd4d4d8, 0xffffff]
    : [0xfafafa, 0xa1a1aa, 0x52525b, 0x09090b];

  return (
    <div className="relative min-h-dvh w-full flex flex-col justify-center items-center overflow-hidden bg-background text-foreground selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 font-sans">
      {/* Background OrbField */}
      <div className="absolute inset-0 z-0">
        <OrbField
          count={60}
          gravity={0.5}
          friction={0.99}
          wallBounce={0.8}
          followCursor={true}
          colors={orbColors}
          ambientColor={0xffffff}
          ambientIntensity={0.5}
          lightIntensity={150}
          materialParams={{
            metalness: 0.6,
            roughness: 0.5,
            clearcoat: 0.1,
            clearcoatRoughness: 0.2,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto relative z-20 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center pointer-events-none py-12 sm:py-24 md:py-32 min-h-[500px] justify-center">
        {/* Social Proof Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="View our developer community"
          className="pointer-events-auto inline-flex items-center gap-4 rounded-full border border-zinc-200 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm pl-1 pr-5 py-1.5 text-sm font-medium shadow-sm dark:border-zinc-800 mb-8 isolate cursor-pointer group transition-all"
        >
          <div className="flex flex-row items-center justify-center">
            <AnimatedTooltip items={people} />
          </div>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-tight group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
            Trusted by <span className="text-zinc-900 dark:text-white font-bold">2,000+</span> developers
          </span>
        </motion.div>

        {/* TextPressure Animated Headline - Responsive Heights */}
        <div className="relative w-full max-w-[90vw] md:max-w-4xl h-20 sm:h-28 md:h-40 lg:h-48 xl:h-56 mb-6 sm:mb-8 pointer-events-auto flex items-center justify-center">
          <PressureTest
            text="ZENBLOCKS"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            className="text-zinc-900 dark:text-white"
            minFontSize={20}
          />
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-xs sm:max-w-md md:max-w-xl mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
        >
          The high-performance <span className="text-foreground font-semibold">Component Build Registry</span>.
          Ship faster with{" "}
          <span className="text-foreground font-semibold">
            updated docs and physics-enabled primitives
          </span>
          .
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center px-4 sm:px-0"
        >
          {/* Primary Button */}
          <Link
            href="/docs/blocks/navbar"
            className="group relative w-full sm:w-64 h-12 rounded-full bg-white dark:bg-white px-8 text-zinc-900 dark:text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all hover:bg-zinc-100 dark:hover:bg-zinc-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 flex items-center justify-center gap-2"
          >
            <Layout className="w-4 h-4" />
            <span className="font-semibold text-base">Browse Components</span>
          </Link>

          {/* Secondary Button */}
          <button
            onClick={handleCopy}
            aria-label="Copy installation command"
            className="group relative w-full sm:w-64 h-12 rounded-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 px-8 text-zinc-800 dark:text-zinc-200 shadow-sm transition-all hover:bg-white/60 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 flex items-center justify-center gap-3 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <span className="font-mono text-sm opacity-50 select-none">$</span>
            <span className="font-mono text-sm font-medium truncate max-w-[200px]">
              npx shadcn@latest add zenblocks
            </span>
            <div className="ml-1 p-1.5 rounded-md bg-transparent group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-colors shrink-0">
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
