// Team names, blurbs and group photos. The member list itself lives in team.json.
//
// To add a member to team.json, copy an entry like:
//   { "name": "First Last", "team": "events", "role": "Member", "photo": "/members/first.jpg", "linkedin": "https://www.linkedin.com/in/..." }
// Put the photo in public/members/. Use "photo": null if there's no photo yet.
// "team" must be one of the ids below.

import members from "./team.json";

export type TeamId = "exec" | "events" | "exploration" | "community" | "rd";

export type Member = { name: string; team: TeamId; role: string; photo: string | null; linkedin?: string };

export const teams: {
  id: TeamId;
  name: string;
  blurb: string;
  groupPhoto: string | null;
  icon: string | null;
  /** Optional CSS object-position for the group photo, e.g. "50% 30%". */
  photoPosition?: string;
}[] = [
  {
    id: "exec",
    name: "Exec",
    blurb: "Runs the show: sets the direction, manages partnerships, and keeps the whole organization moving.",
    groupPhoto: "/members/exec_group_fall2026.jpg",
    icon: null,
  },
  {
    id: "events",
    name: "Events",
    blurb:
      "We build UIUC's premier entrepreneurship events. In the last two years, we've awarded $20,000+ in prizes, worked with dozens of YC founders, and connected students directly to the Landuyt and iVenture accelerators.",
    groupPhoto: "/members/events_group_fall2026.jpg",
    icon: "/images/founders_ev_hq.png",
  },
  {
    id: "exploration",
    name: "Exploration",
    blurb: "Helps students find and test ideas through ideation sessions, mentorship and resources for early founders.",
    groupPhoto: "/members/exploration_group_fall2026.jpg",
    icon: "/images/founders_ex_hq.png",
  },
  {
    id: "community",
    name: "Community",
    blurb: "Keeps Founders tight-knit with socials, member connections, and a culture that works hard and plays hard.",
    groupPhoto: "/members/community_group_fall2026.jpg",
    icon: "/images/founders_co_hq.png",
  },
  {
    id: "rd",
    name: "R&D",
    blurb: "The build arm of Founders, where ideas become working products.",
    groupPhoto: "/members/rd_group_fall2026.jpg",
    icon: "/images/founders_rd_hq.png",
  },
];

export const team = members as Member[];
