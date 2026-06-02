import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { PILLARS } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Scripture, tools, and reading to help you faithfully steward your spiritual life, physical health, and financial resources.",
};

const READING = [
  {
    title: "Scripture for Stewardship",
    body: "Read through Matthew 25:14–30, Luke 16:1–13, and 1 Corinthians 4:1–2 to ground your understanding of faithful stewardship.",
  },
  {
    title: "Daily Examen",
    body: "End each day with a short, prayerful review: Where did I see God? Where did I fall short? What will I entrust to Him tonight?",
  },
  {
    title: "The Weekly Review",
    body: "Make the Reid Shepherd Weekly Review a steady rhythm — a regular, honest reckoning before the Lord across all three pillars.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Grow as a faithful steward"
        subtitle="Practical helps for stewarding every area of life — anchored in Scripture and oriented to the glory of God."
      />

      {/* By pillar */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="By Pillar"
          title="Practices for each area"
          description="Simple, repeatable habits to steward each pillar well. Start with one — faithfulness grows step by step."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.key}
              className="rounded-2xl border border-cream bg-parchment p-7"
            >
              <h3 className="font-serif text-xl font-semibold text-ink">
                {p.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {p.tagline}
              </p>
              <ul className="mt-5 space-y-2">
                {p.examples.map((ex) => (
                  <li
                    key={ex}
                    className="flex items-center gap-2 text-sm text-ink-soft"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Reading / practices */}
      <section className="border-t border-cream bg-parchment">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading
            eyebrow="Practices & Reading"
            title="Where to begin"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {READING.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-cream bg-ivory p-7"
              >
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {r.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/reid-shepherd"
              className="inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gold-deep"
            >
              Start your Weekly Review
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
