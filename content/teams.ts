// Team names, blurbs and group photos. The member list itself lives in team.json.
//
// To add a member to team.json, copy an entry like:
//   { "name": "First Last", "team": "events", "role": "Member", "photo": "/members/first.jpg" }
// Put the photo in public/members/. Use "photo": null if there's no photo yet.
// "team" must be one of the ids below.

import members from "./team.json";

export type TeamId = "exec" | "events" | "exploration" | "community" | "rd";

export type Member = { name: string; team: TeamId; role: string; photo: string | null };

export const teams: { id: TeamId; name: string; blurb: string; groupPhoto: string | null; icon: string | null }[] = [
  {
    id: "exec",
    name: "Exec",
    blurb: "Runs the show: sets the direction, manages partnerships, and keeps the whole club moving.",
    groupPhoto: "/members/exec_group.jpg",
    icon: null,
  },
  {
    id: "events",
    name: "Events",
    blurb: "Plans the workshops, networking nights and big weekends where students meet, learn and build.",
    groupPhoto: "/members/events_group.jpg",
    icon: "/images/founders_ev_hq.png",
  },
  {
    id: "exploration",
    name: "Exploration",
    blurb: "Helps students find and test ideas through ideation sessions, mentorship and resources for early founders.",
    groupPhoto: "/members/exploration_group.jpg",
    icon: "/images/founders_ex_hq.png",
  },
  {
    id: "community",
    name: "Community",
    blurb: "Keeps Founders tight-knit with socials, member connections, and a culture that works hard and plays hard.",
    groupPhoto: null, // [TODO: add community group photo]
    icon: "/images/founders_co_hq.png",
  },
  {
    id: "rd",
    name: "R&D",
    blurb: "Tracks where entrepreneurship is heading, researches new opportunities, and builds resources for the club.",
    groupPhoto: "/members/rd_group.jpg",
    icon: "/images/founders_rd_hq.png",
  },
];

export const team = members as Member[];
