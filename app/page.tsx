import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import HeroHeadline from "@/components/HeroHeadline";
import StatCounter from "@/components/StatCounter";
import { site, stats } from "@/content/site";
import NewsletterSignup from "@/components/NewsletterSignup";
import RunwayGame from "@/components/RunwayGame";
import ContactForm from "@/components/ContactForm";
import { events } from "@/content/events";
import { currentSponsors, pastSponsors, communityPhotos } from "@/content/media";

const doors = [
  { href: "/events", n: "Events", title: "Events", body: "54, Forge, speakers and workshops. What's coming up.", primary: true },
  { href: "/forge", n: "Forge", title: "Forge", body: "The Midwest's largest student-run startup weekend.", primary: false },
  { href: "/team", n: "Team", title: "The team", body: "The people running Founders this semester.", primary: false },
  { href: "/startups", n: "Startups", title: "Startups", body: "Companies built by Founders members.", primary: false },
  { href: "/newsletter", n: "Newsletter", title: "Newsletter", body: "This Week at UIUC Founders, in your inbox.", primary: false },
  { href: "/podcast", n: "Podcast", title: "Podcast", body: "Conversations with builders from our community.", primary: false },
];

export default function Home() {
  const flagships = events.filter((e) => e.flagship);

  return (
    <>
      {/* Hero: event photos crossfade behind the headline. Photos live in heroSlides in content/media.ts. */}
      <section className="hero hero--photo">
        <HeroSlideshow variant="background" />
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <HeroHeadline />
            <p className="lede">
              Founders is the student entrepreneurship organization at Illinois. We help students at every step, from a
              half-formed idea to a pitch in front of real judges.
            </p>
            <div className="btn-row">
              <Link href="/events" className="btn btn--orange">
                See events <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="/team" className="btn btn--ghost">
                Meet the team
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      <section className="section--tight" style={{ background: "var(--orange-soft)", borderBottom: "2px solid var(--ink)" }}>
        <div className="wrap newsletter-strip">
          <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <span className="tag">Newsletter</span>
            <h2 className="display display--sm">{site.newsletter.name}</h2>
            <p className="card__body">What&apos;s happening in Founders, in your inbox.</p>
          </div>
          <NewsletterSignup />
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 28 }}>
          <span className="tag">What Founders is</span>
          <p className="display display--lg" style={{ maxWidth: "18ch" }}>
            An org for people who&apos;d rather <span className="hl">try it</span> than talk about it.
          </p>
          <div className="grid-2">
            <p className="lede">
              Founders is a selective community of student builders. Members come from every corner of campus:
              engineering, finance, design and psych.
            </p>
            <p className="lede">
              We run hackathons, a startup weekend in Chicago, workshops and mentorship, and we keep the community tight
              enough that people actually show up for each other.
            </p>
          </div>
        </div>
      </section>

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
                  {e.photos?.slice(0, 3).map((p) => (
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

      <section className="section band-paper" style={{ borderBlock: "2px solid var(--ink)" }}>
        <div className="wrap runway-row">
          <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
            <span className="tag tag--blue">Play</span>
            <h2 className="display display--lg">Runway</h2>
            <p className="lede">
              Twelve months, a pile of hard calls, and three things that can kill your startup. How long can you last?
            </p>
          </div>
          <RunwayGame />
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 22 }}>
          <span className="tag">Community</span>
          <h2 className="display display--md" style={{ maxWidth: "16ch" }}>
            Play hard. Work harder. Show up for each other.
          </h2>
          <p className="lede">
            Founders is known for its tight-knit culture. Members become part of a family that works hard and plays hard.
          </p>
          <div className="strip" tabIndex={0} aria-label="Community photos, scroll sideways">
            {communityPhotos.map((p) => (
              <img key={p} src={p} alt="Founders members at an organization event" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

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

      <section className="section band-blue">
        <div className="wrap contact-grid">
          <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
            <span className="tag">Contact us</span>
            <h2 className="display display--lg" style={{ maxWidth: "14ch" }}>
              Get in touch.
            </h2>
            <p className="lede">
              Questions about Founders, our events, or working with us? Send us a message and we&apos;ll get back to you.
            </p>
            <div className="btn-row">
              {site.socials.map((x) => (
                <a key={x.label} className="btn btn--ghost" href={x.href} target="_blank" rel="noopener noreferrer">
                  {x.label} ↗
                </a>
              ))}
            </div>
            <p style={{ margin: 0, fontFamily: "var(--font-mono)" }}>{site.email}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
