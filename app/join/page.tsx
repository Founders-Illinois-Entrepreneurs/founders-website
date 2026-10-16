import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import ApplyButton from "@/components/ApplyButton";
import { site } from "@/content/site";
import { skyward } from "@/content/media";

export const metadata: Metadata = {
  title: "Join",
  description: "How to join Founders, apply, and get the This Week at UIUC Founders newsletter.",
};

const steps = [
  {
    title: "Come to an event",
    body: "Workshops, talks and hackathons are the easiest way to meet the club and see if it fits.",
    link: { href: "/events", label: "See events" },
  },
  {
    title: "Apply to join a team",
    body: "Fill out the membership application. Founders is open to every major and every year.",
    link: { href: "/team", label: "Meet the teams" },
  },
  {
    title: "Build something",
    body: "Bring an idea or find one here. Pitch it at 54 or Forge when you're ready.",
    link: { href: "/startups", label: "See what members built" },
  },
];

export default function JoinPage() {
  return (
    <>
      <PageHead tag="Join" title={<>Get <span style={{ color: "var(--orange)" }}>in</span>.</>}>
        No experience required. Just curiosity and a willingness to try things.
      </PageHead>

      <section className="wrap" style={{ display: "grid", gap: 20 }}>
        <div className="btn-row">
          <ApplyButton label="Apply to Founders" />
          <a className="btn btn--ghost" href={`mailto:${site.email}`}>
            Email us
          </a>
        </div>
        <p className="tag" style={{ margin: 0 }}>
          Questions? {site.email}
        </p>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="tag">How it works</span>
            <h2 className="display display--md">Three ways in</h2>
          </div>
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.title}>
                <div className="card card--lift" style={{ height: "100%" }}>
                  <h3 className="card__title">{s.title}</h3>
                  <p className="card__body">{s.body}</p>
                  <div className="card__foot">
                    <Link href={s.link.href} className="text-link" style={{ fontFamily: "var(--font-body)", textTransform: "none", letterSpacing: 0, color: "var(--ink)" }}>
                      {s.link.label} →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band-blue" id="newsletter">
        <div className="wrap signup">
          <div style={{ display: "grid", gap: 18 }}>
            <span className="tag">Newsletter</span>
            <h2 className="display display--lg">{site.newsletter.name}</h2>
            <p className="lede">
              What&apos;s happening in Founders, in your inbox. It&apos;s free on Substack.
            </p>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <a className="btn btn--orange" href={site.newsletter.subscribeUrl} target="_blank" rel="noopener noreferrer">
              Subscribe on Substack <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn btn--ghost" href={site.newsletter.archiveUrl} target="_blank" rel="noopener noreferrer">
              Read past issues
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__row">
              <div style={{ display: "grid", gap: 14 }}>
                <span className="tag">Archive</span>
                <h2 className="display display--md">From the archive</h2>
              </div>
              <a className="text-link" href={site.newsletter.archiveUrl} target="_blank" rel="noopener noreferrer">
                Full archive ↗
              </a>
            </div>
          </div>
          <ul className="index-list">
            {skyward.map((s, i) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  <span className="index-list__n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="index-list__title">{s.title}</span>
                  <span className="index-list__go">Read ↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 16 }}>
            <span className="todo">[TODO: add links to past &quot;This Week at UIUC Founders&quot; issues]</span>
          </p>
        </div>
      </section>
    </>
  );
}
