"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

// Visual hero PRD 5.2: garis "rute" landai di Track, lalu melesat naik menuju Grow.
// Koordinat dalam viewBox 600 x 340.
const WIDTH = 600;
const HEIGHT = 340;
const BASELINE = 320;
const line = "M40 290 C90 285 110 275 150 270 C220 262 270 250 330 230 C420 200 480 140 550 60";
const area = `${line} L550 ${BASELINE} L40 ${BASELINE} Z`;

const DRAW_DELAY = 0.2;
const DRAW_DURATION = 1.6;

// Delay kira-kira saat garis mencapai tiap titik.
const stops = [
  { label: "Track", x: 150, y: 270, delay: 0.65 },
  { label: "Perform", x: 330, y: 230, delay: 1.0 },
  { label: "Grow", x: 550, y: 60, delay: DRAW_DELAY + DRAW_DURATION, final: true },
];

// `initial` sengaja selalu sama di server dan browser (mencegah hydration mismatch);
// prefers-reduced-motion cukup membuat semua transisi instan dan mematikan denyut.
export function RouteChart() {
  const reduceMotion = useReducedMotion();
  const timing = (transition: Transition): Transition => (reduceMotion ? { duration: 0 } : transition);

  return (
    <div className="rounded-2xl border bg-brand-surface p-4 sm:p-6">
      <div className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-labelledby="route-chart-title"
          className="block h-auto w-full"
        >
          <title id="route-chart-title">
            Grafik rute pertumbuhan: landai di tahap Track, naik di Perform, lalu melesat di Grow
          </title>
          <defs>
            <linearGradient id="route-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--brand-blue)", stopOpacity: 0.22 }} />
              <stop offset="100%" style={{ stopColor: "var(--brand-blue)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>

          {[80, 160, 240].map((y) => (
            <line key={y} x1="0" x2={WIDTH} y1={y} y2={y} strokeDasharray="4 8" className="stroke-border" strokeWidth="2" />
          ))}
          <line x1="0" x2={WIDTH} y1={BASELINE} y2={BASELINE} className="stroke-border" strokeWidth="2" />

          <motion.path
            d={area}
            fill="url(#route-chart-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={timing({ duration: 0.8, delay: 1.2 })}
          />
          <motion.path
            d={line}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-brand-blue"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={timing({ duration: DRAW_DURATION, delay: DRAW_DELAY, ease: "easeInOut" })}
          />

          {stops.map((stop) => (
            <motion.g
              key={stop.label}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={timing({ duration: 0.35, delay: stop.delay, ease: "easeOut" })}
            >
              {stop.final && (
                <motion.circle
                  cx={stop.x}
                  cy={stop.y}
                  r="11"
                  className="fill-brand-amber"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  initial={{ opacity: 0 }}
                  animate={reduceMotion ? { opacity: 0 } : { scale: [1, 2.6], opacity: [0.45, 0] }}
                  transition={timing({ duration: 1.8, delay: stop.delay + 0.4, repeat: Infinity, ease: "easeOut" })}
                />
              )}
              <circle
                cx={stop.x}
                cy={stop.y}
                r={stop.final ? 11 : 9}
                strokeWidth="5"
                className={stop.final ? "fill-brand-amber stroke-white" : "fill-white stroke-brand-blue"}
              />
            </motion.g>
          ))}
        </svg>

        {/* Label di HTML supaya ukuran teks tetap terbaca di layar kecil. */}
        {stops.map((stop) => (
          <motion.span
            key={stop.label}
            aria-hidden="true"
            className={cn(
              "absolute -translate-x-1/2 -translate-y-[calc(100%+16px)] rounded-full border bg-white px-2.5 py-1 font-heading text-xs font-semibold whitespace-nowrap shadow-sm sm:text-sm",
              stop.final && "border-brand-amber",
            )}
            style={{ left: `${(stop.x / WIDTH) * 100}%`, top: `${(stop.y / HEIGHT) * 100}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={timing({ duration: 0.3, delay: stop.delay + 0.1 })}
          >
            {stop.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
