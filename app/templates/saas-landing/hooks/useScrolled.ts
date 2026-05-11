"use client";

import { useEffect, useState } from "react";

/**
 * Hook to track whether the page has been scrolled.
 * Useful for changing navbar styles on scroll.
 * 
 * @param threshold - The scroll threshold in pixels
 * @returns boolean - True if scrolled beyond threshold
 */
export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
