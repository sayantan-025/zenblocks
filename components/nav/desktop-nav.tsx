"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { NavSection } from "@/config/navigation";

/* ---------- Logo (reuse same CompactLogo style) ---------- */

function SidebarLogo({ prefersReduced }: { prefersReduced: boolean }) {
  const blocks = [
    "w-2 h-2 rounded-sm bg-neutral-900 dark:bg-neutral-300",
    "w-2 h-2 rounded-sm bg-neutral-600 dark:bg-neutral-500",
    "w-2 h-2 rounded-sm bg-neutral-400 dark:bg-neutral-700",
  ];

  return (
    <div className="flex items-center gap-2 px-2 pb-2">
      <div className="relative w-5 h-5 flex gap-0.5">
        {blocks.map((cls, i) => (
          <motion.div
            key={i}
            className={cls}
            animate={prefersReduced ? undefined : { y: [0, -3, 0] }}
            transition={
              prefersReduced
                ? {}
                : {
                    duration: 1.05,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.12,
                  }
            }
          />
        ))}
      </div>
      <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
        ZENBLOCKS
      </span>
    </div>
  );
}

/* ---------- DesktopNav ---------- */

interface DesktopNavProps {
  sections: NavSection[];
  pathname: string;
}

export function DesktopNav({ sections, pathname }: DesktopNavProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ top: 0, height: 0, opacity: 0 });

  return (
    <aside className="hidden md:block w-full">
      <div
        ref={containerRef}
        className={cn(
          "relative rounded-2xl p-3 space-y-4",
          "backdrop-blur-md",
          "bg-white/90 dark:bg-zinc-900/85",
          "border border-black/10 dark:border-white/10",
          "shadow-sm"
        )}
      >
        <SidebarLogo prefersReduced={prefersReduced ?? false} />

        {sections.map((section) => (
          <div key={section.title} className="space-y-1">
            <h2 className="px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {section.title}
            </h2>

            <nav className="relative">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/docs"
                    ? pathname === "/docs" || pathname === "/docs/introduction"
                    : item.href === "/docs/components/block/"
                    ? pathname.startsWith("/docs/components/block")
                    : pathname === item.href;

                return (
                  <SidebarItem
                    key={item.id}
                    href={item.href}
                    isActive={isActive}
                    containerRef={containerRef}
                    setCursor={setCursor}
                  >
                    {item.title}
                  </SidebarItem>
                );
              })}

              {/* Sliding pill (same idea as Header SlideTabs) */}
              <motion.div
                animate={cursor}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 340, damping: 30 }
                }
                className="absolute left-1 right-1 z-0 rounded-xl bg-zinc-900 dark:bg-zinc-100/10"
              />
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ---------- Sidebar Item ---------- */

function SidebarItem({
  children,
  href,
  isActive,
  setCursor,
  containerRef,
}: {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  setCursor: React.Dispatch<
    React.SetStateAction<{ top: number; height: number; opacity: number }>
  >;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const measure = () => {
    if (!ref.current || !containerRef.current) return;

    const rect = ref.current.getBoundingClientRect();
    const parent = containerRef.current.getBoundingClientRect();

    setCursor({
      top: rect.top - parent.top,
      height: rect.height,
      opacity: 1,
    });
  };

  return (
    <Link
      ref={ref as unknown as React.Ref<HTMLAnchorElement>}
      href={href}
      onMouseEnter={measure}
      onFocus={measure}
      onBlur={() => setCursor((p) => ({ ...p, opacity: 0 }))}
      className={cn(
        "relative z-10 block px-3 py-1.5 rounded-xl text-sm font-medium transition-colors",
        isActive
          ? "text-white dark:text-zinc-900"
          : "text-zinc-600 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-100"
      )}
    >
      {children}
    </Link>
  );
}
