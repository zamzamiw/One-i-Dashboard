"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type Transition,
} from "motion/react";
import { ReceiptRule } from "@/components/receipt";
import { cn } from "@/lib/utils";

// Visual hero PRD 5.2: garis "rute" landai di Track, lalu melesat naik menuju Grow.
// Animasi (keputusan pemilik project): roket terbang menyusuri rute dan meninggalkan jejak garis.
// Roket melambat dan berhenti sejenak di Track dan Perform (titik + penjelasannya menyala),
// lalu melesat makin cepat ke Grow dan terbang lepas ke atas sambil memudar.
// - keadaan awal sama di server dan browser (roket di titik start, titik & jejak belum tampil)
// - prefers-reduced-motion: tanpa roket, grafik dan semua penjelasan langsung tampil
// - animasi hanya sekali saat halaman dibuka; denyut titik Grow sesudahnya memakai animasi CSS,
//   jadi tidak ada JavaScript yang terus berjalan per frame
const WIDTH = 600;
const HEIGHT = 340;
const BASELINE = 320;
const line = "M40 290 C90 285 110 275 150 270 C220 262 270 250 330 230 C420 200 480 140 550 60";
const area = `${line} L550 ${BASELINE} L40 ${BASELINE} Z`;

// Titik henti = ujung tiap ruas kurva. `at` = posisinya pada panjang garis (0–1), dari panjang
// ketiga ruas: 111,9 + 184,8 + 281,7.
const stops = [
  { x: 150, y: 270, at: 0.1935 },
  { x: 330, y: 230, at: 0.5129 },
  { x: 550, y: 60, at: 1 },
];
const START = { x: 40, y: 290, angle: -5.7 };
// Terbang lepas dari Grow searah ujung kurva (vektor 70, -80), sejauh 200 satuan grafik.
const EXIT_LENGTH = Math.hypot(70, 80);
const EXIT = { dx: (70 / EXIT_LENGTH) * 200, dy: (-80 / EXIT_LENGTH) * 200 };

const EASE_CRUISE = [0.45, 0, 0.55, 1] as const;
const EASE_BOOST = [0.5, 0, 0.95, 0.5] as const; // makin lama makin cepat
const EASE_EXIT = [0.1, 0.6, 0.4, 1] as const;

const toPercent = (value: number, size: number) => `${(value / size) * 100}%`;

type Stage = { name: string; text: string };

// Roket menghadap ke kanan (sumbu +x), titik tengahnya di (0,0).
function Rocket({ flying }: { flying: boolean }) {
  return (
    <svg viewBox="-28 -16 56 32" className="block h-auto w-full overflow-visible">
      {flying && (
        <path d="M-13 -4.5 C-19 -3.5 -24 -1.5 -28 0 C-24 1.5 -19 3.5 -13 4.5 Z" className="rocket-flame fill-brand-amber" />
      )}
      <path d="M-5 -7 L-13 -15 L-15 -6 Z M-5 7 L-13 15 L-15 6 Z" className="fill-brand-navy" />
      <path d="M22 0 C17 -7 9 -9 -4 -8.5 L-14 -7 L-14 7 L-4 8.5 C9 9 17 7 22 0 Z" className="fill-brand-blue" />
      <circle cx="6" cy="0" r="3.4" className="fill-white stroke-brand-navy" strokeWidth="1.4" />
    </svg>
  );
}

export function RouteChart({ title, stages }: { title: string; stages: Stage[] }) {
  const reduceMotion = useReducedMotion();
  const timing = (transition: Transition): Transition => (reduceMotion ? { duration: 0 } : transition);

  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0); // posisi roket di sepanjang rute (0–1)
  const flyOff = useMotionValue(0); // seberapa jauh roket sudah terbang lepas dari Grow (0–1)
  const left = useMotionValue(toPercent(START.x, WIDTH));
  const top = useMotionValue(toPercent(START.y, HEIGHT));
  const rotate = useMotionValue(START.angle);
  const rocketOpacity = useTransform(flyOff, [0, 0.5, 1], [1, 0.9, 0]);
  const rocketScale = useTransform(flyOff, [0, 1], [1, 0.6]);

  const [reached, setReached] = useState(0); // jumlah titik yang sudah dilewati
  const [phase, setPhase] = useState<"ready" | "flying" | "done">("ready");

  // Posisi dan arah roket dihitung dari geometri garis di SVG (arah = garis singgung).
  const place = () => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const length = progress.get() * total;
    const point = path.getPointAtLength(length);
    const ahead = path.getPointAtLength(Math.min(total, length + 1));
    const behind = path.getPointAtLength(Math.max(0, length - 1));
    const f = flyOff.get();
    left.set(toPercent(point.x + EXIT.dx * f, WIDTH));
    top.set(toPercent(point.y + EXIT.dy * f, HEIGHT));
    rotate.set((Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI);
  };
  useMotionValueEvent(progress, "change", place);
  useMotionValueEvent(flyOff, "change", place);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = true;
    const running: { stop: () => void }[] = [];
    const run = <T,>(controls: T & { stop: () => void }) => (running.push(controls), controls);

    (async () => {
      if (reduce) {
        await run(animate(progress, 1, { duration: 0 }));
        if (!active) return;
        setReached(stops.length);
        setPhase("done");
        return;
      }
      progress.set(0);
      flyOff.set(0);
      setPhase("flying");
      await run(animate(progress, stops[0].at, { duration: 1, delay: 0.5, ease: EASE_CRUISE }));
      if (!active) return;
      setReached(1);
      await run(animate(progress, stops[1].at, { duration: 1, delay: 0.4, ease: EASE_CRUISE }));
      if (!active) return;
      setReached(2);
      await run(animate(progress, 1, { duration: 0.9, delay: 0.4, ease: EASE_BOOST }));
      if (!active) return;
      setReached(3);
      await run(animate(flyOff, 1, { duration: 0.9, ease: EASE_EXIT }));
      if (!active) return;
      setPhase("done");
    })();

    return () => {
      active = false;
      running.forEach((controls) => controls.stop());
    };
  }, [progress, flyOff]);

  return (
    <div className="rounded-2xl border bg-brand-surface p-4 sm:p-6">
      {/* mt: ruang untuk label Grow yang melayang di atas titik tertinggi grafik. */}
      <div className="relative mt-5 sm:mt-6">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-labelledby="route-chart-title" className="block h-auto w-full">
          <title id="route-chart-title">{title}</title>
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
            animate={{ opacity: reached >= stops.length ? 1 : 0 }}
            transition={timing({ duration: 0.8 })}
          />
          {/* Rencana rute (titik-titik) yang akan dilalui roket; sekaligus dipakai untuk mengukur geometri. */}
          <path
            ref={pathRef}
            d={line}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="0.5 11"
            className="stroke-brand-blue/35"
          />
          {/* Jejak roket: garis yang tergambar mengikuti posisi roket. */}
          <motion.path
            d={line}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-brand-blue"
            style={{ pathLength: progress }}
          />

          {stops.map((stop, index) => {
            const final = index === stops.length - 1;
            const on = reached > index;
            return (
              <motion.g
                key={stages[index].name}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
                transition={timing({ type: "spring", stiffness: 420, damping: 18 })}
              >
                {/* Denyut titik Grow lewat animasi CSS (tanpa JavaScript per frame). */}
                {final && on && <circle cx={stop.x} cy={stop.y} r="11" className="route-pulse fill-brand-amber" />}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={final ? 11 : 9}
                  strokeWidth="5"
                  className={final ? "fill-brand-amber stroke-white" : "fill-white stroke-brand-blue"}
                />
              </motion.g>
            );
          })}
        </svg>

        {/* Label di HTML supaya ukuran teks tetap terbaca di layar kecil. */}
        {stops.map((stop, index) => (
          <motion.span
            key={stages[index].name}
            aria-hidden="true"
            className={cn(
              "absolute -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-full border bg-white px-2.5 py-1 font-heading text-xs font-semibold whitespace-nowrap shadow-sm sm:-translate-y-[calc(100%+22px)] sm:text-sm",
              index === stops.length - 1 && "border-brand-amber",
            )}
            style={{ left: toPercent(stop.x, WIDTH), top: toPercent(stop.y, HEIGHT) }}
            initial={{ opacity: 0, y: 6 }}
            animate={reached > index ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={timing({ duration: 0.35, ease: "easeOut" })}
          >
            {stages[index].name}
          </motion.span>
        ))}

        {phase !== "done" && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 w-10 -translate-x-1/2 -translate-y-1/2 sm:w-12 xl:w-14"
            style={{ left, top, rotate, opacity: rocketOpacity, scale: rocketScale }}
          >
            <Rocket flying={phase === "flying"} />
          </motion.div>
        )}
      </div>

      {/* Penjelasan tiap tahap, menyala berurutan saat roket tiba di titiknya. */}
      <ReceiptRule className="mt-4 text-brand-navy/30 sm:mt-5" />
      <ol className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-5">
        {stages.map((stage, index) => {
          const on = reached > index;
          return (
            <li
              key={stage.name}
              className={cn(
                "transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none",
                on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-40",
              )}
            >
              <p className="font-mono text-xs tracking-[0.15em] uppercase">
                <span aria-hidden="true" className={cn("transition-colors duration-500", on ? "text-brand-blue" : "text-muted-foreground")}>
                  [{String(index + 1).padStart(2, "0")}]{" "}
                </span>
                {stage.name}
              </p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">{stage.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
