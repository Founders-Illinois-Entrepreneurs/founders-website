import { site } from "@/content/site";

type Props = { size?: "sm" | "md"; label?: string; variant?: "orange" | "ink" | "ghost"; url?: string | null };

/** The one Apply button used everywhere. Shows a [TODO] state until site.applyUrl is set. */
export default function ApplyButton({ size = "md", label = "Apply", variant = "orange", url }: Props) {
  const href = url === undefined ? site.applyUrl : url;
  const cls = `btn ${variant === "orange" ? "btn--orange" : variant === "ghost" ? "btn--ghost" : ""} ${
    size === "sm" ? "btn--sm" : ""
  }`;

  if (!href) {
    return (
      <span className={cls} aria-disabled="true" title="Application link coming soon">
        {label} <span className="todo">[TODO: link]</span>
      </span>
    );
  }
  return (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
      {label} <span className="arrow" aria-hidden="true">→</span>
    </a>
  );
}
