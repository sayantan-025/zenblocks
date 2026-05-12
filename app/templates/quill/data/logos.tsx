// Logo bar / partners data for Quill landing page
import type { LogoItem } from "../components/zenblocks/types"
import * as LucideIcons from "lucide-react"

export const LOGO_ITEMS: LogoItem[] = [
  { name: "Notion", node: <LucideIcons.PenLine className="w-6 h-6" /> },
  { name: "HubSpot", node: <LucideIcons.BarChart2 className="w-6 h-6" /> },
  { name: "Figma", node: <LucideIcons.Sparkles className="w-6 h-6" /> },
  { name: "Webflow", node: <LucideIcons.Globe2 className="w-6 h-6" /> },
  { name: "Linear", node: <LucideIcons.BrainCircuit className="w-6 h-6" /> },
  { name: "Loom", node: <LucideIcons.ShieldCheck className="w-6 h-6" /> },
  { name: "Stripe", node: <LucideIcons.BarChart2 className="w-6 h-6" /> },
  { name: "Vercel", node: <LucideIcons.Sparkles className="w-6 h-6" /> },
]

export const IMPACT_DATA = {
  title: "Powering Teams at",
  subtitle: "Trusted by creators, agencies & enterprises",
  description:
    "From solo bloggers to global marketing teams, Quill adapts to every voice and workflow.",
  partners: LOGO_ITEMS,
}
