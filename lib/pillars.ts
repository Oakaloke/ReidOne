// The Reid Shepherd framework rests on exactly THREE primary pillars.
// This file is the single source of truth — the home preview, the Reid Shepherd
// page cards, and the Weekly Review all read from here so they never drift apart.
// Do not add additional primary pillars.

export type PillarKey = "spiritual" | "physical" | "financial";

export interface Pillar {
  key: PillarKey;
  name: string;
  tagline: string;
  examples: string[];
  /** Tailwind token names defined in globals.css @theme. */
  accent: string; // text/border accent color class suffix
  verse: string;
  reference: string;
}

export const PILLARS: Pillar[] = [
  {
    key: "spiritual",
    name: "Spiritual",
    tagline: "Walk closely with God and grow in grace.",
    examples: ["Prayer", "Scripture", "Church", "Worship", "Service", "Gratitude"],
    accent: "spiritual",
    verse: "But seek first the kingdom of God and his righteousness.",
    reference: "Matthew 6:33",
  },
  {
    key: "physical",
    name: "Physical",
    tagline: "Care for the body God has given you.",
    examples: ["Exercise", "Sleep", "Nutrition", "Energy", "Discipline"],
    accent: "physical",
    verse: "Your body is a temple of the Holy Spirit within you.",
    reference: "1 Corinthians 6:19",
  },
  {
    key: "financial",
    name: "Financial",
    tagline: "Steward your resources with wisdom and generosity.",
    examples: ["Budgeting", "Saving", "Giving", "Stewardship", "Debt Reduction"],
    accent: "financial",
    verse: "Moreover, it is required of stewards that they be found faithful.",
    reference: "1 Corinthians 4:2",
  },
];

export const GUIDING_QUESTION =
  "Am I faithfully stewarding what God has entrusted to me?";
