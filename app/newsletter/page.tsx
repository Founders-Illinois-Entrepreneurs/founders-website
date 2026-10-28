import type { Metadata } from "next";
import { site } from "@/content/site";
import PageHead from "@/components/PageHead";
import NewsletterSignup from "@/components/NewsletterSignup";
import FeatureStartup from "@/components/FeatureStartup";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "This Week at UIUC Founders: upcoming events, recaps and opportunities for student builders, every week.",
};

export default function NewsletterPage() {
  return (
    <>
      <PageHead tag="Newsletter" title={<>This Week at <span style={{ color: "var(--orange)" }}>UIUC Founders</span></>}>
        What&apos;s happening in Founders, in your inbox every week: upcoming events, recaps and opportunities for student
        builders.
      </PageHead>
      <section className="wrap newsletter-page">
        <NewsletterSignup label="Your email" />
        <div style={{ marginTop: 24 }}>
          <FeatureStartup />
        </div>
        {site.newsletter.archiveUrl && (
          <a className="btn btn--ghost" href={site.newsletter.archiveUrl} target="_blank" rel="noopener noreferrer">
            Read past issues
          </a>
        )}
      </section>
    </>
  );
}
