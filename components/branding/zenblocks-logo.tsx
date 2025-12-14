"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ZenBlocksLogoProps {
  showText?: boolean;
  className?: string;
}

export function ZenBlocksLogo({
  showText = true,
  className = "",
}: ZenBlocksLogoProps) {
  const prefersReduced = useReducedMotion();

  const blocks = [
    "bg-neutral-900 dark:bg-neutral-300",
    "bg-neutral-600 dark:bg-neutral-500",
    "bg-neutral-400 dark:bg-neutral-700",
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* ICON */}
      <div className="flex gap-0.5 w-5 h-5 items-center" aria-hidden>
        {blocks.map((cls, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-sm ${cls}`}
            animate={prefersReduced ? undefined : { y: [0, -3, 0] }}
            transition={
              prefersReduced
                ? undefined
                : {
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.12,
                  }
            }
          />
        ))}
      </div>

      {/* TEXT */}
      {showText && (
        <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white select-none">
          ZENBLOCKS
        </span>
      )}
    </div>
  );
}
