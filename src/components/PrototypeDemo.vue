<template>
  <section class="prototype-demo">
    <header class="demo-header">
      <p class="badge">Prototype Pattern</p>
      <h1>Creative Brief Lab</h1>
      <p class="lead">
        Pick a base brief, clone it instantly, and tweak only what changes. The
        rest is copied from the original prototype.
      </p>
    </header>

    <div class="prototype-grid">
      <article
        v-for="(brief, index) in baseBriefs"
        :key="brief.id"
        class="prototype-card"
        :class="{ 'is-selected': index === selectedPrototypeIndex }"
      >
        <div class="card-head">
          <h3>{{ brief.name }}</h3>
          <span class="tone">{{ brief.tone }}</span>
        </div>
        <p class="theme">{{ brief.theme }}</p>
        <p class="label">Palette</p>
        <div class="palette">
          <span
            v-for="color in brief.palette"
            :key="color"
            class="swatch"
            :style="{ backgroundColor: color }"
          ></span>
        </div>
        <p class="label">Keywords</p>
        <ul class="keywords">
          <li v-for="keyword in brief.keywords" :key="keyword">
            {{ keyword }}
          </li>
        </ul>
        <button
          type="button"
          class="ghost-btn"
          @click="selectedPrototypeIndex = index"
        >
          Use this base
        </button>
      </article>
    </div>

    <form class="clone-form" @submit.prevent="cloneBrief">
      <div>
        <h2>Clone & mutate</h2>
        <p>
          Selected base
          <strong>{{ activeBrief?.name }}</strong>
        </p>
      </div>
      <label>
        New name
        <input v-model="mutationForm.name" placeholder="Aurora onboarding v2" />
      </label>
      <label>
        Tone
        <input v-model="mutationForm.tone" placeholder="Energetic" />
      </label>
      <label>
        Keywords (comma separated)
        <input
          v-model="mutationForm.keywords"
          placeholder="trust, remote, async"
        />
      </label>
      <label>
        Deliverables (comma separated)
        <input
          v-model="mutationForm.deliverables"
          placeholder="Hero illustration, Social teaser"
        />
      </label>
      <button class="primary-btn" type="submit">Clone prototype</button>
    </form>

    <section v-if="createdBriefs.length" class="clones">
      <h2>Cloned briefs</h2>
      <p class="subtle">
        Each card is a shallow copy of the selected prototype with only the
        overridden fields changed.
      </p>
      <div class="clone-grid">
        <article
          v-for="clone in createdBriefs"
          :key="clone.id"
          class="clone-card"
        >
          <div class="card-head">
            <h3>{{ clone.name }}</h3>
            <span class="tone">{{ clone.tone }}</span>
          </div>
          <p class="theme">{{ clone.theme }}</p>
          <p class="label">Deliverables</p>
          <ul class="deliverables">
            <li v-for="deliverable in clone.deliverables" :key="deliverable">
              {{ deliverable }}
            </li>
          </ul>
          <p class="label">Keywords</p>
          <ul class="keywords">
            <li v-for="keyword in clone.keywords" :key="keyword">
              {{ keyword }}
            </li>
          </ul>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { CreativeBriefSpec, creativeBriefLibrary } from "../patterns/prototype";

const prototypes = creativeBriefLibrary;
const selectedPrototypeIndex = ref(0);
const createdBriefs = ref<CreativeBriefSpec[]>([]);
const mutationForm = reactive({
  name: "",
  tone: "",
  keywords: "",
  deliverables: "",
});

const baseBriefs = computed(() =>
  prototypes.map((prototype) => prototype.snapshot())
);

const activeBrief = computed(
  () => baseBriefs.value[selectedPrototypeIndex.value]
);

const parseList = (value: string) =>
  value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

const cloneBrief = () => {
  const basePrototype = prototypes[selectedPrototypeIndex.value];
  if (!basePrototype) {
    return;
  }

  const overrides: Partial<Omit<CreativeBriefSpec, "id">> = {};
  if (mutationForm.name.trim()) overrides.name = mutationForm.name.trim();
  if (mutationForm.tone.trim()) overrides.tone = mutationForm.tone.trim();
  if (mutationForm.keywords.trim())
    overrides.keywords = parseList(mutationForm.keywords);
  if (mutationForm.deliverables.trim())
    overrides.deliverables = parseList(mutationForm.deliverables);

  const clone = basePrototype.clone(overrides);
  createdBriefs.value = [clone.snapshot(), ...createdBriefs.value];

  Object.assign(mutationForm, {
    name: "",
    tone: "",
    keywords: "",
    deliverables: "",
  });
};
</script>

<style scoped>
.prototype-demo {
  padding: 2.5rem 1.5rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
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
  color: #6366f1;
  background: rgba(99, 102, 241, 0.15);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 0.5rem;
}

.lead {
  color: #475467;
  margin-top: 0.5rem;
}

.prototype-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.prototype-card,
.clone-card {
  border: 1px solid #e4e7ec;
  border-radius: 1rem;
  padding: 1.25rem;
  background: #fff;
  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.prototype-card.is-selected {
  border-color: #6366f1;
  box-shadow: 0 15px 50px rgba(99, 102, 241, 0.15);
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.tone {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6366f1;
  font-weight: 600;
}

.theme {
  color: #475467;
  min-height: 3rem;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #98a2b3;
  margin-top: 0.25rem;
}

.palette {
  display: flex;
  gap: 0.5rem;
}

.swatch {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.keywords,
.deliverables {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.keywords li,
.deliverables li {
  background: #f4f4ff;
  color: #3f3f95;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

.clone-form {
  border: 1px solid #d0d5dd;
  border-radius: 1rem;
  padding: 2rem;
  background: #f9fafb;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.clone-form label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: #344054;
}

.clone-form input {
  border: 1px solid #d0d5dd;
  border-radius: 0.6rem;
  padding: 0.6rem 0.75rem;
  font-size: 0.95rem;
}

.primary-btn {
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 120ms ease;
}

.primary-btn:hover {
  transform: translateY(-1px);
}

.ghost-btn {
  background: transparent;
  border: 1px solid #d0d5dd;
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font-weight: 600;
  color: #475467;
}

.clones {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.subtle {
  color: #475467;
}

.clone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
}

@media (max-width: 640px) {
  .prototype-demo {
    padding: 1.5rem 1rem 3rem;
  }

  .clone-form {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }
}
</style>
