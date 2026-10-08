import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ButtonLink({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`button ${secondary ? "button-outline" : "button-primary"}`}
      to={to}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const missing = href.startsWith("YOUR_");
  if (missing)
    return (
      <span
        className={`unavailable-link ${className}`}
        aria-label={`${typeof children === "string" ? children : "Link"}: link not yet provided`}
        title={`Link not yet provided (${href})`}
      >
        {children}
        <span className="link-pending">Pending</span>
      </span>
    );
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}
