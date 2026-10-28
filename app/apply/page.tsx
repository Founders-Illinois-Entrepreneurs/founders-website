import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PageHead from "@/components/PageHead";
import ApplyButton from "@/components/ApplyButton";
import ReminderSignup from "@/components/ReminderSignup";
import NewsletterSignup from "@/components/NewsletterSignup";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Apply",
  description: "Founders membership is by application. How the process works, plus the This Week at UIUC Founders newsletter.",
};

const steps: { title: string; body: ReactNode; link: { href: string; label: string } | null }[] = [
  {
    title: "Meet us first",
    body: <>Our workshops, mixers, and hackathons are the best way to get to know Founders before you apply.</>,
    link: { href: "/events", label: "See events" },
  },
  {
    title: "Apply",
    body: "Apply to Founders as a whole, then select the subteams you're most interested in joining.",
    link: null,
  },
  {
    title: "Interview",
    body: "Expect a decision within a few days after the application deadline.",
    link: null,
  },
];

export default function ApplyPage() {
  return (
    <>
      <PageHead tag="Apply" title={<>Earn your <span style={{ color: "var(--orange)" }}>seat</span>.</>}>
        Founders is selective, and membership is by application. Here&apos;s how it works.
      </PageHead>

      <section className="wrap apply-top">
        <div className="apply-top__main">
          {site.applicationsOpen ? (
            <>
              <span className="chip chip--orange" style={{ justifySelf: "start" }}>
                Applications are open
              </span>
              <div className="btn-row">
                <ApplyButton label="Start your application" />
              </div>
            </>
          ) : (
            <>
              <span className="chip" style={{ justifySelf: "start" }}>
                Applications are closed right now
              </span>
              <ReminderSignup />
            </>
          )}
          <p className="tag" style={{ margin: 0 }}>
            Questions? Email us! {site.email}
          </p>
          <div className="btn-row">
            {site.socials.map((s) => (
              <a key={s.href} className="btn btn--ghost btn--sm" href={s.href} target="_blank" rel="noopener noreferrer">
                Follow on {s.label} ↗
              </a>
            ))}
          </div>
          <figure className="apply-photo">
            <img
              src="/images/photos/apply_54_events.jpg"
              alt="Thuc, Saurav and Jimmy from the Founders Events team in 54 shirts"
              width={1400}
              height={1050}
              loading="lazy"
            />
            <figcaption>Thuc, Saurav and Jimmy at 54</figcaption>
          </figure>
        </div>

        <aside className="apply-top__process" aria-label="The process">
          <span className="tag">The process</span>
          <ol className="steps steps--stack">
            {steps.map((s) => (
              <li key={s.title}>
                <div className="card card--lift" style={{ height: "100%" }}>
                  <h3 className="card__title">{s.title}</h3>
                  <p className="card__body">{s.body}</p>
                  {s.link && (
                    <div className="card__foot">
                      <Link
                        href={s.link.href}
                        className="text-link"
                        style={{ fontFamily: "var(--font-body)", textTransform: "none", letterSpacing: 0, color: "var(--ink)" }}
                      >
                        {s.link.label} →
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="section band-blue" id="newsletter">
        <div className="wrap signup">
          <div style={{ display: "grid", gap: 18 }}>
            <span className="tag">Newsletter</span>
            <h2 className="display display--lg">{site.newsletter.name}</h2>
            <p className="lede">What&apos;s happening in Founders, in your inbox.</p>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <NewsletterSignup />
            {site.newsletter.archiveUrl && (
              <a className="btn btn--ghost" href={site.newsletter.archiveUrl} target="_blank" rel="noopener noreferrer">
                Read past issues
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
