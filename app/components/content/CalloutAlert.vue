<template>
  <aside
    class="callout-alert my-6 p-4 rounded-xl border flex items-start gap-3.5 backdrop-blur-sm transition-colors"
    :class="variantClasses"
  >
    <!-- Icon Indicator -->
    <div class="mt-0.5 text-base font-bold select-none shrink-0">
      <span v-if="type === 'tip'">⚡</span>
      <span v-else-if="type === 'warning'">⚠️</span>
      <span v-else>💡</span>
    </div>

    <!-- Callout Text Body -->
    <div
      class="callout-body font-sans text-sm sm:text-base leading-relaxed text-foreground/90 dark:text-white/90"
    >
      <slot />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    type?: "tip" | "info" | "warning";
  }>(),
  {
    type: "info",
  },
);

const variantClasses = computed(() => {
  switch (props.type) {
    case "tip":
      return "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200";
    case "warning":
      return "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200";
    case "info":
    default:
      return "bg-primary-500/10 border-primary-500/30 text-primary-900 dark:text-primary-200";
  }
});
</script>

<style scoped>
.callout-body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
