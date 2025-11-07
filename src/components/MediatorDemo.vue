<template>
  <section class="mediator-demo">
    <header class="demo-header">
      <p class="badge">Mediator Pattern</p>
      <h1>Launch Sync Hub</h1>
      <p class="lead">
        각 팀은 서로 직접 메시지를 주고받지 않고, 미디에이터 허브에 업데이트를
        보내면 허브가 다음 조치를 조율합니다. 버튼을 눌러 팀 시그널을 발송할 수
        있습니다.
      </p>
    </header>

    <div class="channel-grid">
      <article
        v-for="channel in channels"
        :key="channel.id"
        class="channel-card"
        :style="{ borderColor: channel.accent }"
      >
        <header>
          <span class="disc-label" :style="{ color: channel.accent }">
            {{ channel.label }}
          </span>
          <button class="sync-btn" type="button" @click="dispatch(channel.id)">
            Sync
          </button>
        </header>
        <p class="hint">{{ snapshots[channel.id] }}</p>
      </article>
    </div>

    <section class="timeline">
      <header class="timeline-head">
        <div>
          <p class="eyebrow">Mediator feed</p>
          <h2>Routing timeline</h2>
        </div>
        <button class="clear-btn" type="button" @click="clearTimeline">
          로그 비우기
        </button>
      </header>
      <p class="subtle">
        허브는 전달받은 신호를 타임라인에 기록하고, 후속 조치가 필요한 팀에게
        라우팅합니다.
      </p>
      <ul class="timeline-list">
        <li v-for="entry in timeline" :key="entry.id" class="timeline-entry">
          <div class="entry-head">
            <span class="from">{{ entry.from }}</span>
            <time>{{ formatTime(entry.timestamp) }}</time>
          </div>
          <p class="summary">{{ entry.summary }}</p>
          <div class="routes">
            <span
              v-for="target in entry.routedTo"
              :key="target"
              class="route-chip"
            >
              → {{ target }}
            </span>
          </div>
          <p class="nudge">Note · {{ entry.nudge }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  LaunchMediator,
  channelBriefs,
  type Discipline,
  type MediatorLogEntry,
} from "../patterns/mediator";

const mediator = new LaunchMediator();
const channels = channelBriefs;

const timeline = ref<MediatorLogEntry[]>([]);
const snapshots = reactive<Record<Discipline, string>>(
  mediator.getChannelSnapshot()
);

const dispatch = (discipline: Discipline) => {
  const entry = mediator.dispatch(discipline);
  snapshots[discipline] = entry.summary;
  timeline.value = [entry, ...timeline.value].slice(0, 8);
};

const clearTimeline = () => {
  timeline.value = [];
};

const formatTime = (iso: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

if (!timeline.value.length) {
  channels.slice(0, 3).forEach((channel) => dispatch(channel.id));
}
</script>

<style scoped>
.mediator-demo {
  padding: 2.5rem 1.5rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.demo-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #db2777;
  background: rgba(219, 39, 119, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 0.5rem;
}

.lead {
  color: #475467;
  margin-top: 0.5rem;
}

.channel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.channel-card {
  border: 1.5px solid #e4e7ec;
  border-radius: 1.2rem;
  padding: 1.25rem;
  background: white;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.channel-card header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.disc-label {
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.sync-btn {
  border: none;
  background: #0f172a;
  color: white;
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.hint {
  color: #475467;
  font-size: 0.95rem;
  min-height: 3rem;
}

.timeline {
  background: white;
  border-radius: 1.5rem;
  padding: 1.75rem;
  border: 1px solid #e4e7ec;
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  color: #a855f7;
  margin-bottom: 0.25rem;
}

.subtle {
  color: #475467;
}

.clear-btn {
  border: 1px solid #e4e7ec;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  font-weight: 600;
  background: transparent;
  cursor: pointer;
}

.timeline-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-entry {
  border: 1px solid #ede9fe;
  border-radius: 1.1rem;
  padding: 1rem 1.2rem;
  background: #faf5ff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.entry-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b21a8;
}

.summary {
  margin: 0;
  color: #1f2933;
}

.routes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.route-chip {
  background: white;
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  font-size: 0.8rem;
  border: 1px solid rgba(107, 33, 168, 0.2);
}

.nudge {
  color: #475467;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .mediator-demo {
    padding: 2rem 1rem 3rem;
  }

  .timeline-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
