// Navigation Constants
export const NAV_LINKS = {
  features: "#features",
  impact: "#impact",
  testimonials: "#testimonials",
  pricing: "#pricing",
} as const

// Animation Constants
export const ANIMATION = {
  spring: {
    stiffness: 200,
    damping: 20,
  },
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
  },
} as const

// Layout Constants
export const LAYOUT = {
  maxWidth: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  navbar: {
    height: "4rem",
    borderRadius: "50px",
  },
} as const

// Breakpoints (for reference, Tailwind uses these)
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const
