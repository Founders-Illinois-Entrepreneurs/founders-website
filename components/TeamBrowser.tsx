"use client";

import { useState } from "react";
import { team, teams, type TeamId } from "@/content/teams";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function TeamBrowser() {
  const [active, setActive] = useState<TeamId>("exec");
  const current = teams.find((t) => t.id === active)!;
  // Leads first (anyone whose role isn't plain "Member"), then everyone else in file order.
  const members = team
    .filter((m) => m.team === active)
    .sort((a, b) => Number(a.role === "Member") - Number(b.role === "Member"));

  return (
    <div>
      <div className="filters" role="group" aria-label="Choose a team">
        {teams.map((t) => (
          <button
            key={t.id}
            type="button"
            className="filter"
            aria-pressed={t.id === active}
            onClick={() => setActive(t.id)}
          >
            {t.name}
            <span className="filter__count">{team.filter((m) => m.team === t.id).length}</span>
          </button>
        ))}
      </div>

      <div className="team-intro">
        <div style={{ display: "grid", gap: 14 }}>
          <span className="tag">Team / {current.name}</span>
          <h2 className="display display--lg">{current.name}</h2>
          <p className="lede">{current.blurb}</p>
        </div>
        {current.groupPhoto ? (
          <img className="team-intro__photo" src={current.groupPhoto} alt={`The ${current.name} team`} loading="lazy" />
        ) : (
          <div className="team-intro__photo team-intro__photo--todo">
            <span className="todo">[TODO: add {current.name} group photo]</span>
          </div>
        )}
      </div>

      <ul className="people" aria-label={`${current.name} team members`} style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {members.map((m) => (
          <li key={m.name} className={`person ${m.role !== "Member" ? "person--lead" : ""}`}>
            <div className="person__photo">
              {m.photo ? (
                <img src={m.photo} alt="" loading="lazy" />
              ) : (
                <div className="person__initials">
                  {initials(m.name)}
                  <span className="todo">[TODO: add photo]</span>
                </div>
              )}
            </div>
            <div className="person__name">{m.name}</div>
            <div className="person__role">{m.role}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
