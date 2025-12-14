export interface NavItem {
  id: string | number;
  title: string;
  href: string;
  description?: string;
  count?: number | string;
  isComingSoon?: boolean;
  isNew?: boolean;
  isLab?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigationSections: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        id: "intro",
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
        id: 1,
        title: "Navbar",
        href: "/docs/blocks/navbar",
        description: "A responsive navigation bar component",
        count: 1,
      },
    ],
  },
];
