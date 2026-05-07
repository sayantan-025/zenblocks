export type Template = {
  id: string;
  name: string;
  description: string;
  category: string[];
  tech: string[];
  isFree: boolean;
  thumbnailUrl: string;
  previewUrl: string;
  downloadUrl: string;
};

export const templatesData: Template[] = [
  {
    id: "zen-saas-dashboard",
    name: "Zen SaaS Dashboard",
    description: "A highly analytical and modular dashboard template for B2B SaaS applications.",
    category: ["SaaS", "Dark"],
    tech: ["Next.js", "Tailwind", "Framer"],
    isFree: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "portfolio-pro",
    name: "Portfolio Pro",
    description: "Minimalist portfolio template for designers, developers, and creatives.",
    category: ["Portfolio", "Light"],
    tech: ["Next.js", "Tailwind", "MDX"],
    isFree: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "agency-landing",
    name: "Agency Landing",
    description: "High-converting landing page designed specifically for digital agencies.",
    category: ["Agency", "Light", "Dark"],
    tech: ["React", "Framer Motion", "Tailwind"],
    isFree: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "ai-prompt-hub",
    name: "AI Prompt Hub",
    description: "A community-driven directory template for AI prompts and resources.",
    category: ["AI", "Dark"],
    tech: ["Next.js", "Supabase", "Tailwind"],
    isFree: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "ecom-storefront",
    name: "Ecom Storefront",
    description: "Modern headless e-commerce storefront with cart and checkout flows.",
    category: ["Ecommerce", "Light"],
    tech: ["Next.js", "Shopify API", "Tailwind"],
    isFree: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "startup-waitlist",
    name: "Startup Waitlist",
    description: "A sleek waitlist page for capturing leads before your product launch.",
    category: ["SaaS", "Dark"],
    tech: ["Next.js", "Tailwind", "Resend"],
    isFree: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=600&q=80",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "blog-chronicles",
    name: "Blog Chronicles",
    description: "A content-first blog template featuring typography and dark mode support.",
    category: ["Portfolio", "Dark", "Light"],
    tech: ["Next.js", "Tailwind", "Contentlayer"],
    isFree: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "doc-vault",
    name: "Doc Vault",
    description: "Beautiful documentation site template for open-source projects or APIs.",
    category: ["SaaS", "Light"],
    tech: ["Next.js", "Tailwind", "MDX"],
    isFree: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "ai-chatbot-ui",
    name: "AI Chatbot UI",
    description: "A responsive chat interface inspired by leading AI conversational models.",
    category: ["AI", "Dark"],
    tech: ["Next.js", "Tailwind", "Framer"],
    isFree: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "photography-folio",
    name: "Photography Folio",
    description: "An image-centric portfolio template designed to showcase photography.",
    category: ["Portfolio", "Dark"],
    tech: ["Next.js", "Tailwind"],
    isFree: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=600&q=80",
    previewUrl: "#",
    downloadUrl: "#",
  }
];
