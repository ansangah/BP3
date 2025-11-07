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
    theme: "핀테크 온보딩을 위한 부드러운 그라디언트",
    tone: "차분한",
    palette: ["#7c4dff", "#c8b6ff", "#f8f2ff"],
    keywords: ["신뢰", "온보딩", "재정적 자유"],
    deliverables: ["히어로 일러스트", "빈 화면 그래픽"],
  }),
  new CreativeBriefPrototype({
    id: createId(),
    name: "Pulse dashboard",
    theme: "모션 힌트를 더한 데이터 중심 SaaS 대시보드",
    tone: "균형 잡힌",
    palette: ["#0f172a", "#2563eb", "#22d3ee"],
    keywords: ["분석", "속도", "모션"],
    deliverables: ["위젯 카드", "모션 스토리보드"],
  }),
  new CreativeBriefPrototype({
    id: createId(),
    name: "Sprout wellness",
    theme: "유기농 이커머스 랜딩",
    tone: "발랄한",
    palette: ["#0c6b58", "#8dd9c0", "#f7f1e1"],
    keywords: ["웰니스", "유기농", "커뮤니티"],
    deliverables: ["홈페이지 히어로", "소셜 스니펫"],
  }),
];
