import { site } from "@/content/site";

/**
 * "Remind me when applications open" signup: the Google Form set in content/site.ts,
 * opened in a new tab (Google blocks it from loading inside some pages).
 */
export default function ReminderSignup() {
  const { formId } = site.reminderForm;
  if (!formId) return null;
  const base = `https://docs.google.com/forms/d/e/${formId}/viewform`;
  return (
    <div className="reminder">
      <p className="reminder__label">Get an email when applications open</p>
      <div className="btn-row">
        <a className="btn btn--orange" href={base} target="_blank" rel="noopener noreferrer">
          Remind me <span className="arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
