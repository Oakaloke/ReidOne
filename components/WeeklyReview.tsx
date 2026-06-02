"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "reid-one:weekly-review";

interface ReviewData {
  spiritualScore: number;
  physicalScore: number;
  financialScore: number;
  biggestWin: string;
  biggestStruggle: string;
  oneFocus: string;
  prayerReflection: string;
  savedAt: string;
}

const EMPTY: ReviewData = {
  spiritualScore: 0,
  physicalScore: 0,
  financialScore: 0,
  biggestWin: "",
  biggestStruggle: "",
  oneFocus: "",
  prayerReflection: "",
  savedAt: "",
};

const SCORES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SCORE_FIELDS: {
  key: "spiritualScore" | "physicalScore" | "financialScore";
  label: string;
  accent: { active: string; idle: string; text: string };
}[] = [
  {
    key: "spiritualScore",
    label: "Spiritual Score",
    accent: {
      active: "bg-spiritual text-white border-spiritual",
      idle: "border-cream text-ink-soft hover:border-spiritual/50",
      text: "text-spiritual",
    },
  },
  {
    key: "physicalScore",
    label: "Physical Score",
    accent: {
      active: "bg-physical text-white border-physical",
      idle: "border-cream text-ink-soft hover:border-physical/50",
      text: "text-physical",
    },
  },
  {
    key: "financialScore",
    label: "Financial Score",
    accent: {
      active: "bg-financial text-white border-financial",
      idle: "border-cream text-ink-soft hover:border-financial/50",
      text: "text-financial",
    },
  },
];

const TEXT_FIELDS: {
  key: "biggestWin" | "biggestStruggle" | "oneFocus" | "prayerReflection";
  label: string;
  placeholder: string;
  rows: number;
}[] = [
  {
    key: "biggestWin",
    label: "Biggest Win",
    placeholder: "Where did you see God's grace at work this week?",
    rows: 2,
  },
  {
    key: "biggestStruggle",
    label: "Biggest Struggle",
    placeholder: "What was hard? Where do you need to grow?",
    rows: 2,
  },
  {
    key: "oneFocus",
    label: "One Focus For Next Week",
    placeholder: "A single, faithful next step…",
    rows: 1,
  },
  {
    key: "prayerReflection",
    label: "Prayer Reflection",
    placeholder: "Bring it before the Lord in prayer…",
    rows: 3,
  },
];

export default function WeeklyReview() {
  const [data, setData] = useState<ReviewData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load any saved review from the browser on first mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ReviewData;
        setData({ ...EMPTY, ...parsed });
        if (parsed.savedAt) setSubmitted(true);
      }
    } catch {
      /* ignore malformed storage */
    }
    setLoaded(true);
  }, []);

  const setScore = (key: keyof ReviewData, value: number) =>
    setData((d) => ({ ...d, [key]: value }));

  const setText = (key: keyof ReviewData, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toSave: ReviewData = { ...data, savedAt: new Date().toISOString() };
    setData(toSave);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      /* storage may be unavailable (private mode) — prototype still shows summary */
    }
    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setData(EMPTY);
    setSubmitted(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const average = (
    (data.spiritualScore + data.physicalScore + data.financialScore) /
    3
  ).toFixed(1);

  // Avoid a hydration flash before localStorage is read.
  if (!loaded) {
    return (
      <div className="rounded-2xl border border-cream bg-parchment p-8 text-center text-sm text-muted">
        Loading your review…
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gold/30 bg-parchment shadow-sm">
        <div className="border-b border-cream bg-gradient-to-r from-gold-soft/40 to-transparent px-7 py-6">
          <p className="eyebrow">Weekly Review · Summary</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
            “{average}” average — kept before the Lord
          </h3>
          {data.savedAt && (
            <p className="mt-1 text-xs text-muted">
              Saved {new Date(data.savedAt).toLocaleString()}
            </p>
          )}
        </div>

        <div className="grid gap-4 px-7 py-7 sm:grid-cols-3">
          {SCORE_FIELDS.map((f) => (
            <div
              key={f.key}
              className="rounded-xl border border-cream bg-ivory px-4 py-5 text-center"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {f.label.replace(" Score", "")}
              </p>
              <p className={`mt-2 font-serif text-4xl font-semibold ${f.accent.text}`}>
                {data[f.key] || "—"}
                <span className="text-lg text-muted">/10</span>
              </p>
            </div>
          ))}
        </div>

        <dl className="space-y-5 px-7 pb-8">
          {TEXT_FIELDS.map((f) => (
            <div key={f.key} className="border-t border-cream pt-4">
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
                {(data[f.key] as string) || (
                  <span className="italic text-muted">— left blank —</span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-3 border-t border-cream bg-ivory px-7 py-5 sm:flex-row">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-ivory transition hover:bg-gold-deep"
          >
            Edit this review
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-cream px-6 py-2.5 text-sm font-medium text-ink-soft transition hover:border-gold/50 hover:text-gold-deep"
          >
            Start a fresh week
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-cream bg-parchment p-6 shadow-sm sm:p-9"
    >
      {/* Scores */}
      <div className="space-y-7">
        {SCORE_FIELDS.map((f) => (
          <fieldset key={f.key}>
            <div className="flex items-baseline justify-between">
              <legend className="text-sm font-semibold text-ink">
                {f.label}
              </legend>
              <span className={`font-serif text-lg font-semibold ${f.accent.text}`}>
                {data[f.key] ? `${data[f.key]} / 10` : "—"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-10">
              {SCORES.map((n) => {
                const selected = data[f.key] === n;
                return (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setScore(f.key, n)}
                    aria-pressed={selected}
                    aria-label={`${f.label} ${n} of 10`}
                    className={`aspect-square rounded-lg border text-sm font-medium transition ${
                      selected ? f.accent.active : `bg-ivory ${f.accent.idle}`
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {/* Text reflections */}
      <div className="mt-9 space-y-5 border-t border-cream pt-8">
        {TEXT_FIELDS.map((f) => (
          <div key={f.key}>
            <label
              htmlFor={f.key}
              className="block text-sm font-semibold text-ink"
            >
              {f.label}
            </label>
            <textarea
              id={f.key}
              rows={f.rows}
              value={data[f.key] as string}
              onChange={(e) => setText(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="mt-2 w-full resize-y rounded-xl border border-cream bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gold-deep"
        >
          Save weekly review
        </button>
        <p className="text-xs text-muted">
          Saved privately in your browser — nothing leaves this device.
        </p>
      </div>
    </form>
  );
}
