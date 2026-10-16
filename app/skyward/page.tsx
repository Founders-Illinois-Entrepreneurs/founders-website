import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { skyward } from "@/content/media";

export const metadata: Metadata = {
  title: "Skyward",
  description: "Skyward is our series highlighting standout founders, companies and ideas from the Founders community.",
};

export default function SkywardPage() {
  return (
    <>
      <PageHead tag="Skyward" title={<>Sky<span style={{ color: "var(--orange)" }}>ward</span></>}>
        Our series on standout founders, companies and ideas from the community. Pick an edition.
      </PageHead>
      <section className="wrap" style={{ paddingBottom: "clamp(56px, 9vw, 112px)" }}>
        <ul className="index-list">
          {skyward.map((s, i) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                <span className="index-list__n">Vol. {i + 1}</span>
                <span className="index-list__title">{s.title}</span>
                <span className="index-list__go">Read on Substack ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
