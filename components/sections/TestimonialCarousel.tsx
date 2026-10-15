"use client";

import { useState } from "react";
import { testimonials, testimonialsCopy } from "@/lib/testimonials";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { cn } from "@/lib/format";

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 5v14l12-7z" />
    </svg>
  );
}

/** One run of cards. The second run is a visual duplicate for the seamless loop. */
function Run({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate || undefined} className="flex shrink-0 gap-4 pr-4">
      {testimonials.map((t, i) => (
        <li key={t.name} className="flex w-[300px] shrink-0 sm:w-[340px]">
          <TestimonialCard {...t} index={i} className="w-full" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Auto-scrolling testimonial row. Pauses on hover, on keyboard focus, or with the
 * pause button. People who prefer reduced motion get a static grid instead.
 */
export function TestimonialCarousel() {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <div className="motion-only">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{testimonialsCopy.rowLabel}</p>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-xs font-medium hover:border-ink/40"
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
            {paused ? "Play" : "Pause"}
            <span className="sr-only"> customer stories</span>
          </button>
        </div>

        <div
          role="region"
          aria-label={testimonialsCopy.rowLabel}
          className="marquee-mask group -mx-4 overflow-hidden sm:-mx-6 lg:mx-0"
        >
          <div
            className={cn(
              "flex w-max items-stretch animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
              paused && "[animation-play-state:paused]",
            )}
            style={{ ["--marquee-duration" as string]: "60s" }}
          >
            <Run />
            <Run duplicate />
          </div>
        </div>
      </div>

      {/* Reduced motion: everything visible at once, nothing moves. */}
      <ul aria-label={testimonialsCopy.rowLabel} className="reduced-only gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <li key={t.name} className="flex">
            <TestimonialCard {...t} index={i} className="w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
