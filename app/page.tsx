import Link from "next/link";
import MajorsSphere from "@/components/MajorsSphere";
import StatCounter from "@/components/StatCounter";
import BlockToy from "@/components/BlockToy";
import ApplyButton from "@/components/ApplyButton";
import { stats } from "@/content/site";
import { events } from "@/content/events";
import { currentSponsors, pastSponsors, communityPhotos } from "@/content/media";

const doors = [
  { href: "/events", n: "Events", title: "Events", body: "54, Forge, speakers and workshops. Where to show up next.", primary: false },
  { href: "/join", n: "Join", title: "Apply", body: "How to get involved, plus the newsletter.", primary: true },
  { href: "/team", n: "Team", title: "The team", body: "The people running Founders this semester.", primary: false },
  { href: "/startups", n: "Startups", title: "Startups", body: "Companies built by Founders members.", primary: false },
  { href: "/skyward", n: "Skyward", title: "Skyward", body: "Our series on standout founders and ideas.", primary: false },
  { href: "/podcast", n: "Podcast", title: "Podcast", body: "Conversations with builders from our community.", primary: false },
];

export default function Home() {
  const flagships = events.filter((e) => e.flagship);

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <span className="tag">Founders · Illinois Entrepreneurs · UIUC</span>
            <h1 className="display display--xl hero__title">
              <span className="line">Every major.</span>
              <span className="line line--outline">Every idea.</span>
              <span className="line line--orange">Build it anyway.</span>
            </h1>
            <p className="lede">
              Founders is the student entrepreneurship club at Illinois. We help students at every step,
              from a half-formed idea to a pitch in front of real judges.
            </p>
            <div className="btn-row">
              <Link href="/join" className="btn btn--orange">
                Join Founders <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="/events" className="btn btn--ghost">
                See events
              </Link>
            </div>
          </div>
          <div className="hero__sphere">
            <MajorsSphere />
          </div>
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <section className="band-ink section--tight" aria-label="Founders by the numbers">
        <div className="wrap">
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat__value">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- what we are ---------- */}
      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 28 }}>
          <span className="tag">What Founders is</span>
          <p className="display display--lg" style={{ maxWidth: "18ch" }}>
            A club for people who&apos;d rather <span className="hl">try it</span> than talk about it.
          </p>
          <div className="grid-2">
            <p className="lede">
              Engineers, designers, finance people, psych majors and the undeclared. If you want to build
              something, you belong here, whether it&apos;s your first idea or your third startup.
            </p>
            <p className="lede">
              We run hackathons, a startup weekend in Chicago, workshops and mentorship, and we keep the
              community tight enough that people actually show up for each other.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- doors ---------- */}
      <section className="section band-paper" style={{ borderBlock: "2px solid var(--ink)" }}>
        <div className="wrap">
          <div className="section-head">
            <span className="tag">Pick a door</span>
            <h2 className="display display--md">Where do you want to go?</h2>
          </div>
          <div className="doors">
            {doors.map((d) => (
              <Link key={d.href} href={d.href} className={`card door ${d.primary ? "door--primary" : ""}`}>
                <span className="door__blob" aria-hidden="true" />
                <span className="door__num">/{d.n.toLowerCase()}</span>
                <div>
                  <h3 className="door__title">{d.title}</h3>
                  <p className="card__body" style={d.primary ? { color: "var(--ink)" } : undefined}>
                    {d.body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- flagship events ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__row">
              <div style={{ display: "grid", gap: 14 }}>
                <span className="tag">Flagship events</span>
                <h2 className="display display--md">The big ones</h2>
              </div>
              <Link href="/events" className="text-link">
                All events →
              </Link>
            </div>
          </div>
          <div>
            {flagships.map((e) => (
              <article className="flagship" key={e.slug}>
                <div className="flagship__media">
                  {e.photos?.map((p) => (
                    <img key={p} className="flagship__photo" src={p} alt="" loading="lazy" />
                  ))}
                  {e.logo && <img className="flagship__logo" src={e.logo} alt={`${e.name} logo`} loading="lazy" />}
                </div>
                <div className="flagship__copy">
                  <span className="chip chip--blue" style={{ justifySelf: "start" }}>
                    {e.kind === "hackathon" ? "Hackathon" : "Startup weekend"}
                  </span>
                  <h3 className="display display--lg">{e.name}</h3>
                  <p className="lede">{e.blurb}</p>
                  {e.href && (
                    <div>
                      <Link href={e.href} className="btn btn--ghost">
                        More on {e.name} <span className="arrow" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- toy ---------- */}
      <section className="section--tight">
        <div className="wrap" style={{ display: "grid", gap: 18 }}>
          <div className="section-head__row">
            <div style={{ display: "grid", gap: 10 }}>
              <span className="tag tag--blue">Playground</span>
              <h2 className="display display--sm">Every startup starts as a pile of blocks.</h2>
            </div>
          </div>
          <BlockToy />
        </div>
      </section>

      {/* ---------- community ---------- */}
      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 22 }}>
          <span className="tag">Community</span>
          <h2 className="display display--md" style={{ maxWidth: "16ch" }}>
            Work hard. Play hard. Show up for each other.
          </h2>
          <p className="lede">
            Founders is known for its tight-knit culture. Joining means becoming part of a family that works
            hard and plays hard.
          </p>
          <div className="strip" tabIndex={0} aria-label="Community photos, scroll sideways">
            {communityPhotos.map((p) => (
              <img key={p} src={p} alt="Founders members at a club event" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- sponsors ---------- */}
      <section className="section band-paper" style={{ borderTop: "2px solid var(--ink)" }}>
        <div className="wrap" style={{ display: "grid", gap: 40 }}>
          <div style={{ display: "grid", gap: 18 }}>
            <span className="tag">Current sponsors</span>
            <div className="sponsor-row">
              {currentSponsors.map((s) => (
                <img key={s.name} src={s.logo} alt={s.name} loading="lazy" />
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gap: 18 }}>
            <span className="tag tag--blue">Past sponsors and collaborators</span>
            <div className="marquee">
              <div className="marquee__track">
                {[0, 1].map((copy) =>
                  pastSponsors.map((s) => (
                    <div className="marquee__item" key={`${copy}-${s.name}`} aria-hidden={copy === 1 ? "true" : undefined}>
                      <img src={s.logo} alt={copy === 0 ? s.name : ""} loading="lazy" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section band-blue">
        <div className="wrap" style={{ display: "grid", gap: 24 }}>
          <span className="tag">Your move</span>
          <h2 className="display display--lg" style={{ maxWidth: "14ch" }}>
            Got an idea? Or just curious?
          </h2>
          <p className="lede">Both count. Apply to join, or get the newsletter and see what we&apos;re up to.</p>
          <div className="btn-row">
            <ApplyButton label="Apply to Founders" />
            <Link href="/join" className="btn btn--ghost">
              Get the newsletter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
