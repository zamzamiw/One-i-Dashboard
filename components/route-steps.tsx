"use client";

import { useRef } from "react";
import { motion, useInView, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export type RouteStep = { title: string; description?: string };

// Daftar bernomor yang dihubungkan garis "rute" vertikal (PRD 5.5).
// Garis terisi mengikuti scroll, dan nomor menyala saat garis melewati titik 65%
// tinggi layar. Pengguna prefers-reduced-motion melihat garis penuh tanpa efek scroll.
// Keadaan awal selalu sama di server dan browser (useScroll mulai dari 0, useInView false).
export function RouteSteps({ steps, className }: { steps: RouteStep[]; className?: string }) {
  return (
    <ol role="list" className={className}>
      {steps.map((step, index) => (
        <Step key={step.title} step={step} number={index + 1} last={index === steps.length - 1} />
      ))}
    </ol>
  );
}

function Step({ step, number, last }: { step: RouteStep; number: number; last: boolean }) {
  const markerRef = useRef<HTMLSpanElement>(null);
  const reached = useInView(markerRef, { margin: "9999px 0px -35% 0px" });

  return (
    <li className={cn("relative grid grid-cols-[3rem_1fr] gap-5", !last && "pb-10")}>
      <span
        ref={markerRef}
        className={cn(
          "relative z-10 flex size-12 items-center justify-center rounded-full border-2 font-heading text-base font-bold transition-colors duration-300",
          // Tanpa efek scroll: semua nomor langsung menyala, sama seperti garisnya.
          "motion-reduce:border-brand-blue motion-reduce:bg-brand-blue motion-reduce:text-white motion-reduce:transition-none",
          reached
            ? "border-brand-blue bg-brand-blue text-white"
            : "border-brand-blue/30 bg-white text-brand-blue",
        )}
      >
        {String(number).padStart(2, "0")}
      </span>
      {!last && <Segment />}
      <div className="pt-2.5">
        <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
        {step.description && <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{step.description}</p>}
      </div>
    </li>
  );
}

// Potongan garis dari bawah lingkaran ini sampai atas lingkaran berikutnya.
function Segment() {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 65%"] });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="absolute top-12 bottom-0 left-6 w-0.5 -translate-x-1/2 overflow-hidden bg-brand-blue/15"
    >
      <motion.span
        className="absolute inset-0 origin-top bg-brand-blue motion-reduce:transform-none!"
        style={{ scaleY: scrollYProgress }}
      />
    </span>
  );
}
