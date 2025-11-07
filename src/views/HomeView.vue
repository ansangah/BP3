<template>
  <main class="home">
    <header class="hero">
      <p class="eyebrow">Design Patterns Hub</p>
      <h1>패턴 고르기</h1>
      <p class="lead">
        생성 · 구조 · 행위 패턴별 인터랙션을 직접 확인할 수 있습니다. 각 데모
        페이지로 이동하면 간단한 설명과 실습 UI가 제공됩니다.
      </p>
      <div class="hero-actions">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.id"
          :to="tab.to"
          :class="['tab', isActive(tab.to) && 'active']"
        >
          {{ tab.label }}
        </RouterLink>
      </div>
    </header>

    <section class="pattern-grid">
      <article v-for="card in patternCards" :key="card.id" class="pattern-card">
        <p class="category">{{ card.category }}</p>
        <h2>{{ card.title }}</h2>
        <p class="summary">{{ card.summary }}</p>
        <RouterLink class="link" :to="card.route">
          {{ card.cta }} →
        </RouterLink>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";

interface PatternCard {
  id: string;
  title: string;
  category: string;
  summary: string;
  route: string;
  cta: string;
}

const patternCards: PatternCard[] = [
  {
    id: "prototype",
    title: "Prototype Playground",
    category: "Creational",
    summary:
      "기본 브리프를 복제하고 필요한 필드만 덮어써서 빠르게 변형하는 방식을 체험합니다.",
    route: "/prototype",
    cta: "Go to Prototype",
  },
  {
    id: "flyweight",
    title: "Flyweight Icon Cache",
    category: "Structural",
    summary:
      "아이콘 벡터를 공유하고 외적 상태만 분리하여 캐시 히트/미스를 시각적으로 확인합니다.",
    route: "/flyweight",
    cta: "Go to Flyweight",
  },
  {
    id: "mediator",
    title: "Mediator Launch Hub",
    category: "Behavioral",
    summary:
      "팀 간 직접 의존 대신 허브를 통해 라우팅되는 메시지를 타임라인으로 확인합니다.",
    route: "/mediator",
    cta: "Go to Mediator",
  },
];

const tabs = [
  { id: "prototype", label: "Prototype", to: "/prototype" },
  { id: "flyweight", label: "Flyweight", to: "/flyweight" },
  { id: "mediator", label: "Mediator", to: "/mediator" },
];

const route = useRoute();
const currentPath = computed(() => route.path);
const isActive = (targetPath: string) => currentPath.value === targetPath;
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding: 3rem 1.5rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #818cf8;
  font-size: 0.85rem;
}

.lead {
  color: #475467;
  max-width: 640px;
  margin: 0 auto;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tab {
  border-radius: 999px;
  padding: 0.65rem 1.4rem;
  font-weight: 600;
  border: 1px solid transparent;
  color: #111827;
  background: transparent;
  transition: background 120ms ease, color 120ms ease, border 120ms ease;
}

.tab.active {
  background: #111827;
  color: white;
}

.tab:not(.active) {
  border-color: #d1d5db;
  background: white;
}

.pattern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.pattern-card {
  background: white;
  border-radius: 1.25rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 10px 35px rgba(15, 23, 42, 0.06);
}

.category {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  color: #94a3b8;
}

.summary {
  color: #475467;
  flex: 1;
}

.link {
  font-weight: 600;
  color: #4f46e5;
}

@media (max-width: 640px) {
  .home {
    padding: 2.5rem 1rem 3rem;
  }
}
</style>
