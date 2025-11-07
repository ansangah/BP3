<template>
  <main class="pattern-page">
    <header class="page-head">
      <RouterLink class="back-link" to="/">← Pattern Hub</RouterLink>
      <p class="eyebrow">Behavioral Pattern</p>
      <h1>Mediator Launch Hub</h1>
      <p class="lead">
        팀 간 메시지를 허브가 대신 관리하면서 라우팅되는 로그를 실시간으로
        보여줍니다.
      </p>
    </header>
    <MediatorDemo />
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import MediatorDemo from "../components/MediatorDemo.vue";
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
  color: #db2777;
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
