// Cards for the Runway game on the homepage. Each card is one month of your startup.
// Swipe left or right to pick an option. Each option nudges cash, users and morale up or down
// (keep effects between -25 and +25). Every month also burns 5 cash. If any stat hits 0, the
// startup dies. Survive 12 months to win.
// Add, remove or edit cards freely; the game picks 12 at random each run.

export type Stat = "cash" | "users" | "morale";
export type Effects = Partial<Record<Stat, number>>;
export type RunwayCard = { prompt: string; left: { label: string; fx: Effects }; right: { label: string; fx: Effects } };

export const runwayCards: RunwayCard[] = [
  { prompt: "Your cofounder wants to pivot to AI.", left: { label: "Stay the course", fx: { morale: -15 } }, right: { label: "Pivot", fx: { users: -20, morale: 10, cash: -5 } } },
  { prompt: "A VC offers money at a terrible valuation.", left: { label: "Pass", fx: { cash: -5, morale: 5 } }, right: { label: "Take the check", fx: { cash: 25, morale: -15 } } },
  { prompt: "Your server crashes on launch day.", left: { label: "All-nighter to fix it", fx: { morale: -15, users: 5 } }, right: { label: "Post a funny apology", fx: { users: -10, morale: 5 } } },
  { prompt: "A big company wants to “partner.” You suspect they'll copy you.", left: { label: "Decline", fx: { users: -5, morale: 5 } }, right: { label: "Sign it", fx: { cash: 20, morale: -10 } } },
  { prompt: "Your intern's video about the product goes viral.", left: { label: "Stay heads-down", fx: { users: 5 } }, right: { label: "Lean all the way in", fx: { users: 20, cash: -10 } } },
  { prompt: "Rent is due. The team wants a pizza party.", left: { label: "Pay rent", fx: { cash: -15 } }, right: { label: "Pizza party", fx: { morale: 15, cash: -10 } } },
  { prompt: "One customer wants a feature nobody else needs.", left: { label: "Say no", fx: { users: -5, morale: 5 } }, right: { label: "Build it for them", fx: { cash: 15, morale: -10 } } },
  { prompt: "You can afford one senior engineer.", left: { label: "Stay scrappy", fx: { morale: -5 } }, right: { label: "Hire", fx: { cash: -25, users: 10, morale: 10 } } },
  { prompt: "Midterms are next week.", left: { label: "Ship anyway", fx: { users: 10, morale: -20 } }, right: { label: "Study", fx: { morale: 5, users: -5 } } },
  { prompt: "A competitor launches the exact same idea.", left: { label: "Copy their features", fx: { cash: -10, morale: -10 } }, right: { label: "Go talk to users", fx: { users: 10 } } },
  { prompt: "You're invited to pitch at a startup weekend.", left: { label: "Skip it", fx: { morale: -5 } }, right: { label: "Pitch", fx: { cash: 15, users: 5, morale: -5 } } },
  { prompt: "Your app tops a forum for three hours.", left: { label: "Celebrate", fx: { morale: 15 } }, right: { label: "Email every new user", fx: { users: 15, morale: -5 } } },
  { prompt: "Your cofounder proposes a 4-day work week.", left: { label: "Keep grinding", fx: { morale: -15, users: 5 } }, right: { label: "Approve it", fx: { morale: 15, users: -5 } } },
  { prompt: "A mentor says you're charging way too little.", left: { label: "Stay cheap", fx: { users: 10, cash: -10 } }, right: { label: "Raise prices", fx: { cash: 20, users: -15 } } },
  { prompt: "An angel offers a small check over coffee.", left: { label: "Not yet", fx: { morale: 5 } }, right: { label: "Take it", fx: { cash: 20 } } },
  { prompt: "You've pulled three all-nighters in a row.", left: { label: "Push through", fx: { users: 5, morale: -20 } }, right: { label: "Take the weekend off", fx: { morale: 20, users: -5 } } },
  { prompt: "A reporter wants a quote about your industry.", left: { label: "No comment", fx: { morale: -5 } }, right: { label: "Give a hot take", fx: { users: 15, morale: -10 } } },
  { prompt: "Bug reports are piling up.", left: { label: "Ship new features", fx: { users: -15 } }, right: { label: "Bug bash week", fx: { morale: -5, users: 10 } } },
  { prompt: "Your landlord wants you out of the garage.", left: { label: "Work from the library", fx: { morale: -10 } }, right: { label: "Rent a real office", fx: { cash: -20, morale: 15 } } },
  { prompt: "A client offers to pay a full year upfront.", left: { label: "Monthly is fine", fx: { cash: 5 } }, right: { label: "Give a discount", fx: { cash: 25, users: -5 } } },
  { prompt: "Someone offers to buy your startup.", left: { label: "Keep building", fx: { morale: 10, cash: -5 } }, right: { label: "Hear them out", fx: { cash: 10, morale: -15 } } },
  { prompt: "Your community Discord is getting toxic.", left: { label: "Let it be", fx: { users: -10, morale: -10 } }, right: { label: "Moderate hard", fx: { users: -5, morale: 10 } } },
  { prompt: "You can sponsor a campus hackathon.", left: { label: "Save the money", fx: { cash: 5 } }, right: { label: "Sponsor it", fx: { cash: -15, users: 15 } } },
  { prompt: "Your demo breaks in front of the judges.", left: { label: "Freeze", fx: { morale: -15 } }, right: { label: "Improvise", fx: { morale: 10, users: -5 } } },
];
