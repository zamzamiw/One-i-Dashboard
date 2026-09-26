import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { whatsappLink } from "@/lib/site";

// Tombol WhatsApp melayang (keputusan pemilik project, di luar PRD awal):
// ajakan kontak yang selalu terjangkau tanpa harus scroll ke CTA band.
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat One-I via WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
