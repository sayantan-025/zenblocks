"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { 
  motion, 
  useAnimationFrame, 
  useMotionValue, 
} from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                    */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  content: string;
  name: string;
  role: string;
  avatar?: string;
  rating?: number;
};

export interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  showRatings?: boolean;
}

export interface TestimonialsProps {
  testimonials?: Testimonial[];
  pauseOnHover?: boolean;
  showRatings?: boolean;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    content: "ZenBlocks cut our development time by 40%. The physics-enabled components are a game changer for our UX.",
    name: "Alex Rivera",
    role: "Senior Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    content: "The copy-paste DX is incredible. We launched our landing page 3 days early thanks to these motion primitives.",
    name: "Sarah Chen",
    role: "Product Designer @ TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    content: "Our conversion rate increased by 15% after implementing the Orb Field and Testimonials mosaic. Pure results.",
    name: "Marcus Johnson",
    role: "Creative Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    content: "Type safety and documentation are top-notch. Integration took less than 10 minutes from start to finish.",
    name: "Emily Rodriguez",
    role: "Lead Developer @ Nexus",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    rating: 4,
  },
  {
    content: "Mobile performance is flawless. Even with heavy animations, our Lighthouse score stayed at a solid 100.",
    name: "David Park",
    role: "Mobile App Architect",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    content: "The ownership model is why I chose ZenBlocks. No subscriptions, just high-quality code that I own.",
    name: "Aisha Patel",
    role: "Fullstack Developer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    content: "We scaled our SaaS from 1k to 10k MRR with ZenBlocks. The industrial aesthetic gives us an elite edge.",
    name: "James Wilson",
    role: "CEO @ Velocity",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    content: "Clean, minimal, and powerful. It is the only component library that understands industrial-grade design.",
    name: "Lisa Thompson",
    role: "VP of Engineering",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    content: "The animation engine is robust. We have zero jank on low-end devices, which is critical for our global user base.",
    name: "Michael Brown",
    role: "Startup Founder",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    rating: 4,
  },
];

/* -------------------------------------------------------------------------- */
/*                               INTERNAL CARD                                */
/* -------------------------------------------------------------------------- */

const TestimonialCard = ({ 
  testimonial, 
  showRatings 
}: { 
  testimonial: Testimonial; 
  showRatings?: boolean 
}) => {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-zinc-950/[0.04] dark:hover:shadow-white/[0.02] transition-all duration-300 overflow-hidden">
      {/* Unified Glint Effect - Compensated for Identical Visual Weight */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800">
            {testimonial.avatar ? (
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="h-full w-full object-cover" 
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                {initials}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {testimonial.name}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
              {testimonial.role}
            </span>
          </div>
        </div>

        {showRatings && testimonial.rating && (
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={cn(
                  "transition-colors",
                  i < testimonial.rating! 
                    ? "fill-zinc-900 dark:fill-white text-zinc-900 dark:text-white" 
                    : "fill-zinc-200 dark:fill-zinc-800 text-zinc-200 dark:text-zinc-800"
                )}
              />
            ))}
          </div>
        )}

        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   COLUMN                                   */
/* -------------------------------------------------------------------------- */

export const TestimonialsColumn = ({
  testimonials,
  duration = 20,
  className,
  reverse = false,
  pauseOnHover = true,
  showRatings = true,
}: TestimonialsColumnProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const columnRef = useRef<HTMLDivElement>(null);
  const [columnHeight, setColumnHeight] = useState(0);

  // Motion values for the animation
  const y = useMotionValue(0);

  // Duplicate for seamless scroll
  const duplicatedTestimonials = useMemo(() => [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ], [testimonials]);

  useEffect(() => {
    if (columnRef.current) {
      setColumnHeight(columnRef.current.scrollHeight / 4);
    }
  }, [testimonials]);

  useAnimationFrame((time, delta) => {
    if (isPaused && pauseOnHover) return;

    const moveAmount = (delta / 1000) * (columnHeight / duration);
    let currentY = y.get();

    if (reverse) {
      currentY += moveAmount;
      if (currentY > 0) currentY = -columnHeight;
    } else {
      currentY -= moveAmount;
      if (currentY < -columnHeight) currentY = 0;
    }

    y.set(currentY);
  });

  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 max-h-[640px] overflow-hidden",
        "[mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div 
        ref={columnRef} 
        style={{ y }} 
        className="flex flex-col gap-6"
      >
        {duplicatedTestimonials.map((testimonial, i) => (
          <TestimonialCard 
            key={`${testimonial.name}-${i}`} 
            testimonial={testimonial} 
            showRatings={showRatings}
          />
        ))}
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   MOSAIC                                   */
/* -------------------------------------------------------------------------- */

export function Testimonials({
  testimonials = DEFAULT_TESTIMONIALS,
  pauseOnHover = true,
  showRatings = true,
  className,
}: TestimonialsProps) {
  // Use DEFAULT_TESTIMONIALS if none provided
  const items = (testimonials && testimonials.length > 0) ? testimonials : DEFAULT_TESTIMONIALS;
  
  const col1 = items.slice(0, 3);
  const col2 = items.slice(3, 6);
  const col3 = items.slice(6, 9);

  return (
    <div 
      className={cn(
        "relative w-full max-w-7xl mx-auto px-6", 
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <TestimonialsColumn 
          testimonials={col1} 
          duration={15} 
          pauseOnHover={pauseOnHover} 
          showRatings={showRatings}
        />
        <TestimonialsColumn 
          testimonials={col2} 
          duration={19} 
          className="hidden md:flex" 
          reverse={true} 
          pauseOnHover={pauseOnHover} 
          showRatings={showRatings}
        />
        <TestimonialsColumn 
          testimonials={col3} 
          duration={17} 
          className="hidden lg:flex" 
          pauseOnHover={pauseOnHover} 
          showRatings={showRatings}
        />
      </div>
    </div>
  );
}

export default Testimonials;
