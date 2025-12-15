/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  id: string;
  title: string;
  href: string;
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
        description: "A responsive navigation bar component",
        count: 1,
      },
      {
        id: "preloader",
        title: "PreLoader",
        href: "/docs/blocks/pre-loader",
        description: "A preloader component with GSAP animations",
        count: 1,
        isNew: true,
      },
    ],
  },
] as const satisfies readonly NavSection[];
