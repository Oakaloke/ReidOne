"use client";

import { useState } from "react";

// Update this to the ministry's real inbox.
const CONTACT_EMAIL = "hello@reidone.org";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Static export has no backend, so we compose a mailto: the visitor's own
  // email client sends the message. Swap this for a form service later if wanted.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Reid One — message from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? `\n${email}` : ""}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-cream bg-parchment p-6 shadow-sm sm:p-9"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-2 w-full rounded-xl border border-cream bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-cream bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-ink"
          >
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we encourage or serve you?"
            className="mt-2 w-full resize-y rounded-xl border border-cream bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gold-deep"
        >
          Send message
        </button>
        <p className="text-xs text-muted">
          Or email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-gold-deep hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </form>
  );
}
