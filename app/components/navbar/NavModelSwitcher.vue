<template>
  <div class="flex items-center gap-1">
    <button
      v-for="mode in MODES"
      :key="mode.value"
      class="mode-btn"
      :class="{ 'mode-btn--active': activeMode === mode.value }"
      :aria-label="`Switch to ${mode.label} mode`"
      :aria-pressed="activeMode === mode.value"
      @click="activeMode = mode.value"
    >
      {{ mode.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type RenderMode = "3D" | "2D";

const MODES: { value: RenderMode; label: string }[] = [
  { value: "3D", label: "3D" },
  { value: "2D", label: "2D" },
];

const activeMode = defineModel<RenderMode>({ default: "3D" });
</script>

<style scoped>
.mode-btn {
  height: 28px;
  padding: 0 14px;
  font-family: var(--font-tech);
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.0075em;
  color: var(--color-foreground);
  background: var(--color-muted);
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.mode-btn:first-child {
  border-radius: 6px 0 0 6px;
}

.mode-btn:last-child {
  border-radius: 0 6px 6px 0;
}

.mode-btn--active {
  background: var(--color-primary-700);
  color: white;
}
</style>
