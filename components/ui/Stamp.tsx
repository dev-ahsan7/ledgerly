"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/format";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Final resting rotation in degrees. */
  rotate?: number;
};

/**
 * Rubber stamp that slams onto a card with a spring and slight rotation.
 * The resting rotation lives on the outer span so reduced motion keeps it.
 */
export function Stamp({ children, delay = 0.5, className, rotate = -12 }: Props) {
  return (
    <span className={cn("pointer-events-none inline-block", className)} style={{ transform: `rotate(${rotate}deg)` }}>
      <motion.span
        data-reveal
        className="inline-block rounded-md border-[3px] border-stamp px-3 py-1 font-mono text-xl font-bold uppercase tracking-[0.18em] text-stamp mix-blend-multiply md:text-2xl"
        initial={{ opacity: 0, scale: 2.4, rotate: -16 }}
        animate={{ opacity: 0.92, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 18, mass: 0.9, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
