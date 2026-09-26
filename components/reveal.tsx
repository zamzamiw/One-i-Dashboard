"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// Fade-up ringan saat elemen masuk layar, sekali saja.
// `initial` sengaja selalu sama di server dan browser (mencegah hydration mismatch);
// prefers-reduced-motion cukup membuat transisinya instan.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
