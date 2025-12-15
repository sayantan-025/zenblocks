"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type PreLoaderProps = {
  onComplete?: () => void;
  /**
   * When true, renders inside a container instead of fullscreen.
   * Used for docs / previews.
   */
  embedded?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                PRELOADER                                   */
/* -------------------------------------------------------------------------- */

const PreLoader: React.FC<PreLoaderProps> = ({
  onComplete,
  embedded = false,
}) => {
  const screenRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const percentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!screenRef.current || !textRef.current || !percentRef.current) return;

      /* ---------------------------- Initial State ---------------------------- */

      gsap.set(textRef.current, {
        scale: 0,
        rotation: 180,
      });

      gsap.set(percentRef.current, {
        opacity: 0,
        y: 20,
      });

      /* ------------------------------ Animate In ----------------------------- */

      gsap.to(textRef.current, {
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      gsap.to(percentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "power2.out",
      });

      /* ------------------------- Percentage Counter -------------------------- */

      gsap.to(percentRef.current, {
        innerHTML: 100,
        duration: 2.5,
        delay: 1,
        ease: "power2.inOut",
        snap: { innerHTML: 1 },
        onUpdate() {
          const el = this.targets()[0] as HTMLElement;
          const value = Math.round(Number(el.innerHTML));
          el.innerHTML = `${value}%`;
        },
      });

      /* ------------------------------ Pulse Hold ----------------------------- */

      gsap.to(textRef.current, {
        scale: 1.1,
        duration: 0.5,
        delay: 1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });

      /* ------------------------------ Animate Out ----------------------------- */

      gsap.to(textRef.current, {
        scale: 0,
        rotation: -180,
        duration: 0.8,
        delay: 2.5,
        ease: "back.in(1.7)",
      });

      /* ---------------------------- Screen Fade ------------------------------ */

      gsap.to(screenRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 3.3,
        ease: "power1.inOut",
        onComplete: () => {
          onComplete?.();
        },
      });
    },
    { dependencies: [onComplete] }
  );

  return (
    <div
      ref={screenRef}
      className={cn(
        "loading-screen z-50 pointer-events-none bg-black text-white flex items-center justify-center",
        embedded ? "absolute inset-0" : "fixed inset-0"
      )}
    >
      <div
        ref={textRef}
        className="text-[200px] sm:text-[300px] md:text-[400px] font-black tracking-tight"
        style={{ fontFamily: "var(--font-amiamie)" }}
      >
        S
      </div>

      {/* Percentage counter */}
      <div
        ref={percentRef}
        className="absolute bottom-8 right-8 text-4xl sm:text-5xl md:text-6xl font-light italic text-white/80"
        style={{ fontFamily: "var(--font-amiamie)" }}
      >
        0%
      </div>
    </div>
  );
};

export default PreLoader;
