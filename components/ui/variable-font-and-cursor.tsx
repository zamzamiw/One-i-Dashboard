"use client";

import { useCallback, useRef, type RefObject } from "react";
import { motion, useAnimationFrame, useReducedMotion } from "motion/react";
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref";
import { cn } from "@/lib/utils";

// Dari 21st.dev (variable-font-and-cursor), disesuaikan untuk project ini:
// - import dari "motion/react" (bukan framer-motion)
// - posisi mouse dibaca dari ref, bukan state, supaya tidak render ulang di setiap gerakan
// - sumbu x dan y opsional (Space Grotesk hanya punya sumbu 'wght')
// - tidak mengubah apa pun sebelum pointer pertama kali bergerak, di perangkat sentuh,
//   atau untuk pengguna prefers-reduced-motion (teks tetap di gaya CSS-nya)

interface FontVariationAxis {
  name: string;
  min: number;
  max: number;
}

interface FontVariationMapping {
  x?: FontVariationAxis;
  y?: FontVariationAxis;
}

interface TextProps {
  label: string;
  fontVariationMapping: FontVariationMapping;
  containerRef: RefObject<HTMLDivElement | null>;
  className?: string;
  onClick?: () => void;
}

const VariableFontAndCursor = ({
  label,
  fontVariationMapping,
  className,
  containerRef,
  onClick,
  ...props
}: TextProps) => {
  const mousePosition = useMousePositionRef(containerRef);
  const initialPosition = useRef(mousePosition.current);
  const lastPosition = useRef(mousePosition.current);
  const spanRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  const interpolateFontVariationSettings = useCallback(
    (xPosition: number, yPosition: number) => {
      const container = containerRef.current;
      if (!container) return null;

      const xProgress = Math.min(Math.max(xPosition / container.clientWidth, 0), 1);
      const yProgress = Math.min(Math.max(yPosition / container.clientHeight, 0), 1);

      const axes = [
        fontVariationMapping.x && { ...fontVariationMapping.x, progress: xProgress },
        fontVariationMapping.y && { ...fontVariationMapping.y, progress: yProgress },
      ].filter((axis) => !!axis);

      return axes
        .map(({ name, min, max, progress }) => `'${name}' ${min + (max - min) * progress}`)
        .join(", ");
    },
    [containerRef, fontVariationMapping],
  );

  useAnimationFrame(() => {
    const position = mousePosition.current;
    // Belum pernah bergerak, atau tidak ada perubahan sejak frame terakhir.
    if (position === initialPosition.current || position === lastPosition.current) return;
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    lastPosition.current = position;

    const settings = interpolateFontVariationSettings(position.x, position.y);
    if (settings && spanRef.current) {
      spanRef.current.style.fontVariationSettings = settings;
    }
  });

  return (
    <motion.span ref={spanRef} className={cn("inline-block", className)} onClick={onClick} {...props}>
      {label}
    </motion.span>
  );
};

export { VariableFontAndCursor };
