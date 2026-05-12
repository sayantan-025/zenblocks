"use client"

import React from "react"
import dynamic from "next/dynamic"
import { TESTIMONIALS_DATA } from "../data"
import { QuillTestimonials } from "../components/zenblocks"

const QuillTestimonialsClient = dynamic(
  () => import("../components/zenblocks/testimonials").then((mod) => mod.QuillTestimonials),
  { ssr: false, loading: () => <div className="h-64 animate-pulse bg-zinc-900/20 rounded-xl" /> }
)

export function Testimonials() {
    return (
        <section id="testimonials" className="relative px-6 py-24 bg-zinc-900/20">
            {/* Background gradient */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/50 to-zinc-950" /> */}

            <div className="relative max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                        Stories
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        <span className="text-zinc-100 block">Loved by writers</span>
                        <span className="bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                            everywhere
                        </span>
                    </h2>
                </div>

                {/* Testimonials Mosaic */}
                <QuillTestimonialsClient testimonials={TESTIMONIALS_DATA} />
            </div>
        </section>
    )
}
