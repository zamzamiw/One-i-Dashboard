"use client";

import { Children, createContext, useContext, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

// Story scroll (turunan "story-scroll"/FlowArt dari 21st.dev, ditulis ulang tanpa GSAP):
// panel bertumpuk; panel berikutnya naik sambil berputar dari 30° ke 0° (poros kiri bawah)
// dan menutupi panel sebelumnya yang tertahan di tempat. Perubahan dari versi aslinya:
// - pin memakai CSS sticky, rotasi memakai useScroll + useTransform dari motion (sudah
//   terpasang), jadi tidak ada library tambahan
// - panel tertahan tepat di bawah navbar sticky (top = --nav-h), tinggi = layar - navbar
// - panel yang lebih tinggi dari layar baru tertahan setelah bagian bawahnya terlihat
//   (setara start "bottom bottom" di versi GSAP), jadi isinya tidak terpotong
// - pembungkus berupa div (halaman sudah punya <main>) dan panel bukan landmark
// - prefers-reduced-motion: rotasi dimatikan lewat CSS (markup server = browser, aman dari
//   hydration mismatch); panel tetap bertumpuk tanpa gerakan berputar

const FlowIndex = createContext(0);

export function FlowArt({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {Children.map(children, (child, index) => (
        <FlowIndex.Provider value={index}>{child}</FlowIndex.Provider>
      ))}
    </div>
  );
}

export function FlowSection({
  children,
  className,
  style,
}: {
  children: ReactNode;
  /** Kelas untuk panel berwarna (latar, warna teks, layout isi). */
  className?: string;
  style?: CSSProperties;
}) {
  const index = useContext(FlowIndex);
  const ref = useRef<HTMLDivElement>(null);
  // Rotasi berjalan dari tepi atas panel menyentuh bawah layar sampai di 25% tinggi layar.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [index === 0 ? 0 : 30, 0]);

  // Panel lebih tinggi dari ruang di bawah navbar: geser posisi tertahannya ke atas
  // sebesar kelebihannya, supaya bagian bawah panel sempat terbaca sebelum tertutup.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      el.style.top = "";
      const top = parseFloat(getComputedStyle(el).top) || 0;
      const excess = el.offsetHeight - (window.innerHeight - top);
      if (excess > 0) el.style.top = `${top - excess}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="sticky top-(--nav-h) overflow-hidden" style={{ zIndex: index + 1 }}>
      <motion.div
        className={cn(
          "flex min-h-[calc(100svh-var(--nav-h))] origin-bottom-left flex-col justify-between gap-8 px-page py-10 sm:py-14 lg:py-16",
          index > 0 && "will-change-transform motion-reduce:transform-none!",
          className,
        )}
        style={{ rotate, ...style }}
      >
        {children}
      </motion.div>
    </div>
  );
}
