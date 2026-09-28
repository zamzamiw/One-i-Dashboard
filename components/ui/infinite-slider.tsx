"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Slider berjalan tanpa henti (turunan ibelick/infinite-slider dari 21st.dev, ditulis ulang):
// - tanpa framer-motion / react-use-measure: satu loop requestAnimationFrame + ResizeObserver
// - kecepatan dalam px/detik; saat kursor di atas slider kecepatan turun halus ke `speedOnHover`
// - loop hanya berjalan saat slider terlihat di layar dan tab aktif (hemat CPU/baterai)
// - isi ditampilkan dua kali; salinan kedua aria-hidden. Anak-anaknya harus berupa <li>.
// - prefers-reduced-motion: diam, salinan kedua disembunyikan dan isi dibungkus rata tengah
// - markup sama di server dan browser; transform baru dipasang setelah hidrasi
export function InfiniteSlider({
  children,
  gap = 48,
  speed = 40,
  speedOnHover,
  reverse = false,
  label,
  className,
}: {
  children: ReactNode;
  /** Jarak antar-item dalam px. */
  gap?: number;
  /** Kecepatan dalam px per detik. */
  speed?: number;
  speedOnHover?: number;
  reverse?: boolean;
  /** Nama daftar untuk pembaca layar. */
  label?: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let period = 0; // lebar satu set isi + jarak ke salinannya
    let offset = 0;
    let velocity = speed;
    let target = speed;
    let frame = 0;
    let last = 0;
    let onScreen = false;

    const measure = () => {
      period = (track.scrollWidth + gap) / 2;
    };
    const tick = (time: number) => {
      frame = requestAnimationFrame(tick);
      const dt = last ? Math.min((time - last) / 1000, 0.1) : 0;
      last = time;
      velocity += (target - velocity) * Math.min(1, dt * 5);
      if (!period) return;
      offset = (offset + velocity * dt) % period;
      track.style.transform = `translate3d(${reverse ? offset - period : -offset}px, 0, 0)`;
    };
    const start = () => {
      if (frame || !onScreen || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = new ResizeObserver(measure);
    resize.observe(track);
    const view = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    view.observe(root);
    const onVisibility = () => (document.hidden ? stop() : start());
    const slow = () => (target = speedOnHover ?? speed);
    const normal = () => (target = speed);
    document.addEventListener("visibilitychange", onVisibility);
    root.addEventListener("pointerenter", slow);
    root.addEventListener("pointerleave", normal);
    measure();

    return () => {
      stop();
      resize.disconnect();
      view.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      root.removeEventListener("pointerenter", slow);
      root.removeEventListener("pointerleave", normal);
    };
  }, [gap, speed, speedOnHover, reverse]);

  const set = "flex shrink-0 items-center gap-y-6 motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center";
  return (
    <div ref={rootRef} className={cn("overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max will-change-transform motion-reduce:w-full motion-reduce:px-page" style={{ columnGap: gap }}>
        <ul role="list" aria-label={label} className={set} style={{ columnGap: gap }}>
          {children}
        </ul>
        <ul role="list" aria-hidden="true" className={cn(set, "motion-reduce:hidden")} style={{ columnGap: gap }}>
          {children}
        </ul>
      </div>
    </div>
  );
}
