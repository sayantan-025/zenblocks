"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Template } from "@/data/templates";

export default function TemplateCard({
  template,
  index,
}: {
  template: Template;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col lg:flex-row bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] overflow-hidden transition-all duration-500 hover:border-[var(--border-hover)] w-full shadow-sm hover:shadow-md"
    >
      {/* Free / Premium Badge - Positioned Absolute over Content */}
      <div className="absolute top-8 left-8 lg:left-12 z-20 flex gap-3">
        {template.isFree ? (
           <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] px-4 py-1.5 rounded-full shadow-sm">
             <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
             <span className="text-xs font-semibold text-[var(--text-primary)]">Free</span>
           </div>
         ) : (
           <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] px-4 py-1.5 rounded-full shadow-sm">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)]">
               <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
               <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
             </svg>
             <span className="text-xs font-semibold text-[var(--text-primary)]">Premium</span>
           </div>
         )}
         
         {/* Tech Stack Icons/Badges next to Free/Premium */}
         <div className="flex items-center gap-2">
          {template.tech.slice(0, 3).map((techItem) => (
            <div
              key={techItem}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] text-[10px] font-bold uppercase"
              title={techItem}
            >
              {techItem.substring(0, 1)}
            </div>
          ))}
        </div>
      </div>

      {/* Left Content */}
      <div className="flex flex-col justify-center flex-1 pt-24 pb-12 px-8 lg:px-12 lg:py-16 z-10 w-full lg:max-w-[45%] lg:border-r border-[var(--border)]">
        
        <h3 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-5 leading-tight tracking-tight">
          {template.name}
        </h3>
        
        <p className="text-[15px] lg:text-[17px] text-[var(--text-muted)] mb-10 leading-relaxed font-medium">
          {template.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-auto">
          <Link
            href={template.previewUrl}
            target="_blank"
            className="px-6 py-3.5 bg-transparent border border-[var(--border)] text-[var(--text-primary)] rounded-full text-sm font-semibold transition-colors hover:bg-[var(--bg-surface)] whitespace-nowrap"
          >
            View Details
          </Link>
          <a
            href={template.downloadUrl}
            className="flex items-center gap-2 px-7 py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-sm font-bold transition-opacity hover:opacity-90 whitespace-nowrap"
          >
            Live Demo
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Right Image (Angled Mockup Presentation) */}
      <div className="flex-1 w-full relative min-h-[350px] lg:min-h-[500px] bg-[#0a0a0a] overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
        
        <div className="absolute top-[10%] left-[10%] w-[120%] h-[120%] transition-transform duration-700 ease-out lg:-rotate-2 group-hover:rotate-0 group-hover:scale-[1.03] group-hover:translate-x-[-2%] z-10">
           <Image
             src={template.thumbnailUrl}
             alt={template.name}
             fill
             className="object-cover object-left-top rounded-tl-[16px] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-t border-l border-[#ffffff15]"
             sizes="(max-width: 1024px) 100vw, 60vw"
             priority={index < 2}
           />
        </div>
      </div>
    </motion.div>
  );
}
