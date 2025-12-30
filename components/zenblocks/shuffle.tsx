"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ShuffleProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  duration?: number;
  delay?: number; // adding delay support as a nice-to-have, but mostly just standardizing
}

export function Shuffle({
  text = "Shuffle",
  duration = 0.5, // 0.5s default for snappiness
  className,
  ...props
}: ShuffleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use a ref for text so we don't restart effect on every render if it's stable
  const originalText = useRef(text);

  useEffect(() => {
    originalText.current = text;
    setDisplayText(text); // Reset if prop changes
  }, [text]);

  const startShuffle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const steps = duration * 30; // Approx 30fps
    const increment = text.length / steps;

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        originalText.current
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText.current[index];
            }
            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
          })
          .join("")
      );

      if (iteration >= originalText.current.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText.current);
      }

      iteration += increment;
    }, 30);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsHovered(true);
    startShuffle();
    props.onMouseEnter?.(e);
  };

  // Initial play on mount
  useEffect(() => {
    startShuffle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <span
      className={cn("inline-block whitespace-nowrap", className)}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {displayText}
    </span>
  );
}


