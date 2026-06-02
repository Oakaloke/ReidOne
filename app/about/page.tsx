import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Reid One is a Christian ministry dedicated to glorifying the God of the Bible and helping believers become faithful stewards of all He provides.",
};

const VALUES = [
  {
    title: "God-Glorifying",
    body: "Everything we do begins and ends with the glory of the God of the Bible. He is the giver; we are the stewards.",
  },
  {
    title: "Scripture-Anchored",
    body: "The Bible is our final authority. We aim to think, teach, and live in submission to God’s written Word.",
  },
  {
    title: "Faithful, Not Perfect",
    body: "Stewardship is measured by faithfulness, not flawlessness. We pursue steady, grace-empowered obedience.",
  },
  {
    title: "Whole-Life Discipleship",
    body: "God cares about every sphere of life — spiritual, physical, and financial. We steward all of it for Him.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Reid One"
        title="A ministry of faithful stewardship"
        subtitle="Helping believers honor God with every gift He has entrusted to them."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
          <p>
            Reid One exists for one purpose:{" "}
            <strong className="font-semibold text-ink">
              to glorify the God of the Bible
            </strong>{" "}
            and to help His people steward what He has so generously provided.
            Every good and perfect gift comes down from the Father (James 1:17),
            and all that we have — our souls, our bodies, our resources — is held
            in trust from Him.
          </p>
          <p>
            We believe the Christian life is not divided into “sacred” and
            “secular.” Your prayer life, your health, and your finances are all
            arenas of worship and obedience. That conviction gave rise to{" "}
            <Link
              href="/reid-shepherd"
              className="font-medium text-gold-deep underline-offset-4 hover:underline"
            >
              Reid Shepherd
            </Link>
            , our framework for faithful stewardship across three God-given
            pillars.
          </p>
          <p>
            Our aim is simple: to help you ask, week by week,{" "}
            <em>“Am I faithfully stewarding what God has entrusted to me?”</em>{" "}
            — and to walk forward in grace toward the day we long to hear, “Well
            done, good and faithful servant.”
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <SectionHeading eyebrow="What Shapes Us" title="Our values" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-cream bg-parchment p-7"
            >
              <h3 className="font-serif text-xl font-semibold text-ink">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {v.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-soft/30 to-transparent px-7 py-10 text-center sm:px-12">
          <p className="font-serif text-2xl italic text-ink">
            “So whether you eat or drink or whatever you do, do it all for the
            glory of God.”
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gold-deep">
            1 Corinthians 10:31
          </p>
        </div>
      </section>
    </>
  );
}
