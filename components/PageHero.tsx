interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-cream bg-parchment">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <div className="rule mx-auto mt-6" />
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
