import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { podcast } from "@/content/media";

export const metadata: Metadata = {
  title: "Podcast",
  description: "Founders Archives: conversations with builders and doers from the Founders community.",
};

export default function PodcastPage() {
  return (
    <>
      <PageHead tag="Podcast · Founders Archives" title={<>On the <span style={{ color: "var(--orange)" }}>record</span></>}>
        Conversations with builders from the Founders community: their paths, what they learned, and the stories
        behind the work.
      </PageHead>
      <section className="wrap" style={{ paddingBottom: "clamp(56px, 9vw, 112px)" }}>
        <ul className="index-list">
          {podcast.map((p, i) => (
            <li key={p.url}>
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="index-list__n">Ep. {String(i + 1).padStart(2, "0")}</span>
                <span className="index-list__title">{p.guest}</span>
                <span className="index-list__go">Watch on YouTube ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
