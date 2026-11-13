import { WhatsappIcon } from "@/components/brand-icons/whatsapp";

/** The official WhatsApp glyph on a white chip, so it keeps its colours on any button fill. */
export function WaChip() {
  return (
    <span className="wa-chip" aria-hidden="true">
      <WhatsappIcon className="size-[18px]" />
    </span>
  );
}
