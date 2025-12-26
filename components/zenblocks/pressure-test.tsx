"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface Vec2 {
  x: number;
  y: number;
}

interface PressureTestProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  minFontSize?: number;
  justify?: "start" | "center" | "end" | "between";
}

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

const dist = (a: Vec2, b: Vec2): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (
  distance: number,
  maxDist: number,
  minVal: number,
  maxVal: number
): number => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */

const PressureTest: React.FC<PressureTestProps> = ({
  text = "Compressa",
  fontFamily = "Compressa VF",
  fontUrl = "https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2",
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor,
  strokeColor,
  strokeWidth = 2,
  className = "",
  minFontSize = 24,
  justify = "between",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<Array<HTMLSpanElement | null>>([]);

  const mouseRef = useRef<Vec2>({ x: 0, y: 0 });
  const cursorRef = useRef<Vec2>({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [mounted, setMounted] = useState(false);

  const chars = useMemo(() => text.split(""), [text]);

  /* ------------------------------ MOUNT ----------------------------------- */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ------------------------------ POINTER -------------------------------- */

  useEffect(() => {
    if (!mounted) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      cursorRef.current = { ...mouseRef.current };
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [mounted]);

  /* ------------------------------ RESIZE ---------------------------------- */

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: cw, height: ch } =
      containerRef.current.getBoundingClientRect();

    let nextFontSize = cw / (chars.length / 2);
    nextFontSize = Math.max(nextFontSize, minFontSize);

    setFontSize(nextFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = ch / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    if (!mounted) return;

    const onResize = debounce(setSize, 100);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mounted, setSize]);

  /* ------------------------------ ANIMATION ------------------------------- */

  useEffect(() => {
    if (!mounted) return;

    let rafId = 0;

    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const center: Vec2 = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouseRef.current, center);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const ital = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : "0";
          const a = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : "1";

          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
          if (alpha) span.style.opacity = a;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [mounted, width, weight, italic, alpha]);

  /* ------------------------------ STYLES ---------------------------------- */

  const styleElement = useMemo(() => {
    if (!mounted) return null;

    return (
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }

        .pressure-test-title span {
          display: inline-block;
          transform-origin: center center;
        }

        .stroke span {
          position: relative;
          color: ${textColor || "inherit"};
        }

        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          inset: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor || "currentColor"};
        }
      `}</style>
    );
  }, [mounted, fontFamily, fontUrl, textColor, strokeColor, strokeWidth]);

  /* ------------------------------ RENDER ---------------------------------- */

  // 🔥 HARD GATE — NOTHING RENDERS ON SERVER
  if (!mounted) {
    return <div className="relative w-full h-full" aria-hidden="true" />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-transparent flex items-center justify-center"
    >
      {styleElement}

      <h1
        ref={titleRef}
        className={`pressure-test-title ${className} ${flex ? "flex w-full" : ""
          } ${stroke ? "stroke" : ""} uppercase text-center`}
        style={{
          fontFamily,
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          fontWeight: 100,
          color: textColor,
          whiteSpace: "nowrap",
          width: "100%",
          justifyContent: justify === "between" ? "space-between" : justify === "center" ? "center" : justify === "end" ? "flex-end" : "flex-start",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export { PressureTest };

export function PressureTestDemo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 bg-transparent">
      <PressureTest
        text="ZENBLOCKS"
        className="text-zinc-950 dark:text-white"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
      />
    </div>
  );
}

export default PressureTestDemo;
