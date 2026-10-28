import Link from "next/link";

/** "Sign up for our newsletter" button. Goes to the on-site /newsletter page. */
export default function NewsletterButton({
  variant = "ink",
  size = "md",
}: {
  variant?: "ink" | "orange" | "ghost";
  size?: "sm" | "md";
}) {
  const cls = `btn ${variant === "orange" ? "btn--orange" : variant === "ghost" ? "btn--ghost" : ""} ${
    size === "sm" ? "btn--sm" : ""
  }`;
  return (
    <Link className={cls} href="/newsletter">
      Sign up for our newsletter <span className="arrow" aria-hidden="true">→</span>
    </Link>
  );
}
