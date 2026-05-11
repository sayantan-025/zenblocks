import Navbar from "@/components/zenblocks/navbar";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/landing/footer";


export const metadata: Metadata = {
  title: {
    template: "%s | zenblocks - Free UI Components to build beautiful websites",
    default: "Templates | zenblocks - Premium SaaS Templates",
  },
};

const navItems = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/blocks/navbar" },
  { label: "Templates", href: "/templates" },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar items={navItems} />
      
      <main className="flex-1 relative">
        {children}
      </main>
      <Footer/>
    </div>
  );
}
