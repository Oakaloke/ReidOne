import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PillarCard from "@/components/PillarCard";
import { PILLARS, GUIDING_QUESTION } from "@/lib/pillars";

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        {/* soft radial backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-6rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gold-soft/30 blur-3xl" />
          <div className="absolute right-[-4rem] top-40 h-72 w-72 rounded-full bg-spiritual-soft/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="eyebrow">A Christian Stewardship Ministry</p>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            Steward every gift
            <br className="hidden sm:block" /> for the glory of God.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Reid One exists to glorify the God of the Bible and to help believers
            faithfully steward what He has entrusted to them — their spiritual
            life, their physical health, and their financial resources.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/reid-shepherd"
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gold-deep"
            >
              Explore Reid Shepherd
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-cream bg-parchment px-8 py-3.5 text-sm font-semibold text-ink-soft transition hover:border-gold/50 hover:text-gold-deep"
            >
              Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Verse band                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-cream bg-parchment">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8">
          <p className="font-serif text-2xl italic leading-relaxed text-ink sm:text-3xl">
            “Each of you should use whatever gift you have received to serve
            others, as faithful stewards of God’s grace.”
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gold-deep">
            1 Peter 4:10
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Three pillars preview                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="The Reid Shepherd Framework"
          title="Three pillars of faithful stewardship"
          description="One calling, lived out in three God-given areas. Not a program to perfect, but a rhythm of faithfulness — kept before the Lord, week by week."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.key} pillar={pillar} />
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-soft/30 to-transparent px-7 py-10 text-center sm:px-12">
          <p className="eyebrow">The Guiding Question</p>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl">
            “{GUIDING_QUESTION}”
          </p>
          <Link
            href="/reid-shepherd"
            className="mt-8 inline-block rounded-full bg-ink px-8 py-3 text-sm font-semibold text-ivory transition hover:bg-gold-deep"
          >
            Begin your Weekly Review
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Quick links                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              href: "/about",
              title: "Who We Are",
              body: "Our mission to glorify God and disciple faithful stewards.",
            },
            {
              href: "/statement-of-faith",
              title: "What We Believe",
              body: "The historic, biblical convictions that anchor this ministry.",
            },
            {
              href: "/resources",
              title: "Grow Deeper",
              body: "Scripture, tools, and reading to help you steward well.",
            },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-2xl border border-cream bg-parchment p-7 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="font-serif text-xl font-semibold text-ink">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {c.body}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-gold-deep transition group-hover:translate-x-1">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
