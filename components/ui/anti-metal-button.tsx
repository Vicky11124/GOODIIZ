"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DoubleChevronProps {
  index: number;
  dotColor?: string;
}

const DoubleChevron = ({ index, dotColor = "#143D28" }: DoubleChevronProps) => {
  const base = index * 0.12;
  const dots = [
    { cx: 2, cy: 2, d: 0 },
    { cx: 5, cy: 5, d: 0.05 },
    { cx: 8, cy: 8, d: 0.1 },
    { cx: 5, cy: 11, d: 0.15 },
    { cx: 2, cy: 14, d: 0.2 },
    { cx: 6, cy: 2, d: 0.05 },
    { cx: 9, cy: 5, d: 0.1 },
    { cx: 12, cy: 8, d: 0.15 },
    { cx: 9, cy: 11, d: 0.2 },
    { cx: 6, cy: 14, d: 0.25 },
  ];

  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      aria-hidden="true"
      focusable="false"
      className="shrink-0 overflow-visible"
    >
      <g fill={dotColor}>
        {dots.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="1"
            className="bd-dot"
            style={{ animationDelay: `${base + p.d}s` }}
          />
        ))}
      </g>
    </svg>
  );
};

export interface AntiMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  accentFrom?: string;
  accentTo?: string;
  dotColor?: string;
}

export const AntiMetalButton = React.forwardRef<
  HTMLButtonElement,
  AntiMetalButtonProps
>(
  (
    {
      className,
      children,
      label,
      accentFrom = "#f5d061", // Warm Gold
      accentTo = "#c88e3e",   // Rich Agro Gold
      dotColor = "#143D28",   // Deep Forest Green
      onClick,
      ...props
    },
    ref
  ) => {
    const content = label ?? children ?? "Next Stage";
    const [isReset, setIsReset] = React.useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsReset(true);
      // Momentarily reset slider width on click
      setTimeout(() => {
        setIsReset(false);
      }, 350);

      e.currentTarget.blur();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "group/btn relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-goodiiz-gold shadow-md hover:shadow-xl",
          "bg-gradient-to-r from-[#143D28] via-[#0E2F1E] to-[#0A2417] text-white border border-goodiiz-gold/30",
          className
        )}
        {...props}
      >
        <style>{`
          @keyframes bd-dot-wave {
            0%, 70%, 100% { opacity: 0.25; transform: scale(0.85); }
            35% { opacity: 1; transform: scale(1.15); }
          }
          .bd-dot {
            transform-box: fill-box;
            transform-origin: center;
            animation: bd-dot-wave 1.4s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .bd-dot { animation: none; opacity: 1; }
          }
        `}</style>

        {/* Background Expanding Gold Slider with Animated Chevrons */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-1 left-1 top-1 z-0 flex w-10 items-center justify-start gap-2 overflow-hidden rounded-xl pl-2.5 pr-2 transition-[width,gap] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] pointer-events-none",
            !isReset && "group-hover/btn:w-[calc(100%-0.5rem)]"
          )}
          style={{
            background: `linear-gradient(135deg, ${accentFrom} 0%, ${accentTo} 100%)`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.2), 0 2px 8px rgba(200,142,62,0.4)",
          }}
        >
          <DoubleChevron index={0} dotColor={dotColor} />
          <DoubleChevron index={1} dotColor={dotColor} />
          <DoubleChevron index={2} dotColor={dotColor} />
          <DoubleChevron index={3} dotColor={dotColor} />
          <DoubleChevron index={4} dotColor={dotColor} />
          <DoubleChevron index={5} dotColor={dotColor} />
          <DoubleChevron index={6} dotColor={dotColor} />
          <DoubleChevron index={7} dotColor={dotColor} />
        </span>

        {/* Foreground Button Text - Always on Top & Readable */}
        <span className="relative z-10 flex items-center justify-center font-bold text-xs sm:text-sm tracking-wide text-white group-hover/btn:text-[#0A2417] transition-colors duration-300 pointer-events-none pl-10 pr-4 select-none">
          {content}
        </span>
      </button>
    );
  }
);

AntiMetalButton.displayName = "AntiMetalButton";

export default AntiMetalButton;
