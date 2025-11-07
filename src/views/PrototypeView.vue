<template>
  <main class="pattern-page">
    <header class="page-head">
      <RouterLink class="back-link" to="/">← Pattern Hub</RouterLink>
      <p class="eyebrow">Creational Pattern</p>
      <h1>Prototype Playground</h1>
      <p class="lead">
        기본 브리프를 프로토타입으로 등록해 두고, 필요한 속성만 덮어써서 빠르게
        새로운 버전을 만드는 과정을 시각화했습니다.
      </p>
    </header>
    <PrototypeDemo />
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import PrototypeDemo from "../components/PrototypeDemo.vue";
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
  color: #4f46e5;
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
