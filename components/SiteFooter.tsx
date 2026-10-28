import Link from "next/link";
import { nav, site } from "@/content/site";
import NewsletterSignup from "./NewsletterSignup";
import { SecretTapTarget } from "./EasterEgg";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__grid">
          <div>
            <p className="site-footer__big">
              <SecretTapTarget>
                Go build<span>.</span>
              </SecretTapTarget>
            </p>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", maxWidth: "40ch" }}>
              Founders is the student entrepreneurship organization at the University of Illinois Urbana-Champaign.
            </p>
            <div style={{ marginTop: 20 }}>
              <NewsletterSignup tone="dark" label={site.newsletter.name} />
            </div>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/forge">Forge</Link>
              </li>
              <li>
                <Link href="/apply">Apply</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Say hi</h2>
            <ul>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a className="site-footer__email" href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} {site.fullName}</span>
          <span>Built by students in Urbana-Champaign, IL</span>
        </div>
      </div>
    </footer>
  );
}
