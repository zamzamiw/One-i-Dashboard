"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Latar grid titik interaktif, dari 21st.dev (interactive-canvas), ditulis ulang untuk project ini.
// Perilaku sama: titik bergeser sedikit ke arah kursor dan membesar di dekatnya. Perubahan:
// - canvas di belakang konten (-z-10) dan pointer-events-none, jadi tidak menghalangi klik
// - posisi mouse pakai clientX/clientY (canvas fixed), jadi tetap tepat setelah scroll
// - jarak antar titik tetap (px) sehingga kepadatan sama di semua layar, bukan 120×120 titik
// - semua titik digambar dalam satu path, dan hanya saat mouse bergerak (diam = tanpa beban CPU);
//   posisi kursor dihaluskan (lerp) sehingga gelembung titik mengikuti dengan lembut
// - animation frame dibatalkan saat unmount; ukuran & grid dihitung ulang saat resize
// - di perangkat sentuh dan untuk prefers-reduced-motion: grid statis tanpa interaksi

interface InteractiveCanvasProps {
  /** Jarak antar titik dalam px CSS. */
  spacing?: number;
  /** Warna titik saat diam. */
  dotColor?: string;
  /** Warna titik yang membesar di dekat kursor. */
  activeDotColor?: string;
  /** Pergeseran maksimum titik ke arah kursor, dalam px. */
  maxDistance?: number;
  /** Radius pengaruh kursor dalam px: makin dekat, titik makin besar (maks. diameter = nilai / 20). */
  dotSizeMultiplier?: number;
  className?: string;
}

export function InteractiveCanvas({
  spacing = 28,
  dotColor = "rgba(37, 82, 252, 0.22)",
  activeDotColor = "rgba(37, 82, 252, 0.4)",
  maxDistance = 2,
  dotSizeMultiplier = 200,
  className,
}: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const interactive =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dots: { x: number; y: number }[] = [];
    // `target` = posisi kursor sebenarnya, `mouse` = posisi yang digambar. Tiap frame `mouse`
    // mendekati `target` sebagian (lerp), jadi gelembung titik mengikuti kursor dengan halus;
    // frame berhenti dijadwalkan begitu keduanya praktis berimpit.
    const OFF = -9999;
    const target = { x: OFF, y: OFF };
    const mouse = { x: OFF, y: OFF };
    let frame = 0;

    const draw = () => {
      frame = 0;
      mouse.x += (target.x - mouse.x) * 0.22;
      mouse.y += (target.y - mouse.y) * 0.22;
      if (Math.abs(target.x - mouse.x) < 0.3 && Math.abs(target.y - mouse.y) < 0.3) {
        mouse.x = target.x;
        mouse.y = target.y;
      } else {
        schedule();
      }
      ctx.clearRect(0, 0, width, height);
      const active: { x: number; y: number; r: number }[] = [];

      ctx.beginPath();
      for (const dot of dots) {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const shift = distance > 0 ? Math.min(distance, maxDistance) / distance : 0;
        const x = dot.x + dx * shift;
        const y = dot.y + dy * shift;
        const size = (dotSizeMultiplier - distance) / 20;

        if (size > 1) active.push({ x, y, r: size / 2 });
        else ctx.rect(x - 0.75, y - 0.75, 1.5, 1.5);
      }
      ctx.fillStyle = dotColor;
      ctx.fill();

      if (active.length > 0) {
        ctx.beginPath();
        for (const { x, y, r } of active) {
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
        ctx.fillStyle = activeDotColor;
        ctx.fill();
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Grid di tengah layar: sisa ruang dibagi rata ke kiri-kanan dan atas-bawah.
      dots = [];
      const offsetX = (width % spacing) / 2;
      const offsetY = (height % spacing) / 2;
      for (let x = offsetX; x <= width; x += spacing) {
        for (let y = offsetY; y <= height; y += spacing) dots.push({ x, y });
      }
      schedule();
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      // Baru masuk jendela: langsung di posisi kursor, tidak meluncur dari luar layar.
      if (mouse.x === OFF) {
        mouse.x = target.x;
        mouse.y = target.y;
      }
      schedule();
    };

    // Kursor keluar dari jendela: kembalikan semua titik ke posisi diam.
    const leave = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      target.x = mouse.x = OFF;
      target.y = mouse.y = OFF;
      schedule();
    };

    resize();
    window.addEventListener("resize", resize);
    if (interactive) {
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerout", leave);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
    };
  }, [spacing, dotColor, activeDotColor, maxDistance, dotSizeMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 block size-full", className)}
    />
  );
}
