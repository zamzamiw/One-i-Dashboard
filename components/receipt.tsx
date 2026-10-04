import { cn } from "@/lib/utils";

// Elemen dekoratif gaya struk belanja (keputusan pemilik project): label dalam kurung [ ],
// dan tanda "+" di sudut kartu. Garis pemisah dulu berupa karakter "-----"; atas
// permintaan pemilik sekarang garis tipis biasa. Semuanya aria-hidden (murni hiasan).

// Garis pemisah tipis; warnanya mengikuti warna teks (currentColor), atur lewat kelas text-*.
export function Rule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block border-t border-current", className)} />;
}

export type SectionTagData = { index: number; label: string };

// Baris pembuka section seperti baris item struk: "[ 01 ] TENTANG ——— +".
export function SectionTag({
  index,
  label,
  inverse = false,
  className,
}: SectionTagData & { inverse?: boolean; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center gap-3 font-mono text-xs tracking-[0.15em] uppercase select-none",
        inverse ? "text-white/90" : "text-muted-foreground",
        className,
      )}
    >
      <span className="whitespace-nowrap">[ {String(index).padStart(2, "0")} ]</span>
      <span className="whitespace-nowrap">{label}</span>
      <Rule className="min-w-6 flex-1 opacity-30" />
      <span className={inverse ? "text-white" : "text-brand-blue"}>+</span>
    </div>
  );
}

// Tanda "+" di keempat sudut wadah (induk wajib `relative`), seperti tanda potong/registrasi.
const corners = ["-top-3 -left-3", "-top-3 -right-3", "-bottom-3 -left-3", "-bottom-3 -right-3"];

export function CornerMarks({ className }: { className?: string }) {
  return corners.map((position) => (
    <span
      key={position}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute flex size-6 items-center justify-center font-mono text-xl leading-none select-none",
        position,
        className,
      )}
    >
      +
    </span>
  ));
}
