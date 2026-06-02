import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Statement of Faith",
  description:
    "The core biblical convictions of Reid One — what we believe about God, Scripture, Christ, salvation, and faithful stewardship.",
};

const BELIEFS = [
  {
    title: "The Holy Scriptures",
    body: "We believe the Bible — both Old and New Testaments — is the inspired, inerrant, and authoritative Word of God, our final standard for faith and life.",
    reference: "2 Timothy 3:16–17",
  },
  {
    title: "The Triune God",
    body: "We believe in one God, eternally existing in three Persons — Father, Son, and Holy Spirit — perfect in holiness, wisdom, power, and love.",
    reference: "Matthew 28:19",
  },
  {
    title: "Jesus Christ",
    body: "We believe in the deity of Jesus Christ, His virgin birth, sinless life, atoning death, bodily resurrection, ascension, and future return in glory.",
    reference: "John 1:1, 14",
  },
  {
    title: "Salvation by Grace",
    body: "We believe salvation is a gift of God’s grace, received through faith in Jesus Christ alone — not by works, so that no one may boast.",
    reference: "Ephesians 2:8–9",
  },
  {
    title: "The Holy Spirit",
    body: "We believe the Holy Spirit indwells, sanctifies, and empowers every believer to live a holy life and to serve God faithfully.",
    reference: "Galatians 5:22–25",
  },
  {
    title: "Faithful Stewardship",
    body: "We believe everything we have belongs to God and is entrusted to us to manage for His glory — our time, bodies, gifts, and resources.",
    reference: "1 Corinthians 4:2",
  },
];

export default function StatementOfFaithPage() {
  return (
    <>
      <PageHero
        eyebrow="Statement of Faith"
        title="What we believe"
        subtitle="Reid One stands on the historic, biblical faith. These convictions anchor everything we teach and how we steward."
      />

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <ol className="space-y-5">
          {BELIEFS.map((b, i) => (
            <li
              key={b.title}
              className="flex gap-5 rounded-2xl border border-cream bg-parchment p-6 sm:p-8"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold/40 bg-ivory font-serif text-lg font-semibold text-gold-deep">
                {i + 1}
              </span>
              <div>
                <h2 className="font-serif text-xl font-semibold text-ink">
                  {b.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">
                  {b.body}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-gold-deep">
                  {b.reference}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-soft/30 to-transparent px-7 py-10 text-center sm:px-12">
          <p className="font-serif text-2xl italic text-ink">
            “Jesus Christ is the same yesterday and today and forever.”
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gold-deep">
            Hebrews 13:8
          </p>
        </div>
      </section>
    </>
  );
}
