import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import PillarCard from "@/components/PillarCard";
import WeeklyReview from "@/components/WeeklyReview";
import { PILLARS, GUIDING_QUESTION } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "Reid Shepherd",
  description:
    "Reid Shepherd is a Christian stewardship framework built on three pillars — Spiritual, Physical, and Financial — with a Weekly Review to keep your stewardship before the Lord.",
};

export default function ReidShepherdPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-cream">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-4rem] top-[-4rem] h-80 w-80 rounded-full bg-spiritual-soft/40 blur-3xl" />
          <div className="absolute right-[-4rem] top-20 h-80 w-80 rounded-full bg-physical-soft/40 blur-3xl" />
          <div className="absolute bottom-[-6rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-financial-soft/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="eyebrow">The Reid Shepherd Framework</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-7xl">
            Reid Shepherd
          </h1>
          <div className="rule mx-auto mt-7" />
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            Steward your spiritual life, physical health, and financial resources
            for the glory of God.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Three pillars                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Three Pillars"
          title="One calling, three God-given areas"
          description="Reid Shepherd is built on exactly three pillars. Each is a sphere God has entrusted to your care — and each is meant to be stewarded faithfully, for His glory and the good of others."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.key} pillar={pillar} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Guiding question                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-cream bg-parchment">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="eyebrow">The Guiding Question</p>
          <p className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-medium leading-snug text-ink sm:text-4xl">
            “{GUIDING_QUESTION}”
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            Return to this question often. It is the heartbeat of Reid Shepherd —
            a humble, honest reckoning before the God who gives every good gift.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Weekly Review                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Prototype"
          title="Weekly Review"
          description="A simple rhythm to keep your stewardship before the Lord. Score each pillar, name your wins and struggles, set one faithful focus, and bring it all to God in prayer."
        />

        <div className="mt-12">
          <WeeklyReview />
        </div>

        <p className="mt-8 text-center text-sm italic text-muted">
          “Commit your work to the Lord, and your plans will be established.”
          — Proverbs 16:3
        </p>
      </section>
    </>
  );
}
