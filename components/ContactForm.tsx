"use client";

import { useId, useState } from "react";
import { site } from "@/content/site";

const TOPICS = ["General question", "Joining Founders", "Events", "Sponsorship or partnership", "Press or media", "Something else"];

type Fields = { name: string; email: string; topic: string; message: string };

/** Contact form for the bottom of the home page. See site.contactFormEndpoint for how messages are sent. */
export default function ContactForm() {
  const id = useId();
  const [f, setF] = useState<Fields>({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "mailto">("idle");
  const [error, setError] = useState("");
  const set =
    (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setF({ ...f, [k]: e.target.value });
  const endpoint = site.contactFormEndpoint;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!f.name.trim() || !f.message.trim()) {
      setError("Add your name and a message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) {
      setError("Enter a valid email so we can write back.");
      return;
    }
    if (!endpoint) {
      const subject = `[Website] ${f.topic}: ${f.name.trim()}`;
      const body = `${f.message.trim()}\n\n${f.name.trim()}\n${f.email.trim()}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, _subject: `[Website] ${f.topic}` }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("done");
    } catch {
      setStatus("idle");
      setError(`That didn't go through. Email us at ${site.email} instead.`);
    }
  };

  if (status === "done") {
    return (
      <div className="contact-form contact-form--done" role="status">
        <strong>Thanks, {f.name.trim().split(" ")[0]}!</strong> Your message is in. We&apos;ll get back to you at{" "}
        {f.email.trim()}.
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__row">
        <label className="contact-form__field">
          <span>Name</span>
          <input type="text" autoComplete="name" value={f.name} onChange={set("name")} />
        </label>
        <label className="contact-form__field">
          <span>Email</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="netid@illinois.edu"
            value={f.email}
            onChange={set("email")}
          />
        </label>
      </div>
      <label className="contact-form__field">
        <span>What&apos;s it about?</span>
        <select value={f.topic} onChange={set("topic")}>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="contact-form__field">
        <span>Message</span>
        <textarea rows={5} value={f.message} onChange={set("message")} />
      </label>
      <div className="contact-form__foot">
        <button type="submit" className="btn btn--orange" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p id={`${id}-msg`} className="contact-form__msg" aria-live="polite">
          {error ||
            (status === "mailto" ? "Your email app should open with the message ready to send." : `Or email us directly: ${site.email}`)}
        </p>
      </div>
    </form>
  );
}
