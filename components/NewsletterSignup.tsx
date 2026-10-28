"use client";

import { useId, useState } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Inline "This Week at UIUC Founders" signup.
 * Posts to the Kit form set in content/site.ts in the background, so visitors stay on the page.
 * Kit then emails them a confirmation link.
 */
export default function NewsletterSignup({
  tone = "light",
  label = "Get the newsletter",
}: {
  tone?: "light" | "dark";
  label?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const { kitFormId, subscribeUrl } = site.newsletter;
  const endpoint = kitFormId ? `https://app.kit.com/forms/${kitFormId}/subscriptions` : null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setStatus("idle");
      setError("Enter a full email address, like netid@illinois.edu.");
      return;
    }
    if (!endpoint) {
      setError("Signups aren't connected yet, so this email wasn't saved.");
      return;
    }
    setStatus("sending");
    try {
      const body = new FormData();
      body.append("email_address", email.trim());
      const res = await fetch(endpoint, { method: "POST", body, headers: { Accept: "application/json" } });
      const data = await res.json();
      if (data.status === "success" || data.status === "quarantined") {
        setStatus("done");
        return;
      }
      setStatus("idle");
      setError(data.errors?.messages?.[0] || "That didn't go through. Try again.");
    } catch {
      setStatus("error");
      setError("That didn't go through.");
    }
  };

  if (status === "done") {
    return (
      <div className="reminder reminder--done" role="status" data-newsletter-signup="">
        <strong>You&apos;re in.</strong> Check {email.trim()} for a confirmation email.
      </div>
    );
  }

  return (
    <form className={`reminder ${tone === "dark" ? "reminder--dark" : ""}`} onSubmit={onSubmit} noValidate data-newsletter-signup="">
      <label htmlFor={`${id}-email`} className="reminder__label">
        {label}
      </label>
      <div className="reminder__row">
        <input
          id={`${id}-email`}
          name="email_address"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="netid@illinois.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={`${id}-msg`}
          aria-invalid={error ? true : undefined}
          className="reminder__input"
        />
        <button type="submit" className="btn btn--orange" disabled={status === "sending"}>
          {status === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p id={`${id}-msg`} className="reminder__msg" aria-live="polite">
        {error ? (
          <>
            {error}
            {status === "error" && subscribeUrl && (
              <>
                {" "}
                <a className="text-link" href={subscribeUrl} target="_blank" rel="noopener noreferrer">
                  Sign up on Kit instead
                </a>
                .
              </>
            )}
          </>
        ) : (
          "Weekly, from the Founders team. Unsubscribe anytime."
        )}
      </p>
    </form>
  );
}
