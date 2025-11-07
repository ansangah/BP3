export type Discipline =
  | "Research"
  | "Design"
  | "Engineering"
  | "QA"
  | "Marketing";

export interface ChannelBrief {
  id: Discipline;
  label: string;
  summary: string;
  accent: string;
}

export const channelBriefs: ChannelBrief[] = [
  {
    id: "Research",
    label: "Research",
    summary: "문제 정의와 기회 영역을 탐색합니다.",
    accent: "#fef3c7",
  },
  {
    id: "Design",
    label: "Design",
    summary: "핵심 플로우와 시각 시스템을 조율합니다.",
    accent: "#ede9fe",
  },
  {
    id: "Engineering",
    label: "Engineering",
    summary: "기술 제약과 배포 경로를 확정합니다.",
    accent: "#cffafe",
  },
  {
    id: "QA",
    label: "QA",
    summary: "릴리즈 후보를 검증하고 리스크를 기록합니다.",
    accent: "#fee2e2",
  },
  {
    id: "Marketing",
    label: "Marketing",
    summary: "시장 메시지와 런치 캠페인을 동기화합니다.",
    accent: "#ecfccb",
  },
];

interface UpdateTemplate {
  summary: string;
  routedTo: Discipline[];
  nudge: string;
}

const updateLibrary: Record<Discipline, UpdateTemplate[]> = {
  Research: [
    {
      summary: "신규 페르소나 인터뷰 6건 분석 완료",
      routedTo: ["Design", "Marketing"],
      nudge: "UX 스토리 업데이트 필요",
    },
    {
      summary: "리텐션 저하 원인 3가지 가설 정리",
      routedTo: ["Design", "Engineering"],
      nudge: "기능 플래그 비교 실험 요청",
    },
  ],
  Design: [
    {
      summary: "온보딩 플로우 와이어프레임 v2 공유",
      routedTo: ["Engineering", "QA"],
      nudge: "제스처 정책 리뷰 필요",
    },
    {
      summary: "앱 다크모드 토큰 초안 배포",
      routedTo: ["Engineering", "Marketing"],
      nudge: "마케팅 시각 자료와 색상 동기화",
    },
  ],
  Engineering: [
    {
      summary: "실시간 동기화 엔진 부하 테스트 통과",
      routedTo: ["QA", "Marketing"],
      nudge: "성능 수치 기반 메시지 준비",
    },
    {
      summary: "새 API 한도 정책 Dev 환경에 반영",
      routedTo: ["Design", "QA"],
      nudge: "에러 상태 화면 점검 필요",
    },
  ],
  QA: [
    {
      summary: "E2E 시나리오 42건 중 39건 통과",
      routedTo: ["Engineering"],
      nudge: "실패 케이스 패치 ETA 요청",
    },
    {
      summary: "앱 스토어 심사 체크리스트 업데이트",
      routedTo: ["Marketing", "Engineering"],
      nudge: "메타데이터/권한 항목 재확인",
    },
  ],
  Marketing: [
    {
      summary: "프리뷰 영상 스토리보드 최종 승인",
      routedTo: ["Design"],
      nudge: "UI 캡처 전달 부탁",
    },
    {
      summary: "랠리 캠페인 랜딩 초안 배포",
      routedTo: ["Research", "Engineering"],
      nudge: "핵심 수치 검증 요청",
    },
  ],
};

let logCounter = 0;
const createLogId = () => {
  logCounter += 1;
  return `mediator-log-${Date.now()}-${logCounter}`;
};

const pickTemplate = (discipline: Discipline) => {
  const options = updateLibrary[discipline];
  return options[Math.floor(Math.random() * options.length)];
};

export interface MediatorLogEntry {
  id: string;
  from: Discipline;
  summary: string;
  routedTo: Discipline[];
  nudge: string;
  timestamp: string;
}

export class LaunchMediator {
  private lastMessage: Record<Discipline, string>;

  constructor() {
    this.lastMessage = channelBriefs.reduce<Record<Discipline, string>>(
      (acc, channel) => {
        acc[channel.id] = channel.summary;
        return acc;
      },
      {} as Record<Discipline, string>
    );
  }

  dispatch(discipline: Discipline): MediatorLogEntry {
    const template = pickTemplate(discipline);
    this.lastMessage[discipline] = template.summary;

    return {
      id: createLogId(),
      from: discipline,
      summary: template.summary,
      routedTo: template.routedTo,
      nudge: template.nudge,
      timestamp: new Date().toISOString(),
    };
  }

  getChannelSnapshot(): Record<Discipline, string> {
    return { ...this.lastMessage };
  }
}
