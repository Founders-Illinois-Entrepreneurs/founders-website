// Site-wide info. Edit this file to change links, contact info, or the homepage stats.
// Anything wrapped in [TODO: ...] is a placeholder that still needs a real value.

import members from "./team.json";

export const site = {
  name: "Founders",
  fullName: "Founders - Illinois Entrepreneurs",
  domain: "foundersillinois.org",
  email: "team@founders.illinois.edu",

  // Contact form on the home page. While null, "Send" opens the visitor's email app with the
  // message filled in, addressed to the email above. To have messages send straight from the
  // page instead, create a free form at formspree.io and paste its endpoint here,
  // e.g. "https://formspree.io/f/abcdwxyz".
  contactFormEndpoint: null as string | null,

  // Membership application. Set this to the real form URL. While it is null the
  // Apply buttons show a [TODO] label instead of a link.
  applyUrl: null as string | null,

  // Flip to true when applications open. While false, the Apply page shows the
  // "remind me when applications open" signup instead of the Apply button.
  applicationsOpen: false,

  // "Remind me when applications open" Google Form ("Spring 27 Founders Application Reminder").
  // The Apply page's "Remind me" button opens it in a new tab.
  // Responses land in the form's Google Sheet. Swap formId to use a different form.
  reminderForm: {
    formId: "1FAIpQLSdTGmcAyLfxnzn4rbinOs8mqjTpGGtdyGN-TwrNhodZ0gsKjQ" as string | null,
  },

  // Newsletter signup (Kit). The inline signup forms post to this Kit form in the background,
  // so visitors never leave the site. Kit dashboard: Landing pages & forms > "Website Newsletter Signup".
  // subscribeUrl is Kit's hosted signup page, used only as a fallback if the inline post fails.
  newsletter: {
    name: "This Week at UIUC Founders",
    kitFormId: "10064498" as string | null,
    // "Get your startup featured" sign-up form. Paste the form link here to turn on every
    // "Get featured" button. While null, the button shows a [TODO] placeholder.
    featureFormUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSeeNd2CA18_kOowOa6xEi2LRy69xKcksW7eQp9GhqQ8Qd-b_Q/viewform" as
        | string
        | null,
    subscribeUrl: "https://foundersillinois.kit.com/" as string | null,
    archiveUrl: null as string | null, // [TODO: link to past issues, if there's a public archive]
  },

  socials: [
    { label: "Instagram", href: "https://www.instagram.com/illinoisfounders/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/founders-illinois-entrepreneurs/posts/" },
  ],
} as const;

// Homepage numbers, carried over from the old site.
export const stats = [
  { value: 2000, suffix: "+", label: "event attendees" },
  { value: 300, suffix: "+", label: "startups pitched" },
  { value: 200, suffix: "+", label: "mentors" },
  { value: 100, suffix: "+", label: "past events" },
  // Counts everyone on the People page roster, so it stays in sync automatically.
  { value: members.length, suffix: "", label: "active members" },
];

export const nav = [
  { href: "/events", label: "Upcoming Events" },
  { href: "/team", label: "People" },
  { href: "/startups", label: "Projects" },
  { href: "/podcast", label: "Podcast" },
  { href: "/about", label: "About" },
];
