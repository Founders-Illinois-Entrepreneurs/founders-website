// Startups built by Founders members. To add one, copy an entry and fill it in.
// Delete the placeholder entries once real ones are in.

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
    name: "[TODO: startup name]",
    oneLiner: "[TODO: one line on what it does]",
    founders: ["[TODO: founder names]"],
    todo: true,
  },
  {
    name: "[TODO: startup name]",
    oneLiner: "[TODO: one line on what it does]",
    founders: ["[TODO: founder names]"],
    todo: true,
  },
  {
    name: "[TODO: startup name]",
    oneLiner: "[TODO: one line on what it does]",
    founders: ["[TODO: founder names]"],
    todo: true,
  },
];
