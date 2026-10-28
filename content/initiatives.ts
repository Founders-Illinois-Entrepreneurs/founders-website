// What each internal team is working on, shown on the About > [team] pages.
// To add one: copy an entry in that team's `initiatives` list, change the text, and save.
// `status` is one of "Live", "In progress" or "Planned".
// R&D projects also take a `term` (e.g. "Fall 2026"): projects are grouped under it, so next
// semester's projects just get a new term and the old ones stay as history.

import type { TeamId } from "./teams";

export type Initiative = {
  title: string;
  summary: string;
  status: "Live" | "In progress" | "Planned";
  /** Semester this belongs to, e.g. "Fall 2026". Items with the same term are grouped together. */
  term?: string;
  /** Project Lead, shown first on the card. */
  lead?: string;
  members?: string[];
  /** Optional outside link, shown as "Visit <linkLabel or title>". */
  href?: string;
  linkLabel?: string;
  /** Placeholder entry that still needs real info (shown in yellow). */
  todo?: boolean;
  /** Only the summary still needs real info. */
  summaryTodo?: boolean;
};

export type TeamPage = {
  /** Short line under the team name: what this team is for. */
  focus: string;
  /** Optional longer description, one string per paragraph. */
  about?: string[];
  /** Optional list of the ways this team works (e.g. R&D's project tracks). */
  tracks?: { title: string; body: string }[];
  /** Heading above `tracks`. */
  tracksTitle?: string;
  /** Heading above the initiatives list (default "What we're working on"). */
  initiativesTitle?: string;
  initiatives: Initiative[];
};

export const teamPages: Record<Exclude<TeamId, "exec">, TeamPage> = {
  events: {
    focus: "We build UIUC's premier entrepreneurship events.",
    initiatives: [
      {
        title: "54",
        summary: "We host 54, our 54-hour startup hackathon where 100+ students form teams, work with Y Combinator founders, and pitch a startup.",
        status: "Live"
      },
      {
        title: "Socials and team building",
        summary: "Members-only socials, team-building events, and celebrations after our biggest wins, so the team stays close outside of the work.",
        status: "Live"
      }
    ]
  },
  exploration: {
    focus: "Helping students find, test and sharpen startup ideas.",
    initiatives: [
      {
        title: "Weekly Founders Mixer",
        summary: "A weekly coffee meetup at BrewLab where UIUC builders meet, swap ideas and hang out.",
        status: "Live"
      },
      {
        title: "Growing the entrepreneur network",
        summary: "Creating and hosting events that expand the entrepreneur network at UIUC.",
        status: "In progress"
      },
      {
        title: "Women in entrepreneurship",
        summary: "Spotlighting and supporting women founders on campus, so more women start and lead startups at UIUC.",
        status: "In progress"
      },
      {
        title: "Campus startup directory",
        summary: "Building a campus-wide database of entrepreneurship organizations and student startups, so we can point anyone interested in entrepreneurship to the right place.",
        status: "In progress"
      }
    ]
  },
  community: {
    focus: "Keeping Founders tight-knit, so members actually show up for each other.",
    initiatives: [
      {
        title: "Brand awareness and identity",
        summary: "Growing Founders' presence on campus through marketing materials, merch, and promotional campaigns.",
        status: "In progress"
      },
      {
        title: "Content creation",
        summary: "Social media posts, newsletters, and event promotions that keep students in the loop and showcase our community of founders.",
        status: "In progress"
      },
      {
        title: "Inclusivity and community building",
        summary: "Bringing students from every major and background together to make entrepreneurship more accessible. Founders is for everyone, and anyone can be an entrepreneur.",
        status: "In progress"
      }
    ]
  },
  rd: {
    focus: "The Research & Development team is the build arm of Founders, where ideas become working products. Our project teams partner with startups, build tools for student entrepreneurs at UIUC, and launch ventures of their own, shipping something real every semester.",
    about: [
      "R&D works year-round to build technological solutions to problems facing the Founders and entrepreneurship ecosystems at UIUC. Projects are built in teams of five or six, each led by an experienced Project Lead.",
      "Members own a real piece of the product from design through deployment, working closely with their Project Lead and directly with founders. Every team demos its work at the end of the semester. We are primarily a software team, but we welcome anyone who builds and wants to ship something real alongside us."
    ],
    tracksTitle: "Each semester, every project team takes on 1 of 3 tracks",
    initiativesTitle: "Current projects",
    tracks: [
      {
        title: "Startup partnership",
        body: "Partner with an established startup to build real products for the founder and their target users."
      },
      {
        title: "Community tools",
        body: "Design and build tools for student entrepreneurs and the broader UIUC startup community."
      },
      {
        title: "Venture building",
        body: "Identify a problem and build a startup around it from the ground up, idea to working product."
      }
    ],
    initiatives: [
      {
        title: "Rewind",
        term: "Fall 2026",
        summary: "A lecture video sifter: AI finds the exact timestamps where a concept was covered in class, so you can jump straight to it.",
        status: "In progress",
        lead: "Renee George",
        members: [
          "Akshay Pespunuri"
        ]
      },
      {
        title: "Archean Interns",
        term: "Fall 2026",
        summary: "Neural network replication, working with Archean Sciences, a startup building synthetic neurocomputers from living brain cells.",
        status: "In progress",
        lead: "Justin Horton",
        members: [
          "Shrishant Hattarki",
          "Lily Jia",
          "Avik Solanki",
          "Faisal Almugaiteeb"
        ]
      },
      {
        title: "Nod",
        term: "Fall 2026",
        summary: "Predicts whether a doctor's office's insurance claim will be approved and helps perfect it, cutting denials so patients get their medication on time.",
        status: "In progress",
        lead: "Aadhavan Sridharan",
        members: [
          "Kushal Trivedi",
          "Kaashish Venkataramanan",
          "Aritro Bhattacharjee",
          "Dev Dhooper"
        ]
      }
    ]
  }
};
