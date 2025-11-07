<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    RouterView,
  },
});
</script>

<style>
:root {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background: #edf1f5;
  color: #0f172a;
}

#app {
  min-height: 100vh;
}

a {
  text-decoration: none;
}
</style>
