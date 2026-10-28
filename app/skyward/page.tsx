// Skyward was retired. The old /skyward link (and skyward.html) now sends people to the home page.
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Moved", robots: { index: false } };

export default function SkywardRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/" />
      <section className="wrap page-head">
        <span className="tag">Moved</span>
        <p className="lede">
          This page is gone. <Link className="text-link" href="/">Head to the home page →</Link>
        </p>
      </section>
    </>
  );
}
