"use client"

import Link from "next/link"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { HERO_DATA } from "../data"
import GradientButton from "../components/ui/gradient-button"
import { DottedSurface } from "../components/ui/dotted-surface"
import { cn } from "../lib/utils"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
      {/* Dotted Background Animation */}
      <DottedSurface className="opacity-50" />
      	<div className="absolute inset-0 flex items-center justify-center">
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
						'blur-[30px]',
					)}
				/>
			
			</div>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-zinc-100 focus:text-zinc-900 focus:rounded-lg">
        Skip to content
      </a>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-transparent" />

      {/* Content */}
      <div id="main-content" className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 mb-8">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-sm text-zinc-400">{HERO_DATA.badge}</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-zinc-100 block">{HERO_DATA.headline.part1}</span>
          <span className="bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            {HERO_DATA.headline.part2}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {HERO_DATA.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <GradientButton href="#pricing">
            {HERO_DATA.cta.primary}
          </GradientButton>
          <Link
            href="#"
            className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-md"
          >
            <span>{HERO_DATA.cta.secondary}</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {HERO_DATA.socialProof.avatars.map((avatar, i) => (
                <div key={i} className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-950 hover:-translate-y-1 transition z-[1]">
                  <Image
                    src={avatar}
                    alt={`${HERO_DATA.socialProof.count} users`}
                    fill
                    className="object-cover"
                    sizes="40px"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#FACC15"
                    stroke="#FACC15"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>
                ))}
                <span className="text-zinc-400 font-medium ml-1 text-sm">{HERO_DATA.socialProof.rating}</span>
              </div>
              <p className="text-sm text-zinc-500">
                Trusted by <span className="text-zinc-300 font-medium">{HERO_DATA.socialProof.count}</span> {HERO_DATA.socialProof.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
