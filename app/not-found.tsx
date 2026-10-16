import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap page-head" style={{ paddingBottom: 96 }}>
      <span className="tag">404</span>
      <h1 className="display display--xl">
        This prototype <span style={{ color: "var(--orange)" }}>broke.</span>
      </h1>
      <p className="lede">The page you wanted doesn&apos;t exist. Happens to the best experiments.</p>
      <div className="btn-row">
        <Link className="btn btn--orange" href="/">
          Back home
        </Link>
        <Link className="btn btn--ghost" href="/events">
          See events
        </Link>
      </div>
    </section>
  );
}
