import type { ReactNode } from "react";
import { waHref, type WaKey } from "@/content/site";
import { WaChip } from "./WaChip";

type Variant = "primary" | "secondary" | "secondary-dark" | "quiet";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  icon?: ReactNode;
};

export function Button({ href, children, variant = "primary", className = "", external, icon }: Props) {
  return (
    <a
      href={href}
      className={`btn btn-${variant} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
      <span>{children}</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function WhatsAppButton({
  wa,
  children,
  variant = "primary",
  className = "",
}: {
  wa: WaKey;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Button href={waHref(wa)} variant={variant} className={className} external icon={<WaChip />}>
      {children}
    </Button>
  );
}
