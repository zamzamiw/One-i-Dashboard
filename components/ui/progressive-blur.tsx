import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Blur bertahap di tepi (turunan ibelick/progressive-blur dari 21st.dev): beberapa lapis
// backdrop-filter dengan kekuatan naik, masing-masing hanya tampil di satu pita lewat mask.
// Ditulis ulang tanpa motion (tidak ada animasi), jadi bisa dirender di server.
export const GRADIENT_ANGLES = { top: 0, right: 90, bottom: 180, left: 270 };

export function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 8,
  blurIntensity = 0.25,
  className,
  ...props
}: {
  direction?: keyof typeof GRADIENT_ANGLES;
  blurLayers?: number;
  blurIntensity?: number;
} & HTMLAttributes<HTMLDivElement>) {
  const layers = Math.max(blurLayers, 2);
  const segment = 1 / (blurLayers + 1);
  const angle = GRADIENT_ANGLES[direction];

  return (
    <div aria-hidden="true" className={cn("relative", className)} {...props}>
      {Array.from({ length: layers }, (_, index) => {
        const stops = [index, index + 1, index + 2, index + 3].map(
          (step, position) => `rgba(255, 255, 255, ${position === 1 || position === 2 ? 1 : 0}) ${step * segment * 100}%`,
        );
        const gradient = `linear-gradient(${angle}deg, ${stops.join(", ")})`;
        return (
          <div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ maskImage: gradient, WebkitMaskImage: gradient, backdropFilter: `blur(${index * blurIntensity}px)` }}
          />
        );
      })}
    </div>
  );
}
