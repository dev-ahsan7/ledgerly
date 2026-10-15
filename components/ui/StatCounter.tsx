"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Number that counts up (or down) to its value when scrolled into view. */
export function StatCounter({ value, from = 0, prefix = "", suffix = "", duration = 1.4, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(from, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, from, value, duration]);

  const final = `${prefix}${value}${suffix}`;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{final}</span>
      <span aria-hidden className="tabular">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
