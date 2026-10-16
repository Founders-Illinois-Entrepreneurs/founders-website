// Every event on the site. To add one, copy an entry, change the fields, and save.
//
//   kind:   "hackathon" | "conference" | "speaker" | "workshop"
//   start / end: dates as "YYYY-MM-DD". Leave them out if the date isn't set yet.
//   The Events page sorts by date and splits "Coming up" from "Past" on its own.

export type EventKind = "hackathon" | "conference" | "speaker" | "workshop";

export type FoundersEvent = {
  slug: string;
  name: string;
  kind: EventKind;
  start?: string;
  end?: string;
  location?: string;
  blurb: string;
  logo?: string;
  photos?: string[];
  /** Internal page or outside link for "Learn more". */
  href?: string;
  /** Application / registration link. Leave out if there isn't one yet. */
  applyUrl?: string;
  /** Flagship events get the big treatment at the top of the Events page. */
  flagship?: boolean;
  /** Marks a placeholder entry that still needs real info. */
  todo?: boolean;
};

export const events: FoundersEvent[] = [
  {
    slug: "54",
    name: "54",
    kind: "hackathon",
    flagship: true,
    blurb:
      "A 3-day, beginner-friendly, no-code hackathon. Students from different backgrounds form teams, get mentorship and workshops, and pitch a startup to judges at the end.",
    logo: "/images/logos/events/54_logo.png",
    photos: ["/images/photos/54_photo1.jpg", "/images/photos/54_photo2.jpg", "/images/photos/54_photo3.jpg"],
    location: "[TODO: add 54 location]",
  },
  {
    slug: "forge-2026",
    name: "Forge 2026",
    kind: "conference",
    flagship: true,
    start: "2026-03-28",
    end: "2026-03-29",
    location: "Chicago",
    blurb:
      "The Midwest's largest student-run startup weekend. Two days in Chicago with VCs, founders and top student startups: pitch for prizes, get 1:1 mentoring, and sharpen your idea in workshops.",
    logo: "/images/logos/events/forge_logo.png",
    photos: ["/images/photos/forge_photo1.jpeg", "/images/photos/forge_photo2.jpg", "/images/photos/forge_photo3.jpg"],
    href: "/forge",
  },
  {
    slug: "speaker-todo",
    name: "[TODO: add a speaker event]",
    kind: "speaker",
    blurb: "[TODO: who's speaking, when, and why students should come]",
    todo: true,
  },
  {
    slug: "workshop-todo",
    name: "[TODO: add a workshop]",
    kind: "workshop",
    blurb: "[TODO: what people will build or learn]",
    todo: true,
  },
];

export const kindLabels: Record<EventKind, string> = {
  hackathon: "Hackathon",
  conference: "Conference",
  speaker: "Speaker",
  workshop: "Workshop",
};
