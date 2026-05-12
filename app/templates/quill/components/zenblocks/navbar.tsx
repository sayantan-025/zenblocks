"use client"

import React, { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { cn } from "../../lib/utils"

import type { NavbarItem } from "./types"

type NavbarCTA = {
  label: string
  href: string
}

type QuillNavbarProps = {
  items?: NavbarItem[]
  cta?: NavbarCTA
  className?: string
  logo?: React.ReactNode
}

const DEFAULT_NAV_ITEMS: NavbarItem[] = [
  { label: "Features", href: "#features" },
  { label: "Impact", href: "#impact" },
  { label: "Stories", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
]

function QuillLogo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Quill pen - elegant feather shape */}
      <path
        d="M10 24C10 24 8 18 12 14C14 12 18 10 22 8C22 8 20 12 18 16C16 20 14 24 14 24"
        fill="url(#quillGradient)"
      />
      <path
        d="M22 8C22 8 24 10 24 14C24 18 22 22 20 24L22 8Z"
        fill="#FAFAFA"
      />

      {/* Accent dot */}
      <circle cx="10" cy="24" r="2" fill="#A1A1AA" />

      <defs>
        <linearGradient id="quillGradient" x1="10" y1="24" x2="22" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#52525B" />
          <stop offset="100%" stopColor="#FAFAFA" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function QuillNavbar({
  items = DEFAULT_NAV_ITEMS,
  cta,
  className,
  logo,
}: QuillNavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={cn(
        "z-50 px-3 mt-3",
        "fixed top-0 left-0 right-0 flex justify-center"
      )}
    >
      <nav
        aria-label="Main Navigation"
        className={cn(
          "pointer-events-auto w-full rounded-[50px] px-4 py-2 border transition-all duration-300",
          "max-w-3xl mx-auto",
          scrolled
            ? "bg-zinc-950/80 backdrop-blur-xl shadow-md border-zinc-800/50"
            : "bg-zinc-950/50 backdrop-blur-lg border-zinc-800/30",
          "text-zinc-100",
          className
        )}
      >
        <div className="relative flex items-center h-10">
          {/* Logo */}
          <div className="absolute left-0 flex items-center gap-3">
            <Link href="/" className="flex items-center pointer-events-auto">
              {logo ?? <QuillLogo className="w-8 h-8" />}
              <span className="ml-2.5 text-sm font-bold tracking-wide text-zinc-100">
                Quill
              </span>
            </Link>
          </div>

          {/* Center Nav */}
          <div className="flex-1 flex justify-center">
            <div className="hidden sm:block">
              <SlideTabs
                navLinks={items}
                prefersReduced={!!prefersReduced}
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="absolute right-0 flex items-center gap-2">
            {cta && (
              <Link
                href={cta.href}
                className="hidden sm:inline-flex items-center justify-center gradient-btn px-4 py-1.5 text-sm font-medium text-zinc-100 hover:opacity-90 transition-opacity pointer-events-auto"
              >
                <span
                 className="relative z-10">{cta.label}</span>
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="sm:hidden p-2.5 rounded-md  transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-zinc-100" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-100" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t border-zinc-800/50 flex flex-col gap-2 px-2 pb-3">
            {items.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {cta && (
              <Link
                href={cta.href}
                onClick={() => setMobileMenuOpen(false)}
                className="gradient-btn px-3 py-2.5 mt-1 text-sm font-medium text-zinc-100 text-center hover:opacity-90 rounded-full"
              >
                <span className="relative z-10">{cta.label}</span>
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  )
}

function SlideTabs({
  navLinks,
  prefersReduced,
}: {
  navLinks: NavbarItem[]
  prefersReduced: boolean
}) {
  const containerRef = useRef<HTMLUListElement | null>(null)
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

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
        className="absolute top-0 h-9 rounded-full bg-zinc-800"
      />
    </ul>
  )
}

interface CompactTabProps {
  children: React.ReactNode
  href: string
  containerRef: React.RefObject<HTMLUListElement | null>
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >
}

const CompactTab: React.FC<CompactTabProps> = ({
  children,
  href,
  containerRef,
  setPosition,
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const update = () => {
    if (!ref.current || !containerRef.current) return

    const rect = ref.current.getBoundingClientRect()
    const parent = containerRef.current.getBoundingClientRect()

    setPosition({
      left: rect.left - parent.left,
      width: rect.width,
      opacity: 1,
    })
  }

  return (
    <li className="relative z-10 h-9 flex items-center" role="none">
      <Link
        ref={ref}
        href={href}
        onMouseEnter={update}
        onFocus={update}
        onBlur={() => setPosition((p) => ({ ...p, opacity: 0 }))}
        className="group flex items-center h-9 px-4 rounded-full text-sm font-medium text-zinc-300 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-colors"
        role="menuitem"
      >
        <span className="relative z-10 transition-colors">
          {children}
        </span>
      </Link>
    </li>
  )
}