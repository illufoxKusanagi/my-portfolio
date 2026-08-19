<template>
  <div
    class="fixed bottom-0 left-0 right-0 z-[99] flex items-center gap-3 pointer-events-none select-none"
    role="progressbar"
    :aria-valuenow="pct"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Page scroll progress"
  >
    <!-- Track — hairline, full-width -->
    <div class="flex-1 h-1 bg-primary-700/15 dark:bg-white/8 overflow-hidden">
      <div
        class="h-full bg-primary-700 dark:bg-primary-500 progress-fill"
        :style="{ width: `${pct}%` }"
      />
    </div>

    <!-- Percentage label — Oxanium, matches pagination pill -->
    <span
      class="font-tech text-[10px] font-semibold tracking-widest text-primary-700/70 dark:text-primary-400/80 pr-6"
      aria-hidden="true"
    >
      {{ String(pct).padStart(3, "\u00A0") }}%
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useScrollProgress } from "@/composables/useScrollProgress";

const { progress } = useScrollProgress();
const pct = computed(() => Math.round(progress.value * 100));
</script>

<style scoped>
.progress-fill {
  transition: width 0.1s linear;
  will-change: width;
}
</style>
