"use client"

import React from "react"
import dynamic from "next/dynamic"
import { IMPACT_DATA } from "../data"

const QuillLogoLoopClient = dynamic(
  () => import("../components/zenblocks/logo-loop").then((mod) => mod.QuillLogoLoop),
  { ssr: false, loading: () => <div className="h-20 animate-pulse bg-zinc-900/20 rounded-xl" /> }
)

export function LogoBar() {
  return (
    <section className="relative px-6 py-20 border-y border-zinc-800/50 overflow-hidden bg-zinc-900/20">
      {/* Subtle gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950/50" /> */}

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider text-center mb-12">
          {IMPACT_DATA.title}
        </p>

        {/* Logo Loop */}
        <QuillLogoLoopClient
          items={IMPACT_DATA.partners}
          speed={80}
          direction="left"
          gap={16}
          logoHeight={40}
          pauseOnHover={true}
        />
      </div>
    </section>
  )
}
