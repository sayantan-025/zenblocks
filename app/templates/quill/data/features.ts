// Features section data for Quill landing page
import type { FeaturesData } from "../types";

export const FEATURES_DATA: FeaturesData = {
  badge: "What Quill does",
  title: "Your entire content stack, simplified",
  subtitle:
    "Everything a modern content team needs — under one roof, powered by AI.",
  items: [
    {
      id: "editor",
      title: "AI-Powered Editor",
      description:
        "Write, rewrite, and refine in a distraction-free editor that understands context, tone, and intent — not just keywords.",
      className: "md:col-span-3",
      icon: "PenLine",
    },
    {
      id: "tone",
      title: "Tone Matching",
      description:
        "Train Quill on your brand voice. It learns your style and keeps every output consistent.",
      className: "md:col-span-2",
      icon: "Sparkles",
    },
    {
      id: "multilang",
      title: "50+ Languages",
      description:
        "Write globally without a translation team. Quill localizes nuance, not just words.",
      className: "md:col-span-2",
      icon: "Globe2",
    },
    {
      id: "insights",
      title: "Content Analytics",
      description:
        "See what content resonates. Quill tracks performance and suggests improvements based on real data.",
      className: "md:col-span-3",
      icon: "BarChart2",
    },
  ],
};
