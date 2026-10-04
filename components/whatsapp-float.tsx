import { WhatsAppIcon } from "@/components/whatsapp-icon";

// Tombol WhatsApp melayang (keputusan pemilik project, di luar PRD awal):
// ajakan kontak yang selalu terjangkau tanpa harus scroll ke CTA band.
export function WhatsAppFloat({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-whatsapp-float
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
