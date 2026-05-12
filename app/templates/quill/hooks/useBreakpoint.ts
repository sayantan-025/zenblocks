"use client"

import { useState, useEffect } from "react"

// Breakpoint type
type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl"

// Hook for responsive design
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg")

  useEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      const width = window.innerWidth
      if (width < 640) return "sm"
      if (width < 768) return "md"
      if (width < 1024) return "lg"
      if (width < 1280) return "xl"
      return "2xl"
    }

    setBreakpoint(getBreakpoint())

    const handleResize = () => setBreakpoint(getBreakpoint())
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    breakpoint,
    isMobile: breakpoint === "sm" || breakpoint === "md",
    isTablet: breakpoint === "lg",
    isDesktop: breakpoint === "xl" || breakpoint === "2xl",
  }
}
