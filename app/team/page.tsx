import type { Metadata } from "next";
import TeamBrowser from "@/components/TeamBrowser";
import MajorsSphere from "@/components/MajorsSphere";
import { team, teams } from "@/content/teams";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Founders is a diverse group of people from different backgrounds, all focused on building for a better future. Meet the team.",
};

const ALUMNI_ALT =
  "Company logos including Meta, Microsoft, Apple, Google, Bank of America, Mastercard, Uber, NASA, 3M, AbbVie, NVIDIA, Activision Blizzard, Qualcomm, Chase, United States Courts, State Farm, Boeing, Xfinity, Jellyfish, MITRE, Riverbed, Amobee, Booz Allen, GoDaddy, Impact Venture Capital, IEX, Southwest, Molex, VMware, Atmos Energy, Helios Threads, Capital One, FalconX, DeepScale and more";

export default function TeamPage() {
  return (
    <>
      {/* Mission first, so it's the first thing people see on the Team page. */}
      <section className="wrap team-globe team-globe--head">
        <div style={{ display: "grid", gap: 16, alignContent: "center", minWidth: 0 }}>
          <span className="tag">Team · Our mission</span>
          <h1 className="display display--lg">
            Different backgrounds. <span style={{ color: "var(--orange)" }}>One mission.</span>
          </h1>
          <p className="lede">
            Founders is a diverse group of people from different backgrounds, all focused on building for a better
            future.
          </p>
        </div>
        <figure className="team-photo">
          <img
            src="/members/founders_team.jpg"
            alt="The Founders team posing on a staircase in business attire"
            width={1600}
            height={2000}
          />
          <figcaption>The Founders team</figcaption>
        </figure>
      </section>

      <section className="wrap">
        <div className="section-head">
          <span className="tag tag--blue">The people behind it</span>
          <p className="lede" style={{ margin: 0 }}>
            {team.length} students across {teams.length} subteams keep Founders running. Pick a subteam to meet them.
          </p>
        </div>
        <TeamBrowser />
      </section>

      {/* Logos come from the Info Night "Where we work" slide: public/images/photos/alumni_logos.jpg */}
      <section className="wrap" style={{ paddingTop: "clamp(56px, 9vw, 112px)", display: "grid", gap: 16 }}>
        <span className="tag tag--blue">Members &amp; alumni</span>
        <h2 className="display display--md">Where our members and alumni have worked.</h2>
        <figure className="card" style={{ margin: 0, background: "#faf8f2", padding: "clamp(12px, 3vw, 32px)" }}>
          <img
            src="/images/photos/alumni_logos.jpg"
            width={1585}
            height={800}
            loading="lazy"
            style={{ width: "100%", height: "auto", display: "block" }}
            alt={ALUMNI_ALT}
          />
        </figure>
      </section>

      <section className="wrap team-globe" style={{ paddingBlock: "clamp(56px, 9vw, 112px)" }}>
        <div style={{ display: "grid", gap: 16, alignContent: "center", minWidth: 0 }}>
          <span className="tag">Every major</span>
          <h2 className="display display--md">Where we come from.</h2>
          <p className="lede">Spin the globe to see the majors in the organization.</p>
        </div>
        <MajorsSphere />
      </section>
    </>
  );
}
