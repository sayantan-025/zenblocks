"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"
import { cn } from "../../lib/utils"
import type { LogoItem } from "./types"

interface QuillLogoLoopProps {
    items: LogoItem[]
    speed?: number
    direction?: "left" | "right"
    gap?: number
    logoHeight?: number
    pauseOnHover?: boolean
    className?: string
}

const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.2,
    MIN_COPIES: 2,
} as const

/* -------------------------------------------------------------------------- */
/*                               LOGO BOX COMPONENT                           */
/* -------------------------------------------------------------------------- */

const LogoBox = ({ item, height }: { item: LogoItem; height: number }) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, height, perspective: 1000 }}
            data-logo-box
            className="relative flex items-center justify-center px-6 py-3 border border-zinc-800/50 rounded-xl group/logo transition-all hover:border-zinc-700 hover:shadow-md"
        >
            {/* Glint Effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden rounded-xl"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
            </motion.div>

            {item.node ? (
                <div className="flex items-center gap-2">
                    {item.node as React.ReactNode}
                    {item.name && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors">
                            {item.name}
                        </span>
                    )}
                </div>
            ) : item.src ? (
                <div className="relative" style={{ height, width: "auto" }}>
                    <Image
                        src={item.src}
                        alt={item.alt || "logo"}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100"
                        sizes="120px"
                    />
                </div>
            ) : null}
        </motion.div>
    )
}

/* -------------------------------------------------------------------------- */
/*                                MAIN LOGO LOOP                              */
/* -------------------------------------------------------------------------- */

export function QuillLogoLoop({
    items,
    speed = 80,
    direction = "left",
    gap = 16,
    logoHeight = 40,
    pauseOnHover = true,
    className
}: QuillLogoLoopProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const seqRef = useRef<HTMLDivElement>(null)

    const [seqWidth, setSeqWidth] = useState(0)
    const [copyCount, setCopyCount] = useState(2)
    const [isHovered, setIsHovered] = useState(false)

    const offsetRef = useRef(0)
    const lastTimeRef = useRef<number | null>(null)
    const velocityRef = useRef(speed * (direction === "left" ? 1 : -1))

    useEffect(() => {
        if (!containerRef.current || !seqRef.current) return

        const update = () => {
            if (!containerRef.current || !seqRef.current) return
            const cWidth = containerRef.current.offsetWidth
            const sWidth = seqRef.current.offsetWidth + gap

            if (sWidth > 0) {
                setSeqWidth(sWidth)
                const needed = Math.ceil(cWidth / sWidth) + 2
                setCopyCount(Math.max(2, needed))
            }
        }

        const observer = new ResizeObserver(() => {
            requestAnimationFrame(update)
        })

        observer.observe(containerRef.current)
        if (seqRef.current) observer.observe(seqRef.current)

        update()

        return () => observer.disconnect()
    }, [items, gap])

    useEffect(() => {
        let animationFrameId: number
        lastTimeRef.current = null

        const animate = (time: number) => {
            if (lastTimeRef.current === null) {
                lastTimeRef.current = time
                animationFrameId = requestAnimationFrame(animate)
                return
            }

            const delta = (time - lastTimeRef.current) / 1000
            lastTimeRef.current = time

            const targetVel = isHovered && pauseOnHover ? 0 : speed * (direction === "left" ? 1 : -1)
            const easing = 1 - Math.exp(-delta / ANIMATION_CONFIG.SMOOTH_TAU)
            velocityRef.current += (targetVel - velocityRef.current) * easing

            if (seqWidth > 0 && trackRef.current) {
                offsetRef.current += velocityRef.current * delta
                offsetRef.current = (offsetRef.current % seqWidth + seqWidth) % seqWidth
                trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrameId)
    }, [seqWidth, isHovered, speed, direction, pauseOnHover])

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full overflow-hidden group/loop py-8", className)}
        >
            {/* Masking Gradients */}
            {/* <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" /> */}

            <div
                ref={trackRef}
                className="flex w-max"
                style={{ gap }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {Array.from({ length: copyCount }).map((_, i) => (
                    <div
                        key={i}
                        ref={i === 0 ? seqRef : null}
                        className="flex shrink-0"
                        style={{ gap }}
                    >
                        {items.map((item, idx) => (
                            <LogoBox key={idx} item={item} height={logoHeight} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
