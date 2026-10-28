// Every event on the site. To add one, copy an entry, change the fields, and save.
//
//   kind:   "hackathon" | "conference" | "speaker" | "workshop" | "social" | "market"
//   start / end: dates as "YYYY-MM-DD". Leave them out if the date isn't set yet.
//   recurring: for repeating events, a short schedule like "Weekly · 5-6 PM" (shown instead of a date).
//   The Events page sorts by date and splits "Coming up" from "Past" on its own.

export type EventKind = "hackathon" | "conference" | "speaker" | "workshop" | "social" | "market";

export type FoundersEvent = {
  slug: string;
  name: string;
  kind: EventKind;
  start?: string;
  end?: string;
  /** Shown instead of exact dates when they aren't set yet, e.g. "March 2027". */
  dateLabel?: string;
  /** Time of day, e.g. "1:30-4:30 PM". */
  time?: string;
  location?: string;
  /** Repeating events: shown instead of a date, e.g. "Weekly · 5-6 PM". */
  recurring?: string;
  /** Repeating events, for the calendar button: day of week (0 = Sun ... 6 = Sat). */
  weekday?: number;
  /** Repeating events: last date of the series ("YYYY-MM-DD"). After it, the event moves to Past. */
  until?: string;
  blurb: string;
  logo?: string;
  /** Optional flyer image shown on the event card. */
  flyer?: string;
  photos?: string[];
  /** Internal page or outside link for "Learn more". */
  href?: string;
  /** Application / registration link. Leave out if there isn't one yet. */
  applyUrl?: string;
  /** Flagship events get the big treatment on the Events page. */
  flagship?: boolean;
  /** Marks a placeholder entry that still needs real info. */
  todo?: boolean;
  /** Mark an event as already happened when it has no exact dates filled in. */
  past?: boolean;
  /** Short note shown with a TODO style, for things that still need updating. */
  todoNote?: string;
};

export const events: FoundersEvent[] = [
  {
    slug: "54",
    name: "54",
    kind: "hackathon",
    flagship: true,
    past: true, // Fall 2026 edition already happened. Add start/end dates and you can remove this.
    blurb:
      "A 54-hour startup hackathon. Over 100 students form teams, work with Y Combinator founders, and pitch a startup.",
    logo: "/images/logos/events/54_logo.png",
    // The first 3 photos fan out in the stack; any extras show in a scrollable strip on the Events page.
    photos: [
      "/images/photos/54_fall2026_1.jpg",
      "/images/photos/54_fall2026_2.jpg",
      "/images/photos/54_fall2026_3.jpg",
      "/images/photos/54_fall2026_4.jpg",
      "/images/photos/54_fall2026_5.jpg",
    ],
    location: "Siebel Center for Design",
  },
  {
    slug: "forge-2027",
    name: "Forge 2027",
    kind: "conference",
    flagship: true,
    // Exact dates aren't set yet. Swap dateLabel for start/end ("YYYY-MM-DD") once they are.
    dateLabel: "March 2027",
    location: "Chicago",
    blurb:
      "The Midwest's largest student-run startup weekend. Two days in Chicago with VCs, founders and top student startups: pitch for prizes, get 1:1 mentoring, and sharpen your idea in workshops.",
    logo: "/images/logos/events/forge_logo.png",
    photos: ["/images/photos/forge_photo1.jpeg", "/images/photos/forge_photo2.jpg", "/images/photos/forge_photo3.jpg"],
    href: "/forge",
  },
  {
    slug: "founders-mixer",
    name: "Founders Mixer",
    kind: "social",
    recurring: "Tuesdays through Nov 17",
    // For the calendar button: weekday (0 = Sun ... 6 = Sat), time, and last date of the series.
    weekday: 2,
    time: "5-6 PM",
    until: "2026-11-17",
    location: "BrewLab",
    blurb:
      "Coffee and good company. A weekly meetup for UIUC builders: meet other founders, swap ideas, or just come hang out. Sign up through the link in our Instagram bio for 25% off your drink.",
  },
  {
    slug: "founders-marketplace-2026",
    name: "Founders Marketplace",
    kind: "market",
    start: "2026-11-07",
    time: "1:30-4:30 PM",
    location: "Illini Union, Room B",
    blurb: "For students, by students. Shop unique finds from local creators, student entrepreneurs, and small businesses.",
  },
];

export const kindLabels: Record<EventKind, string> = {
  hackathon: "Hackathon",
  conference: "Conference",
  speaker: "Speaker",
  workshop: "Workshop",
  social: "Mixer",
  market: "Marketplace",
};
