export type IconName = "spark" | "leaf" | "wave" | "bolt";

interface IconDefinition {
  viewBox: string;
  path: string;
}

const iconDefinitions: Record<IconName, IconDefinition> = {
  spark: {
    viewBox: "0 0 24 24",
    path: "M12 2l2.4 5.8 6.1.5-4.7 4.1 1.4 6-5.2-3.2-5.2 3.2 1.4-6-4.7-4.1 6.1-.5z",
  },
  leaf: {
    viewBox: "0 0 24 24",
    path: "M4 12c0 4.4 3.6 8 8 8 3.3 0 6.2-2 7.4-4.8.4-.9-.6-1.7-1.4-1.1-1.5 1-3.2 1.5-5 1.5-4.4 0-8-3.6-8-8 0-1.8.6-3.5 1.5-5 .5-.8-.2-1.8-1.1-1.4C6 1.8 4 4.7 4 8v4z",
  },
  wave: {
    viewBox: "0 0 24 24",
    path: "M3 15c1.5 0 3-1 4.5-3s3-3 4.5-3 3 1 4.5 3 3 3 4.5 3v4c-1.5 0-3-1-4.5-3s-3-3-4.5-3-3 1-4.5 3-3 3-4.5 3V15z",
  },
  bolt: {
    viewBox: "0 0 24 24",
    path: "M13.5 2L6 13h5l-1.5 9L18 11h-5l.5-9z",
  },
};

class IconFlyweight {
  constructor(private readonly definition: IconDefinition) {}

  getDefinition(): IconDefinition {
    return this.definition;
  }
}

export class IconFlyweightFactory {
  private cache = new Map<IconName, IconFlyweight>();
  public hits = 0;
  public misses = 0;

  getIcon(name: IconName): IconFlyweight {
    const cached = this.cache.get(name);
    if (cached) {
      this.hits += 1;
      return cached;
    }

    const flyweight = new IconFlyweight(iconDefinitions[name]);
    this.cache.set(name, flyweight);
    this.misses += 1;
    return flyweight;
  }

  cacheSize(): number {
    return this.cache.size;
  }
}

export interface BadgeBlueprint {
  product: string;
  title: string;
  icon: IconName;
  accent: string;
  meta: string;
}

const badgeBlueprints: BadgeBlueprint[] = [
  {
    product: "Nova Finance",
    title: "Wallet Sync",
    icon: "spark",
    accent: "#fef3c7",
    meta: "신규 가입자 온보딩 시간 25% 단축",
  },
  {
    product: "Flow CRM",
    title: "Signal Routing",
    icon: "wave",
    accent: "#e0f2fe",
    meta: "팀 인입 티켓을 3개 스트림으로 자동 분류",
  },
  {
    product: "Atlas Ops",
    title: "Energy Sweep",
    icon: "bolt",
    accent: "#fee2e2",
    meta: "야간 배포 대비 전력 사용량 18% 절감",
  },
  {
    product: "Moss Retail",
    title: "Green Cart",
    icon: "leaf",
    accent: "#dcfce7",
    meta: "지속 가능 카테고리 클릭률 2.4배 상승",
  },
  {
    product: "Pulse Metrics",
    title: "Signal Routing",
    icon: "wave",
    accent: "#e0f2fe",
    meta: "주요 알림을 세 가지 긴급도로 정렬",
  },
  {
    product: "Nova Finance",
    title: "Wallet Sync",
    icon: "spark",
    accent: "#fef3c7",
    meta: "거래 기록 복구 성공률 99.2% 유지",
  },
  {
    product: "Atlas Ops",
    title: "Overdrive",
    icon: "bolt",
    accent: "#fee2e2",
    meta: "인프라 스파이크 시나리오를 4분 내 시뮬레이션",
  },
  {
    product: "Moss Retail",
    title: "Green Cart",
    icon: "leaf",
    accent: "#dcfce7",
    meta: "친환경 배지 클릭 대비 구매율 38% 증가",
  },
];

let badgeCounter = 0;
const createBadgeId = () => {
  badgeCounter += 1;
  return `badge-${Date.now()}-${badgeCounter}`;
};

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pickBlueprint = () =>
  badgeBlueprints[Math.floor(Math.random() * badgeBlueprints.length)];

export interface BadgeInstance {
  id: string;
  title: string;
  product: string;
  meta: string;
  iconName: IconName;
  accent: string;
  viewBox: string;
  path: string;
}

export interface FlyweightBuildResult {
  badges: BadgeInstance[];
  stats: {
    totalBadges: number;
    uniqueIcons: number;
    cacheHits: number;
    cacheMisses: number;
  };
}

export const buildBadgeCollection = (): FlyweightBuildResult => {
  const factory = new IconFlyweightFactory();

  const sampleSize = randomInt(5, badgeBlueprints.length + 2);
  const selectedBlueprints = Array.from({ length: sampleSize }, pickBlueprint);

  const badges = selectedBlueprints.map((blueprint) => {
    const icon = factory.getIcon(blueprint.icon);
    const definition = icon.getDefinition();

    return {
      id: createBadgeId(),
      title: blueprint.title,
      product: blueprint.product,
      meta: blueprint.meta,
      iconName: blueprint.icon,
      accent: blueprint.accent,
      viewBox: definition.viewBox,
      path: definition.path,
    };
  });

  return {
    badges,
    stats: {
      totalBadges: badges.length,
      uniqueIcons: factory.cacheSize(),
      cacheHits: factory.hits,
      cacheMisses: factory.misses,
    },
  };
};
