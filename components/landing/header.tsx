"use client";

import React, { useEffect, useRef, useState } from "react";
// import Link from "next/link"; // Replaced for SPA compatibility

import { Moon, Sun, Menu, X } from "lucide-react";
// import { useTheme } from "next-themes"; // Replaced for SPA compatibility
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type NavbarProps = {
  position?: "fixed" | "relative";
};

/* -------------------------------------------------------------------------- */
/*                                   NAVBAR                                   */
/* -------------------------------------------------------------------------- */

export default function Header({ position = "fixed" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (position === "relative") return;

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [position]);

  const navLinks = [
    { label: "Components", href: "/docs" },
    { label: "Templates", href: "/templates" },
  ];

  return (
    <div
      className={`z-50 px-3 mt-3 pointer-events-none ${
        position === "fixed"
          ? "fixed top-0 left-0 right-0 flex justify-center"
          : "relative w-full"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto w-full rounded-2xl px-4 py-2 border transition-all duration-300
        ${position === "fixed" ? "max-w-3xl mx-auto" : "max-w-full"}
        ${
          scrolled && position === "fixed"
            ? "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-md border-zinc-200/50 dark:border-white/10"
            : "bg-white/10 dark:bg-zinc-900/10 backdrop-blur-lg border-zinc-900/5 dark:border-white/5"
        }`}
      >
        <div className="relative flex items-center h-10">
          {/* LOGO */}
          <div className="absolute left-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <CompactLogo prefersReduced={!!prefersReduced} />
              <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
                ZENBLOCKS
              </span>
            </Link>
          </div>

          {/* CENTER NAV */}
          <div className="flex-1 flex justify-center">
            <div className="hidden sm:block">
              <SlideTabs
                navLinks={navLinks}
                prefersReduced={!!prefersReduced}
              />
            </div>
          </div>

          {/* RIGHT CONTROLS */}
          <div className="absolute right-0 flex items-center gap-2">
            <ThemeButton />

            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="sm:hidden p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-zinc-900 dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t border-black/10 dark:border-white/10 flex flex-col gap-2 bg-transparent">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   LOGO                                     */
/* -------------------------------------------------------------------------- */

function CompactLogo({ prefersReduced }: { prefersReduced: boolean }) {
  const blocks = [
    "bg-neutral-900 dark:bg-neutral-300",
    "bg-neutral-600 dark:bg-neutral-500",
    "bg-neutral-400 dark:bg-neutral-700",
  ];

  return (
    <div className="flex gap-0.5 w-5 h-5 items-center">
      {blocks.map((cls, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-sm ${cls}`}
          animate={prefersReduced ? undefined : { y: [0, -3, 0] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               THEME BUTTON                                 */
/* -------------------------------------------------------------------------- */

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-md border border-black/10 dark:border-white/10" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="p-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-white" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-900" />
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SLIDE TABS                                  */
/* -------------------------------------------------------------------------- */

function SlideTabs({
  navLinks,
  prefersReduced,
}: {
  navLinks: { label: string; href: string }[];
  prefersReduced: boolean;
}) {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      ref={containerRef}
      onMouseLeave={() => setPosition((p) => ({ ...p, opacity: 0 }))}
      className="relative flex items-center h-9 px-1 rounded-full"
      role="menubar"
    >
      {navLinks.map((link) => (
        <CompactTab
          key={link.href}
          href={link.href}
          containerRef={containerRef}
          setPosition={setPosition}
        >
          {link.label}
        </CompactTab>
      ))}

      <motion.li
        aria-hidden
        animate={position}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 380, damping: 32 }
        }
        className="absolute top-0 h-9 rounded-full bg-zinc-900 dark:bg-zinc-100/10"
      />
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  TAB ITEM                                  */
/* -------------------------------------------------------------------------- */

interface CompactTabProps {
  children: React.ReactNode;
  href: string;
  containerRef: React.RefObject<HTMLUListElement | null>;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
}

const CompactTab: React.FC<CompactTabProps> = ({
  children,
  href,
  containerRef,
  setPosition,
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const update = () => {
    if (!ref.current || !containerRef.current) return;

    const rect = ref.current.getBoundingClientRect();
    const parent = containerRef.current.getBoundingClientRect();

    setPosition({
      left: rect.left - parent.left,
      width: rect.width,
      opacity: 1,
    });
  };

  return (
    <li className="relative z-10 h-9 flex items-center" role="none">
      <Link
        ref={ref}
        href={href}
        onMouseEnter={update}
        onFocus={update}
        onBlur={() => setPosition((p) => ({ ...p, opacity: 0 }))}
        className="group flex items-center h-9 px-4 rounded-full text-sm font-medium text-zinc-900 dark:text-zinc-200 focus:outline-none"
        role="menuitem"
      >
        <span className="relative z-10 transition-colors group-hover:text-white group-focus:text-white">
          {children}
        </span>
      </Link>
    </li>
  );
};
