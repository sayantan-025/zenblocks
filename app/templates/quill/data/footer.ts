// Footer data for Quill landing page
import type { FooterData } from "../types";

export const FOOTER_DATA: FooterData = {
  description:
    "Quill is the AI writing platform built for clarity, creativity, and consistency. Write anything. Sound like yourself.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Integrations", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Blog", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Tutorials", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  ],
  builtBy: {
    name: "ZenBlocks",
    url: "https://zenblocks-three.vercel.app",
    description: "Premium components & templates",
  },
};
