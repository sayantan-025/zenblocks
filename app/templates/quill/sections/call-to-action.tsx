"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { CTA_DATA } from "../data"
import GradientButton from "../components/ui/gradient-button"

export function CallToAction() {
    return (
        <section className="relative py-20 md:py-40 px-5 overflow-hidden">
            <div className="absolute inset-0 top-[-90px] pointer-events-none">
        <svg
          className="w-full h-full opacity-60"
          viewBox="0 0 1388 825"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <mask
            id="mask0_cta"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="269"
            y="27"
            width="850"
            height="493"
          >
            <rect x="269.215" y="27.4062" width="849.57" height="492.311" fill="url(#paint0_linear_cta)" />
          </mask>
          <g mask="url(#mask0_cta)">
            <g filter="url(#filter0_f_cta)">
              <ellipse
                cx="694"
                cy="-93.0414"
                rx="670.109"
                ry="354.908"
                fill="url(#paint1_radial_cta)"
                fillOpacity="0.8"
              />
            </g>
            <ellipse cx="694" cy="-91.5385" rx="670.109" ry="354.908" fill="url(#paint2_linear_cta)" />
            <ellipse cx="694" cy="-93.0414" rx="670.109" ry="354.908" fill="url(#paint3_linear_cta)" />
          </g>
          <defs>
            <filter
              id="filter0_f_cta"
              x="-234.109"
              y="-705.949"
              width="1856.22"
              height="1225.82"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="129" result="effect1_foregroundBlur_cta" />
            </filter>
            <linearGradient
              id="paint0_linear_cta"
              x1="1118.79"
              y1="273.562"
              x2="269.215"
              y2="273.562"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="black" stopOpacity="0" />
              <stop offset="0.2" stopColor="black" stopOpacity="0.8" />
              <stop offset="0.8" stopColor="black" stopOpacity="0.8" />
              <stop offset="1" stopColor="black" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint1_radial_cta"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(683.482 245.884) rotate(-3.78676) scale(469.009 248.4)"
            >
              <stop offset="0.1294" stopColor="#d4d4d8" />
              <stop offset="0.2347" stopColor="#a1a1aa" />
              <stop offset="0.3" stopColor="#a1a1aa" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint2_linear_cta"
              x1="694"
              y1="-446.446"
              x2="694"
              y2="263.369"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_cta"
              x1="694"
              y1="-447.949"
              x2="694"
              y2="261.866"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="black" />
              <stop offset="1" stopColor="black" />
            </linearGradient>
          </defs>
        </svg>
      </div>
            <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {/* Badge - Same style as other sections */}
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-6">
                    {CTA_DATA.badge}
                </p>

                {/* Headline - Same size as other sections */}
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    <span className="text-zinc-100 block">{CTA_DATA.title.split(" ").slice(0, 2).join(" ")}</span>
                    <span className="bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                        {CTA_DATA.title.split(" ").slice(2).join(" ")}
                    </span>
                </h2>

                {/* Subheadline */}
                <p className="text-zinc-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
                    {CTA_DATA.subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                    <GradientButton href="#">
                        {CTA_DATA.primary}
                    </GradientButton>
                    <Link
                        href="#features"
                        className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                        <span>{CTA_DATA.secondary}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>

                
            </motion.div>
        </section>
    )
}
