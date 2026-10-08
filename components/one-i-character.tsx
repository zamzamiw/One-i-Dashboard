// Tempat karakter "i" One-I di kolom kanan hero (≥lg). Karakternya (titik + batang yang langsung
// menjadi ekor, sama tebal) digambar oleh components/one-i-tail.tsx di satu lapisan dengan
// ekornya, supaya batang dan ekor menyambung mulus. Di bawah lg kotak ini disembunyikan dan "i"
// berdiri di gutter kanan hero. prefers-reduced-motion: "i" statis di kotak ini.
export function OneICharacter() {
  return (
    <div data-one-i-start aria-hidden="true" className="hidden h-56 motion-reduce:block lg:block lg:h-[min(26rem,48svh)]">
      <StaticI className="mx-auto hidden h-full w-auto fill-brand-blue motion-reduce:block" />
    </div>
  );
}

// Huruf "i" dari logo One-I (batang + titik), dipakai sebagai pengganti statis.
export function StaticI({ className }: { className?: string }) {
  return (
    <svg viewBox="413 66 94 493" className={className}>
      <rect x="415" y="176" width="90" height="383" rx="45" />
      <circle cx="460" cy="113" r="46.5" />
    </svg>
  );
}
