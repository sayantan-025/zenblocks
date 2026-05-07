/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  description?: string;
  count?: number;
  isComingSoon?: boolean;
  isNew?: boolean;
  isLab?: boolean;
}

export interface NavSection {
  title: string;
  items: readonly NavItem[];
}

/* -------------------------------------------------------------------------- */
/*                               NAVIGATION DATA                              */
/* -------------------------------------------------------------------------- */

export const navigationSections = [
  {
    title: "Getting Started",
    items: [
      {
        id: "installation",
        title: "Installation",
        href: "/docs",
        icon: "Library",
        description: "Introduction and usage guidelines",
      },
    ],
  },

  {
    title: "Blocks",
    items: [
      {
        id: "navbar",
        title: "Navbar",
        href: "/docs/blocks/navbar",
        icon: "Navigation",
        description: "A responsive navigation bar component",
        count: 1,
      },
      {
        id: "animated-button",
        title: "Animated Button",
        href: "/docs/blocks/animated-button",
        icon: "MousePointer2",
        description: "A signature multi-axis magnetic button",
        count: 1,
        isNew: true,
      },
      {
        id: "preloader",
        title: "PreLoader",
        href: "/docs/blocks/pre-loader",
        icon: "Loader2",
        description: "A preloader component with GSAP animations",
        count: 1,
      },
      {
        id: "animated-clock",
        title: "Animated Clock",
        href: "/docs/blocks/animated-clock",
        icon: "Clock",
        description: "A 3D glassmorphic digital clock",
        count: 1,
      },
      {
        id: "bento-grid",
        title: "Bento Grid",
        href: "/docs/blocks/bento-grid",
        icon: "LayoutGrid",
        description: "Responsive mosaic grid with magnetic spotlights",
        count: 1,
        isNew: true,
      },
      {
        id: "floating-dock",
        title: "Floating Dock",
        href: "/docs/blocks/floating-dock",
        icon: "Anchor",
        description: "macOS-inspired dock with proximity magnification",
        count: 1,
        isNew: true,
      },
      {
        id: "image-gallery",
        title: "Image Gallery",
        href: "/docs/blocks/image-gallery",
        icon: "Image",
        description: "Infinite scrolling gallery with 3D tilt effects",
        count: 1,
        isNew: true,
      },
      {
        id: "image-trail",
        title: "Image Trail",
        href: "/docs/blocks/image-trail",
        icon: "MousePointerClick",
        description: "Cursor-following image trail effect",
        count: 1,
        isNew: true,
      },
      {
        id: "logo-loop",
        title: "Logo Loop",
        href: "/docs/blocks/logo-loop",
        icon: "RefreshCw",
        description: "Infinite scrolling marquee with 3D tilt",
        count: 1,
        isNew: true,
      },
      {
        id: "orb-field",
        title: "Orb Field",
        href: "/docs/blocks/orb-field",
        icon: "Globe",
        description: "Three.js particle simulation with interactive orbs",
        count: 1,
        isNew: true,
      },
      {
        id: "pressure-test",
        title: "Pressure Test",
        href: "/docs/blocks/pressure-test",
        icon: "Activity",
        description: "Variable font distortion with proximity effects",
        count: 1,
        isNew: true,
      },
      {
        id: "shuffle",
        title: "Shuffle",
        href: "/docs/blocks/shuffle",
        icon: "Dices",
        description: "Cyberpunk text reveal animation",
        count: 1,
        isNew: true,
      },
      {
        id: "theme-switcher",
        title: "Theme Switcher",
        href: "/docs/blocks/theme-switcher",
        icon: "Palette",
        description: "Segmented control for theme switching",
        count: 1,
        isNew: true,
      },
      {
        id: "toast",
        title: "Toast",
        href: "/docs/blocks/toast",
        icon: "Bell",
        description: "A provider-based toast notification system",
        count: 1,
        isNew: true,
      },
      {
        id: "modal-dialog",
        title: "Modal Dialog",
        href: "/docs/blocks/modal-dialog",
        icon: "Square",
        description: "Accessible modal dialog with focus trapping",
        count: 1,
        isNew: true,
      },
      {
        id: "testimonials",
        title: "Testimonials",
        href: "/docs/blocks/testimonials",
        icon: "MessageSquare",
        description: "Infinite scrolling multi-column testimonial mosaic",
        count: 1,
        isNew: true,
      },
      {
        id: "faq",
        title: "FAQ",
        href: "/docs/blocks/faq",
        icon: "HelpCircle",
        description: "Animated accordion FAQ with layout variants",
        count: 1,
        isNew: true,
      },
    ],
  },
] as const satisfies readonly NavSection[];
