"use client"

import React from "react"
import { FAQSection as ZenFAQ } from '../components/zenblocks/faq'
import { FAQ_DATA } from "../data"

export function FAQ() {
  return (
    <section id="faq" className="px-6 py-24 bg-zinc-900/20">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">{FAQ_DATA.badge}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-zinc-100 block">{FAQ_DATA.title.split(" ").slice(0, 1).join(" ")}</span>
            <span className="bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              {FAQ_DATA.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-balance text-lg">
            {FAQ_DATA.subtitle}
          </p>
        </div>

        {/* FAQ Content */}
        <ZenFAQ items={FAQ_DATA.items} layout="stacked" />
      </div>
    </section>
  )
}
