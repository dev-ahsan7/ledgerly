"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
};

/**
 * Fades and slides content in once it scrolls into view.
 * Under prefers-reduced-motion the [data-reveal] CSS rule shows the final state.
 */
export function Reveal({ children, className, delay = 0, y = 24, x = 0 }: Props) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
