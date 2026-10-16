// Site-wide info. Edit this file to change links, contact info, or the homepage stats.
// Anything wrapped in [TODO: ...] is a placeholder that still needs a real value.

export const site = {
  name: "Founders",
  fullName: "Founders - Illinois Entrepreneurs",
  domain: "foundersillinois.org",
  email: "team@founders.illinois.edu",

  // Membership application. Set this to the real form URL. While it is null the
  // Apply buttons show a [TODO] label instead of a link.
  applyUrl: null as string | null,

  newsletter: {
    name: "This Week at UIUC Founders",
    subscribeUrl: "https://illinoisfounders.substack.com/subscribe",
    archiveUrl: "https://illinoisfounders.substack.com/archive",
  },

  socials: [
    { label: "Instagram", href: "https://www.instagram.com/illinoisfounders" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/founders-illinois-entrepreneurs/" },
    { label: "Substack", href: "https://illinoisfounders.substack.com" },
  ],
} as const;

// Homepage numbers, carried over from the old site.
export const stats = [
  { value: 2000, suffix: "+", label: "event attendees" },
  { value: 300, suffix: "+", label: "startups pitched" },
  { value: 200, suffix: "+", label: "mentors" },
  { value: 100, suffix: "+", label: "past events" },
  { value: 40, suffix: "", label: "active members" },
];

export const nav = [
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/startups", label: "Startups" },
  { href: "/skyward", label: "Skyward" },
  { href: "/podcast", label: "Podcast" },
  { href: "/about", label: "About" },
];
