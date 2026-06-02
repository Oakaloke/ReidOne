import type { Pillar } from "@/lib/pillars";

// Map pillar accent keys to concrete classes so Tailwind can see them
// statically (it does not support fully dynamic class names).
const ACCENTS: Record<
  string,
  { ring: string; chip: string; text: string; bar: string; glow: string }
> = {
  spiritual: {
    ring: "hover:border-spiritual/40",
    chip: "bg-spiritual-soft text-spiritual",
    text: "text-spiritual",
    bar: "bg-spiritual",
    glow: "from-spiritual-soft",
  },
  physical: {
    ring: "hover:border-physical/40",
    chip: "bg-physical-soft text-physical",
    text: "text-physical",
    bar: "bg-physical",
    glow: "from-physical-soft",
  },
  financial: {
    ring: "hover:border-financial/40",
    chip: "bg-financial-soft text-financial",
    text: "text-financial",
    bar: "bg-financial",
    glow: "from-financial-soft",
  },
};

export default function PillarCard({ pillar }: { pillar: Pillar }) {
  const a = ACCENTS[pillar.accent] ?? ACCENTS.spiritual;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-cream bg-parchment p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${a.ring}`}
    >
      {/* soft corner glow */}
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${a.glow} to-transparent opacity-60 blur-2xl`}
      />

      <div className={`h-1 w-10 rounded-full ${a.bar}`} />

      <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">
        {pillar.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {pillar.tagline}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {pillar.examples.map((ex) => (
          <li
            key={ex}
            className={`rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}
          >
            {ex}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <p className={`font-serif text-sm italic ${a.text}`}>“{pillar.verse}”</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
          {pillar.reference}
        </p>
      </div>
    </article>
  );
}
