<template>
  <main class="pattern-page">
    <header class="page-head">
      <RouterLink class="back-link" to="/">← Pattern Hub</RouterLink>
      <p class="eyebrow">Structural Pattern</p>
      <h1>Flyweight Icon Cache</h1>
      <p class="lead">
        아이콘 SVG는 캐시에 공유해 두고, 배지별 색상/텍스트만 외적 상태로
        전달하는 구조입니다.
      </p>
    </header>
    <FlyweightDemo />
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import FlyweightDemo from "../components/FlyweightDemo.vue";
</script>

<style scoped>
.pattern-page {
  min-height: 100vh;
  padding: 2rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.back-link {
  color: #0ea5e9;
  font-weight: 600;
  text-decoration: none;
}

.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
  font-size: 0.85rem;
}

.lead {
  color: #475467;
  max-width: 720px;
}
</style>
