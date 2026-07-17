import { FlaskConical, Scale, type LucideIcon } from "lucide-react";

export type Tool = {
  slug: string;
  name: string;
  shortDescription: string;
  icon: LucideIcon;
};

// Single source of truth for which tools exist. The landing page renders a
// tile for every entry here — add a tool by adding a line, see
// docs/adding-a-new-tool.md.
export const tools: Tool[] = [
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    shortDescription: "Body mass index from height and weight.",
    icon: Scale,
  },
  {
    slug: "syrup-dosage-calculator",
    name: "Syrup Dosage Calculator",
    shortDescription: "Weight-based dosing, split across 2–4 doses a day.",
    icon: FlaskConical,
  },
];

export function toolHref(slug: string): string {
  return `/tools/${slug}`;
}
