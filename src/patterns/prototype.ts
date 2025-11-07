export type CreativeBriefTone =
  | "Playful"
  | "Balanced"
  | "Calm"
  | "Bold"
  | string;

export interface CreativeBriefSpec {
  id: string;
  name: string;
  theme: string;
  tone: CreativeBriefTone;
  palette: string[];
  keywords: string[];
  deliverables: string[];
}

let briefCounter = 0;
const createId = (prefix = "brief") => {
  briefCounter += 1;
  return `${prefix}-${Date.now()}-${briefCounter}`;
};

/**
 * Concrete prototype that knows how to clone itself into new briefs.
 */
export class CreativeBriefPrototype {
  constructor(private readonly spec: CreativeBriefSpec) {}

  clone(
    overrides: Partial<Omit<CreativeBriefSpec, "id">> & { id?: string } = {}
  ): CreativeBriefPrototype {
    return new CreativeBriefPrototype({
      ...this.spec,
      ...overrides,
      id: overrides.id ?? createId(),
      palette: overrides.palette
        ? [...overrides.palette]
        : [...this.spec.palette],
      keywords: overrides.keywords
        ? [...overrides.keywords]
        : [...this.spec.keywords],
      deliverables: overrides.deliverables
        ? [...overrides.deliverables]
        : [...this.spec.deliverables],
    });
  }

  snapshot(): CreativeBriefSpec {
    return {
      ...this.spec,
      palette: [...this.spec.palette],
      keywords: [...this.spec.keywords],
      deliverables: [...this.spec.deliverables],
    };
  }
}

export const creativeBriefLibrary: CreativeBriefPrototype[] = [
  new CreativeBriefPrototype({
    id: createId(),
    name: "Aurora onboarding",
    theme: "Soft gradients for fintech onboarding",
    tone: "Calm",
    palette: ["#7c4dff", "#c8b6ff", "#f8f2ff"],
    keywords: ["trust", "onboarding", "financial freedom"],
    deliverables: ["Hero illustration", "Empty state visuals"],
  }),
  new CreativeBriefPrototype({
    id: createId(),
    name: "Pulse dashboard",
    theme: "Data-heavy SaaS dashboard with motion hints",
    tone: "Balanced",
    palette: ["#0f172a", "#2563eb", "#22d3ee"],
    keywords: ["analytics", "velocity", "motion"],
    deliverables: ["Widget cards", "Motion storyboard"],
  }),
  new CreativeBriefPrototype({
    id: createId(),
    name: "Sprout wellness",
    theme: "Organic ecommerce landing",
    tone: "Playful",
    palette: ["#0c6b58", "#8dd9c0", "#f7f1e1"],
    keywords: ["wellness", "organic", "community"],
    deliverables: ["Homepage hero", "Social snippets"],
  }),
];
