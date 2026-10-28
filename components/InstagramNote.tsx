import { site } from "@/content/site";

/** Reminder that Instagram has the most current event info. */
export default function InstagramNote() {
  const ig = site.socials.find((s) => s.label === "Instagram");
  return (
    <p className="notice" role="note">
      <span className="notice__icon" aria-hidden="true">!</span>
      <span>
        Dates, times and locations can change. For the most up-to-date info, check{" "}
        {ig ? (
          <a className="text-link" href={ig.href} target="_blank" rel="noopener noreferrer">
            @illinoisfounders on Instagram
          </a>
        ) : (
          "our Instagram"
        )}
        .
      </span>
    </p>
  );
}
