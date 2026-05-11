"use client";

import React, { useState, useEffect } from "react";
import { 
  Github, 
  Layout, 
  ChevronDown, 
  ArrowRight,
  ChevronRight,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { FAQSection as ZenFAQ } from "@/components/zenblocks/faq";
import { 
  TEMPLATES, 
  COMING_SOON, 
  Template, 
  ComingSoonItem 
} from "@/config/templates";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const FAQS = [
  {
    question: "How can I use these templates?",
    answer: "You can download the template source files and integrate them into your React or Next.js project. Each template comes with a comprehensive README and organized component structures.",
    category: "Usage"
  },
  {
    question: "Are templates free for personal and commercial use?",
    answer: "Free templates are available for personal and commercial use under the MIT license. Premium templates require a one-time purchase and come with extended support and updates.",
    category: "Licensing"
  },
  {
    question: "Do templates work with Tailwind CSS, Next.js and React?",
    answer: "Yes, all our templates are built using the latest versions of Next.js, React, and Tailwind CSS, ensuring maximum performance and ease of customization.",
    category: "Technical"
  },
  {
    question: "Can I customize the design and components?",
    answer: "Absolutely! The templates are built to be modular. You can easily swap colors, change typography via Tailwind config, and modify components to fit your brand.",
    category: "Customization"
  },
  {
    question: "Where do I report a bug or technical issue?",
    answer: "You can report issues via our GitHub repository or contact our support team directly through the dashboard. We aim to resolve critical bugs within 24-48 hours.",
    category: "Support"
  }
];

/* -------------------------------------------------------------------------- */
/*                                COMPONENTS                                  */
/* -------------------------------------------------------------------------- */

function WireframePreview() {
  return (
    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 opacity-20 text-center">
        <Layout className="w-12 h-12 text-zinc-400" />
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">Preview Unavailable</p>
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative flex flex-col lg:flex-row bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm min-h-[420px]">
      
      {/* ─── LEFT PANEL ─── */}
      <div className="flex flex-col flex-1 p-10 lg:p-14 relative z-10 lg:max-w-[45%]">
        
        {/* Name Row */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tighter leading-tight font-sans">
            {template.name}
          </h2>
        </div>

        {/* Description - High Contrast & Muted */}
        <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-8 max-sm line-clamp-3 font-sans">
          {template.description}
        </p>

        {/* Tech Stack - Grayscale Minimal */}
        {/* Tech Stack - Professional Integration */}
        <div className="flex items-center gap-5 mb-10">
          {[
            { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/black" },
            { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
            { name: "Framer", icon: "https://cdn.simpleicons.org/framer/black" },
            { name: "GSAP", icon: "https://cdn.simpleicons.org/greensock/88CE02" },
            { name: "Three.js", icon: "https://cdn.simpleicons.org/threedotjs/black" },
          ].map((tech) => (
            <div key={tech.name} className="relative">
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className={cn(
                  "w-5 h-5",
                  (tech.name === "Next.js" || tech.name === "Framer" || tech.name === "Three.js") && "dark:invert"
                )} 
              />
            </div>
          ))}
        </div>

        {/* Buttons - High Contrast CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto">
          <Link
            href={template.checkoutUrl}
            className="w-full sm:w-auto px-8 h-12 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            Get Access — ${template.price}
          </Link>
          <Link
            href={`${template.demoPath}`}
            target="_blank"
            className="w-full sm:w-auto px-8 h-12 rounded-full bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/20 text-zinc-900 dark:text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2"
          >
            Preview <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ─── RIGHT PANEL — FULL VIEW INTEGRATED IMAGE ─── */}
      <div className="flex-1 relative overflow-hidden min-h-[400px] lg:min-h-full">
        {/* Flagship Badge - Top Right of Visual Area */}
        {template.badge && (
          <div className="absolute top-8 right-8 z-20 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/40 border border-purple-500/30 text-[9px] font-bold text-purple-400 uppercase tracking-widest backdrop-blur-md shadow-2xl">
              ✦ {template.badge}
            </span>
          </div>
        )}

        {imgError ? (
          <WireframePreview />
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={template.screenshot}
              fill
              className="object-cover"
              alt={`${template.name} preview`}
              priority
              onError={() => setImgError(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ComingSoonCard({ item }: { item: ComingSoonItem }) {
  const accentBorderDashed: Record<string, string> = {
    violet: "border-violet-500/25",
    emerald: "border-emerald-500/25",
    amber: "border-amber-500/25",
    sky: "border-sky-500/25",
    purple: "border-purple-500/25",
  };
  const accentText: Record<string, string> = {
    violet: "text-violet-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    sky: "text-sky-400",
    purple: "text-purple-400",
  };

  return (
    <div
      className={`relative rounded-[28px] border border-dashed ${accentBorderDashed[item.accent]} bg-zinc-50 dark:bg-white/5 px-8 py-6 flex items-center justify-between gap-4 transition-all hover:bg-zinc-100 dark:hover:bg-white/[0.08] group cursor-default shadow-sm dark:shadow-none`}
    >
      <div>
        <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 dark:text-zinc-500 uppercase mb-1">
          {item.codename}
        </p>
        <p className="text-lg font-bold text-zinc-600 dark:text-zinc-300 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">{item.name}</p>
      </div>
      <span className={`px-4 py-1 rounded-full border ${accentBorderDashed[item.accent]} ${accentText[item.accent]} text-[10px] font-black uppercase tracking-widest`}>
        Soon
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   SECTIONS                                 */
/* -------------------------------------------------------------------------- */

const Hero = () => (
  <section className="relative pt-48 pb-20 px-6 overflow-hidden">
    {/* Subtle Background Grids */}
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:96px_96px]" />
    
    <div className="container mx-auto max-w-5xl text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-200 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm dark:border-zinc-800 cursor-pointer group transition-all mb-8"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-tight group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
            Modern Templates
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8] mb-8">
          Templates &<br />
          <span className="text-zinc-300 dark:text-zinc-800 italic">Landing Pages</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Premium Next.js templates and landing pages for agencies and startups. 
          Built with elite architecture, physics-driven UI, and a focus on high-conversion.
        </p>
      </motion.div>
    </div>
  </section>
);

const FAQSection = () => {
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
              <span className="flex h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-tight group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                Templates FAQ
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8]"
            >
              Common <br />
              <span className="text-zinc-300 dark:text-zinc-800 italic">
                Questions.
              </span>
            </motion.h3>

            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl font-medium">
              Everything you need to know about our React templates and how to use them.
            </p>
          </div>

          {/* FAQ Content - Using library component */}
          <div className="w-full max-w-3xl">
            <ZenFAQ items={FAQS}  />
          </div>
        </div>
      </div>
    </section>
  );
};

const CTABanner = () => (
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
              Premium Landing Pages
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
            Explore our collection of beautifully crafted, high-performance templates 
            built to convert. Optimized for speed, SEO, and developer experience.
          </p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center px-4 sm:px-0"
        >
          <Link
            href="/docs"
            className="group relative w-full sm:w-64 h-12 rounded-full bg-zinc-900 dark:bg-white px-8 text-white dark:text-zinc-950 font-bold text-base transition-all hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-95 flex items-center justify-center gap-3"
          >
            <Layout className="w-4 h-4" />
            <span className="font-bold text-base whitespace-nowrap">Browse Components</span>
          </Link>

          <Link
            href="https://github.com/sayantan-025/zenblocks"
            className="group relative w-full sm:w-64 h-12 rounded-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 px-8 text-zinc-800 dark:text-zinc-200 shadow-sm transition-all hover:bg-white/60 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 flex items-center justify-center gap-3 active:scale-95"
          >
            <Github className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="font-bold text-base whitespace-nowrap">View on GitHub</span>
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*                                 MAIN PAGE                                  */
/* -------------------------------------------------------------------------- */

export default function TemplatesGallery() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 overflow-x-hidden">
      
      <main>
        <Hero />
        
        <section className="container mx-auto px-6 pb-32 max-w-7xl">
          <div className={`space-y-12 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            {TEMPLATES.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          <div className={`mt-32 transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="flex items-center gap-4 mb-10">
              <p className="text-[10px] font-mono tracking-[0.5em] text-zinc-500 dark:text-zinc-600 uppercase whitespace-nowrap">
                Coming to the collection
              </p>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {COMING_SOON.map((item) => (
                <ComingSoonCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <FAQSection />
        
        <CTABanner />
      </main>


    </div>
  );
}
