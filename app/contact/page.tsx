import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Reid One — questions, encouragement, or to learn more about faithful stewardship through the Reid Shepherd framework.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We’d love to hear from you"
        subtitle="Questions about Reid Shepherd, a word of encouragement, or a desire to grow as a steward — reach out and we’ll gladly respond."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <ContactForm />

        <div className="mt-12 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-soft/30 to-transparent px-7 py-9 text-center">
          <p className="font-serif text-xl italic text-ink">
            “Let us consider how we may spur one another on toward love and good
            deeds.”
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gold-deep">
            Hebrews 10:24
          </p>
        </div>
      </section>
    </>
  );
}
