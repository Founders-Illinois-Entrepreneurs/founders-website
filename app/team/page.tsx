import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import TeamBrowser from "@/components/TeamBrowser";
import { team, teams } from "@/content/teams";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the students who run Founders: Exec, Events, Exploration, Community and R&D.",
};

export default function TeamPage() {
  return (
    <>
      <PageHead tag="Team" title={<>The people <span style={{ color: "var(--orange)" }}>behind it</span></>}>
        {team.length} students across {teams.length} teams keep Founders running. Pick a team to meet them.
      </PageHead>
      <section className="wrap" style={{ paddingBottom: "clamp(56px, 9vw, 112px)" }}>
        <TeamBrowser />
      </section>
    </>
  );
}
