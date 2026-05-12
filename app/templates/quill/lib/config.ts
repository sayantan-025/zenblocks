// Site Configuration
// Centralized configuration for the Quill landing page

export const siteConfig = {
  name: "Quill",
  title: "Quill - AI Writing Platform",
  description:
    "Write less. Say more. Quill turns scattered thoughts into polished content in seconds. AI-powered writing for blogs, emails, ad copy, and product docs.",
  keywords: [
    "AI writing",
    "content creation",
    "copywriting",
    "productivity",
    "writing assistant",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://quill.ai",
  ogImage: "/og-image.png",
  favicon: "/icon.svg",
  appleIcon: "/icon.svg",
} as const

export const socialConfig = {
  twitter: "@quillai",
  github: "https://github.com/quill-ai",
} as const

export const browserConfig = {
  supported: ["Chrome 90+", "Firefox 90+", "Safari 14+", "Edge 90+"],
  unsupported: ["IE11"],
} as const

export default siteConfig
