import type { ReactNode } from "react";
import { waHref, type WaKey } from "@/content/site";
import { WhatsappIcon } from "@/components/brand-icons/whatsapp";

type Variant = "primary" | "secondary" | "secondary-dark" | "quiet";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Short label the custom cursor shows over this control. */
  cursor?: string;
  external?: boolean;
  icon?: ReactNode;
};

export function Button({ href, children, variant = "primary", className = "", cursor, external, icon }: Props) {
  return (
    <a
      href={href}
      className={`btn btn-${variant} ${className}`}
      data-cursor={cursor}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
      <span>{children}</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** The official WhatsApp glyph on a white chip, so it keeps its colours on any button fill. */
export function WaChip() {
  return (
    <span className="wa-chip" aria-hidden="true">
      <WhatsappIcon className="size-[18px]" />
    </span>
  );
}

export function WhatsAppButton({
  wa,
  children,
  variant = "primary",
  className = "",
  cursor = "WhatsApp",
}: {
  wa: WaKey;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  cursor?: string;
}) {
  return (
    <Button href={waHref(wa)} variant={variant} className={className} cursor={cursor} external icon={<WaChip />}>
      {children}
    </Button>
  );
}
