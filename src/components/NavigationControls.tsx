"use client";
import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

type Props = {
  current?: number; // 1-based index
  total?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onDownload?: () => void;
  onClose?: () => void;
  onSelect?: (index: number) => void;
  compact?: boolean;
};

export default function NavigationControls({
  current = 1,
  total = 1,
  onPrev,
  onNext,
  onDownload,
  onClose,
  onSelect,
  compact = false,
}: Props) {
  const canPrev = current > 1;
  const canNext = current < total;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" && canPrev) onPrev?.();
      if (e.key === "ArrowRight" && canNext) onNext?.();
      if ((e.key === "d" || e.key === "D") && onDownload) onDownload();
      if (e.key === "Escape" && onClose) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canPrev, canNext, onPrev, onNext, onDownload, onClose]);

  const base =
    "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
  const primary =
    base + " bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-300";
  const ghost =
    base +
    " bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
  const disabled = base + " bg-slate-100 text-slate-400 cursor-not-allowed";

  return (
    <div
      className={`w-full flex items-center justify-between gap-3 ${
        compact ? "py-2" : "py-4"
      }`}
    >
      <div className="flex items-center gap-2">
        <button
          aria-label="Previous summary"
          onClick={() => canPrev && onPrev?.()}
          disabled={!canPrev}
          className={canPrev ? ghost : disabled}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-md bg-white border border-slate-100 text-sm text-slate-600">
            <span className="font-medium">{current}</span>
            <span className="mx-1">/</span>
            <span>{total}</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {Array.from({ length: Math.max(0, total) }).map((_, i) => {
              const idx = i + 1;
              const active = idx === current;
              return (
                <button
                  key={idx}
                  aria-label={`Go to section ${idx}`}
                  onClick={() => onSelect?.(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    active ? "bg-slate-900" : "bg-slate-300"
                  }`}
                />
              );
            })}
          </div>
        </div>

        <button
          aria-label="Next summary"
          onClick={() => canNext && onNext?.()}
          disabled={!canNext}
          className={canNext ? ghost : disabled}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>


        
    </div>
  );
}
