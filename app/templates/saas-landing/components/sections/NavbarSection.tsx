"use client";

import Link from "next/link";
import ZenNavbar from "../zenblocks/navbar";
import { useScrolled } from "../../hooks/useScrolled";
import { NAV_ITEMS } from "../../data/nav";
import { SITE_NAME } from "../../constants";
import { Button } from "@/components/ui/button";

/**
 * Navbar section that adapts its appearance based on scroll position.
 */
export function NavbarSection() {
  const scrolled = useScrolled();

  return (
    <ZenNavbar
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          {SITE_NAME}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex rounded-full">
            Log in
          </Button>
          <Button size="sm" className="rounded-full">
            Get Started
          </Button>
        </div>
      </div>
    </ZenNavbar>
  );
}
