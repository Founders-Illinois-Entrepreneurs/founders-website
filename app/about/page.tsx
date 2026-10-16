import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { teams } from "@/content/teams";

export const metadata: Metadata = {
  title: "About",
  description: "Founders is Illinois' student entrepreneurship organization.",
};

export default function AboutPage() {
  return (
    <>
      <PageHead tag="About" title={<>Students who <span style={{ color: "var(--orange)" }}>build</span></>} />
      <section className="wrap" style={{ display: "grid", gap: 32, paddingBottom: "clamp(56px, 9vw, 112px)" }}>
        <div className="prose" style={{ fontSize: "1.1rem" }}>
          <p>
            Founders is Illinois&apos; student entrepreneurship organization. We bring together ambitious students
            from every major, every year and every background to build, learn and grow together.
          </p>
          <p>
            Through events, workshops, networking and mentorship, we give student entrepreneurs the resources and
            community to turn ideas into real things. Whether you&apos;re just starting to explore or already
            building your next venture, Founders is here for every step.
          </p>
        </div>
        <div className="grid-3">
          {teams
            .filter((t) => t.id !== "exec")
            .map((t) => (
              <Link key={t.id} href="/team" className="card">
                {t.icon && <img src={t.icon} alt="" style={{ width: 64, height: 64, objectFit: "contain" }} loading="lazy" />}
                <h2 className="card__title">{t.name}</h2>
                <p className="card__body">{t.blurb}</p>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
