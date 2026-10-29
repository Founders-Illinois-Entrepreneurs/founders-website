// Startups built by Founders members. To add one, copy an entry and fill it in.

export type Startup = {
  name: string;
  oneLiner: string;
  founders: string[];
  url?: string;
  logo?: string;
  /** Optional short tag, e.g. "Fintech", "Climate", "AI". */
  tag?: string;
  todo?: boolean;
};

export const startups: Startup[] = [
  {
    name: "Rewind",
    tag: "R&D · Fall 2026",
    oneLiner: "A lecture video sifter: AI finds the exact timestamps where a concept was covered in class.",
    founders: ["Renee George", "Akshay Pespunuri"],
  },
  {
    name: "Archean Interns",
    tag: "R&D · Fall 2026",
    oneLiner: "Neural network replication.",
    founders: ["Justin Horton", "Shrishant Hattarki", "Lily Jia", "Avik Solanki", "Faisal Almugaiteeb"],
  },
  {
    name: "Nod",
    tag: "R&D · Fall 2026",
    oneLiner:
      "Predicts whether a doctor's office's insurance claim will be approved and helps perfect it, cutting denials so patients get their medication on time.",
    founders: ["Aadhavan Sridharan", "Kushal Trivedi", "Kaashish Venkataramanan", "Aritro Bhattacharjee", "Dev Dhooper"],
  },
];
