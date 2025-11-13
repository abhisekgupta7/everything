"use client";
import React from "react";

type Props = {
  current?: number; // 1-based
  total?: number;
  onSelect?: (index: number) => void;
  className?: string;
  height?: number; // px
  activeColor?: string; // css color for active segment
  completedGradient?: string; // css background for completed segments
  showIndex?: boolean;
};

export default function ProgressBar({
  current = 1,
  total = 1,
  onSelect,
  className = "w-full",
  height = 10,
  activeColor = "#ef4444", // red by default
  completedGradient = "linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)",
  showIndex = false,
}: Props) {
  const safeTotal = Math.max(1, Math.floor(total));
  const safeCurrent = Math.min(Math.max(1, Math.floor(current)), safeTotal);

  // segment gap in px (uses CSS gap via flex)
  const gap = 8;

  return (
    <div className={`flex flex-col items-stretch ${className}`}>
      <div
        className="relative w-full"
        style={{ height, display: "flex", gap: `${gap}px` }}
        role="group"
        aria-label="Summary progress"
      >
        {/* Render each segment as equal flex item */}
        {Array.from({ length: safeTotal }).map((_, i) => {
          const idx = i + 1;
          const status =
            idx < safeCurrent
              ? "completed"
              : idx === safeCurrent
              ? "active"
              : "pending";

          const base =
            "flex-1 rounded-md h-full relative overflow-hidden transition-transform";

          const style: React.CSSProperties = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: onSelect ? "pointer" : "default",
          };

          if (status === "completed") {
            style.background = completedGradient;
            style.boxShadow = "inset 0 -6px 18px rgba(0,0,0,0.08)";
          } else if (status === "active") {
            style.background = activeColor;
            style.boxShadow = "0 4px 18px rgba(0,0,0,0.08)";
          } else {
            style.background = "#eef2ff"; // light slate
          }

          return (
            <button
              key={idx}
              onClick={() => onSelect?.(idx)}
              aria-current={status === "active" ? "true" : undefined}
              aria-label={`Go to section ${idx}`}
              title={`Section ${idx}`}
              className={base}
              style={style}
            >
              {showIndex ? (
                <span
                  className={`text-xs font-semibold ${
                    status === "pending" ? "text-slate-600" : "text-white"
                  }`}
                >
                  {idx}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
