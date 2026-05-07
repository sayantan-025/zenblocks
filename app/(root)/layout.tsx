import Navbar from "@/components/zenblocks/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "ZenBlocks - Open Source Components for Developers",
    default: "ZenBlocks",
  },
};

const navItems = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/blocks/navbar" },
  { label: "Templates", href: "/templates" },
];

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar items={navItems} />

      <main className="relative w-full pt-10 md:pt-0 bg-background text-foreground transition-colors duration-300 min-h-screen">
        {children}
      </main>
    </>
  );
}
