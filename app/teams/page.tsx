// The old site lived at /teams.html. This keeps that link working by sending people to /team.
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Team",
  robots: { index: false },
  alternates: { canonical: "/team" },
};

export default function TeamsRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/team" />
      <section className="wrap page-head">
        <span className="tag">Moved</span>
        <p className="lede">
          The team page moved. <Link className="text-link" href="/team">Go to the team page →</Link>
        </p>
      </section>
    </>
  );
}
