"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReceiptRule } from "@/components/receipt";
import { cn } from "@/lib/utils";

// Carousel testimoni bertumpuk (turunan "stagger-testimonials" dari 21st.dev), disesuaikan:
// - warna brand (kartu tengah brand-blue, teks sekunder white/90 supaya lolos kontras AA);
//   token shadcn yang tidak ada di project (card, hsl(var(--border))) diganti
// - ukuran kartu lewat variabel CSS --card (18rem HP, 22.5rem ≥sm), bukan state yang diubah
//   setelah render: tidak ada lompatan ukuran saat halaman dimuat di HP, markup server = browser
// - foto opsional (next/image); tanpa foto tampil inisial nama
// - kutipan sebagai <figure>/<blockquote>; semua kartu tetap terbaca pembaca layar,
//   tombol sebelumnya/berikutnya untuk keyboard; transisi mati untuk prefers-reduced-motion
// - teks tombol/label dari props (siap dua bahasa)

export type Testimonial = { quote: string; name: string; role: string; photo?: string };

type Labels = { carousel: string; previous: string; next: string };

const CARD_CUT = 50; // px, potongan sudut kanan atas kartu
const DIAGONAL = Math.SQRT2 * CARD_CUT;

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TestimonialCard({
  testimonial,
  position,
  onSelect,
}: {
  testimonial: Testimonial;
  position: number;
  onSelect: (steps: number) => void;
}) {
  const center = position === 0;
  const lift = center ? "-4rem" : position % 2 ? "1rem" : "-1rem";
  const tilt = center ? 0 : position % 2 ? 2.5 : -2.5;

  return (
    <figure
      onClick={() => onSelect(position)}
      className={cn(
        "absolute top-1/2 left-1/2 flex size-(--card) flex-col border-2 p-5 transition-[transform,background-color,border-color,box-shadow] duration-500 ease-in-out motion-reduce:transition-none sm:p-8",
        center
          ? "z-10 border-brand-blue bg-brand-blue text-white"
          : "z-0 cursor-pointer border-border bg-white text-foreground hover:border-brand-blue/50",
      )}
      style={{
        clipPath: `polygon(${CARD_CUT}px 0%, calc(100% - ${CARD_CUT}px) 0%, 100% ${CARD_CUT}px, 100% 100%, calc(100% - ${CARD_CUT}px) 100%, ${CARD_CUT}px 100%, 0 100%, 0 0)`,
        transform: `translate(-50%, -50%) translateX(calc(var(--card) / 1.5 * ${position})) translateY(${lift}) rotate(${tilt}deg)`,
        boxShadow: center ? "0px 8px 0px 4px var(--border)" : "0px 0px 0px 0px transparent",
      }}
    >
      {/* Garis tepi di potongan sudut. */}
      <span
        aria-hidden="true"
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{ right: -2, top: CARD_CUT - 2, width: DIAGONAL, height: 2 }}
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative mb-3 flex h-12 w-10 shrink-0 items-center justify-center overflow-hidden font-heading text-lg font-bold sm:mb-4 sm:h-14 sm:w-12",
          center ? "bg-white text-brand-blue" : "bg-brand-surface text-brand-blue",
        )}
        style={{ boxShadow: "3px 3px 0px var(--background)" }}
      >
        {testimonial.photo ? (
          <Image src={testimonial.photo} alt="" fill sizes="48px" className="object-cover object-top" />
        ) : (
          initials(testimonial.name)
        )}
      </span>
      <blockquote className="shrink-0 text-[0.9375rem] leading-snug font-medium sm:text-lg">
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-auto pt-3 text-sm leading-snug">
        <ReceiptRule className={cn("mb-3", center ? "text-white/50" : "text-brand-navy/30")} />
        <span className="block font-semibold">{testimonial.name}</span>
        <span className={center ? "text-white/90" : "text-muted-foreground"}>{testimonial.role}</span>
      </figcaption>
    </figure>
  );
}

export function StaggerTestimonials({ testimonials, labels }: { testimonials: Testimonial[]; labels: Labels }) {
  const id = useId();
  // key naik setiap kali kartu pindah ujung, supaya kartu itu muncul di ujung seberang
  // tanpa beranimasi melintasi seluruh layar.
  const [items, setItems] = useState(() => testimonials.map((testimonial, key) => ({ testimonial, key })));
  const [nextKey, setNextKey] = useState(testimonials.length);

  const move = (steps: number) => {
    if (steps === 0) return;
    const list = [...items];
    let key = nextKey;
    for (let i = 0; i < Math.abs(steps); i++) {
      if (steps > 0) list.push({ ...list.shift()!, key: key++ });
      else list.unshift({ ...list.pop()!, key: key++ });
    }
    setItems(list);
    setNextKey(key);
  };

  const buttonClass =
    "flex size-14 items-center justify-center border-2 border-border bg-background transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white";

  return (
    <div
      id={id}
      role="group"
      aria-roledescription="carousel"
      aria-label={labels.carousel}
      className="relative h-[32rem] w-full overflow-hidden [--card:18rem] sm:h-[37.5rem] sm:[--card:22.5rem]"
    >
      {items.map(({ testimonial, key }, index) => (
        <TestimonialCard
          key={key}
          testimonial={testimonial}
          position={index - Math.floor(items.length / 2)}
          onSelect={move}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button type="button" onClick={() => move(-1)} aria-controls={id} aria-label={labels.previous} className={buttonClass}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" onClick={() => move(1)} aria-controls={id} aria-label={labels.next} className={buttonClass}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
