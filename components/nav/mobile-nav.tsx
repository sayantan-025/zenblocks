"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { NavSection } from "@/config/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface MobileNavProps {
  sections: NavSection[];
  pathname: string;
  isExpanded: boolean;
  currentPage?: { title: string };
  totalItems: number;
  onExpandToggle: () => void;
  onItemClick: () => void;
}

export function MobileNav({
  sections,
  pathname,
  isExpanded,
  currentPage,
  totalItems,
  onExpandToggle,
  onItemClick,
}: MobileNavProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-6">
      {/* BACKDROP */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onExpandToggle}
          />
        )}
      </AnimatePresence>

      {/* SHEET */}
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={
            isExpanded
              ? { height: "82vh", width: "100%" }
              : { height: 48, width: "60%" }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 280, damping: 30 }
          }
          className={cn(
            "relative overflow-hidden",
            "rounded-2xl",
            "backdrop-blur-md",
            "bg-white/95 dark:bg-zinc-900/90",
            "border border-black/10 dark:border-white/10",
            "shadow-lg",
            !isExpanded && "cursor-pointer"
          )}
          onClick={() => !isExpanded && onExpandToggle()}
        >
          {isExpanded ? (
            <ExpandedContent
              sections={sections}
              pathname={pathname}
              onItemClick={onItemClick}
              onExpandToggle={onExpandToggle}
            />
          ) : (
            <CollapsedBar title={currentPage?.title} totalItems={totalItems} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Collapsed ---------------- */

function CollapsedBar({
  title,
  totalItems,
}: {
  title?: string;
  totalItems: number;
}) {
  return (
    <div className="h-full flex items-center justify-center gap-2 px-4">
      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
        {title}
      </span>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        {totalItems}
      </span>
    </div>
  );
}

/* ---------------- Expanded ---------------- */

function ExpandedContent({
  sections,
  pathname,
  onItemClick,
  onExpandToggle,
}: {
  sections: NavSection[];
  pathname: string;
  onItemClick: () => void;
  onExpandToggle: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <CompactLogo />
          <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-white">
            ZENBLOCKS
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onExpandToggle();
          }}
          className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Close navigation"
        >
          <X className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {section.title}
            </h3>

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/docs"
                    ? pathname === "/docs" || pathname === "/docs/introduction"
                    : item.href === "/docs/components/block/"
                    ? pathname.startsWith("/docs/components/block")
                    : pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.isComingSoon ? "#" : item.href}
                    onClick={onItemClick}
                    className={cn(
                      "flex items-center justify-between",
                      "px-3 py-2 rounded-xl text-sm font-medium",
                      item.isComingSoon && "opacity-60 cursor-not-allowed",
                      isActive
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && (
                        <span className="text-xs opacity-70">→</span>
                      )}
                      {item.title}

                      {item.isNew && !isActive && (
                        <span className="ml-1 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          new
                        </span>
                      )}

                      {item.isLab && !isActive && (
                        <span className="ml-1 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide bg-purple-500/10 text-purple-600 dark:text-purple-400">
                          lab
                        </span>
                      )}
                    </span>

                    {item.count && (
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Compact Logo ---------------- */

function CompactLogo() {
  const blocks = [
    "w-2 h-2 rounded-sm bg-neutral-900 dark:bg-neutral-300",
    "w-2 h-2 rounded-sm bg-neutral-600 dark:bg-neutral-500",
    "w-2 h-2 rounded-sm bg-neutral-400 dark:bg-neutral-700",
  ];

  return (
    <div className="relative w-5 h-5 flex items-center gap-0.5">
      {blocks.map((cls, i) => (
        <motion.div
          key={i}
          className={cls}
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 1.05,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}
