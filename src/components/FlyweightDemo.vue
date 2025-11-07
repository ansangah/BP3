<template>
  <section class="flyweight-demo">
    <header class="demo-header">
      <p class="badge">Flyweight Pattern</p>
      <h1>Icon Cache Console</h1>
      <p class="lead">
        동일한 아이콘 벡터는 플라이웨이트 캐시에 한 번만 저장하고, 색상이나
        의미처럼 자주 바뀌는 정보만 카드 인스턴스에 실어 렌더링합니다.
      </p>
    </header>

    <div class="stats-panel">
      <div class="stat">
        <p class="label">Unique flyweights</p>
        <p class="value">{{ stats.uniqueIcons }}</p>
        <p class="hint">아이콘 템플릿 개수</p>
      </div>
      <div class="stat">
        <p class="label">Cache hits</p>
        <p class="value success">{{ stats.cacheHits }}</p>
        <p class="hint">이미 로드된 아이콘 재사용</p>
      </div>
      <div class="stat">
        <p class="label">Cache misses</p>
        <p class="value warn">{{ stats.cacheMisses }}</p>
        <p class="hint">처음 요청된 아이콘</p>
      </div>
      <div class="stat">
        <p class="label">Rendered badges</p>
        <p class="value">{{ stats.totalBadges }}</p>
        <p class="hint">나열된 카드 수</p>
      </div>
      <button class="refresh-btn" type="button" @click="regenerate">
        다시 샘플링
      </button>
    </div>

    <div class="badge-grid">
      <article v-for="badge in badges" :key="badge.id" class="badge-card">
        <div
          class="icon-shell"
          :style="{
            borderColor: badge.accent,
            backgroundColor: toTranslucent(badge.accent),
          }"
        >
          <svg :viewBox="badge.viewBox" role="presentation">
            <path :d="badge.path" />
          </svg>
        </div>
        <p class="product">{{ badge.product }}</p>
        <h3>{{ badge.title }}</h3>
        <p class="meta">{{ badge.meta }}</p>
        <span class="chip">Icon · {{ badge.iconName }}</span>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  FlyweightBuildResult,
  buildBadgeCollection,
} from "../patterns/flyweight";

const result = ref<FlyweightBuildResult>(buildBadgeCollection());

const badges = computed(() => result.value.badges);
const stats = computed(() => result.value.stats);

const regenerate = () => {
  result.value = buildBadgeCollection();
};

const toTranslucent = (hex: string) => `${hex}55`;
</script>

<style scoped>
.flyweight-demo {
  padding: 2.5rem 1.5rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.demo-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0ea5e9;
  background: rgba(14, 165, 233, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 0.5rem;
}

.lead {
  color: #475467;
  margin-top: 0.5rem;
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.85rem;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.35);
}

.stat {
  border: 1px solid rgba(226, 232, 240, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

.value {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
}

.value.success {
  color: #34d399;
}

.value.warn {
  color: #fbbf24;
}

.hint {
  font-size: 0.9rem;
  color: #cbd5f5;
}

.refresh-btn {
  border: 1px solid rgba(226, 232, 240, 0.4);
  border-radius: 1rem;
  background: transparent;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 120ms ease, background 120ms ease;
}

.refresh-btn:hover {
  transform: translateY(-1px);
  background: rgba(15, 23, 42, 0.35);
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
}

.badge-card {
  background: white;
  border-radius: 1.2rem;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.icon-shell {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid transparent;
}

.icon-shell svg {
  width: 28px;
  height: 28px;
  fill: #0f172a;
}

.product {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
}

h3 {
  margin: 0;
  font-size: 1.15rem;
  color: #0f172a;
}

.meta {
  color: #475467;
  min-height: 3rem;
}

.chip {
  align-self: flex-start;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 0.8rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .flyweight-demo {
    padding: 2rem 1rem 3rem;
  }

  .stats-panel {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
}
</style>
