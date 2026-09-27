import { cn } from "@/lib/utils";

// Elemen dekoratif gaya struk belanja (keputusan pemilik project), dipakai di semua section:
// garis karakter "-----" / "_____" / "=====" / "+ + +", label dalam kurung [ ], tanda "+"
// di sudut kartu, dan barcode. Semuanya aria-hidden (murni hiasan). Karakter garis dibuat
// lewat CSS ::before (globals.css), jadi tidak ikut teks halaman saat disalin atau dibaca
// mesin pencari, dan selalu terpotong rapi selebar wadahnya.

const patterns = {
  dash: "receipt-rule-dash",
  under: "receipt-rule-under",
  equal: "receipt-rule-equal",
  plus: "receipt-rule-plus",
} as const;

export function ReceiptRule({ pattern = "dash", className }: { pattern?: keyof typeof patterns; className?: string }) {
  return <span aria-hidden="true" className={cn("receipt-rule font-mono text-xs", patterns[pattern], className)} />;
}

export type SectionTagData = { index: number; label: string };

// Baris pembuka section seperti baris item struk: "[ 01 ] TENTANG ---------------- +".
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
      <ReceiptRule className="min-w-6 flex-1 tracking-normal opacity-60" />
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

export function Barcode({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("receipt-barcode block", className)} />;
}
