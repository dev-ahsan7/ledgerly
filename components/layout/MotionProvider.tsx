"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Framer Motion skips transform animations for users who prefer reduced motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
