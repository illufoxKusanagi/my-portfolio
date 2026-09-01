<template>
  <div
    class="max-w-7xl w-full mx-auto flex items-center justify-between text-xs font-tech text-foreground/70 dark:text-white/70 transition-colors z-50 pt-1 select-none"
  >
    <!-- Left Hint Text -->
    <span class="hidden sm:inline-block tracking-wider uppercase">
      <slot name="hint">
        {{ hintText || $t("common.pagination.hint") }}
      </slot>
    </span>

    <!-- Interactive Arrow Pagination Controls -->
    <div
      class="flex items-center gap-4 mx-auto sm:mx-0 border px-4 py-2 rounded-[8px] shadow-lg backdrop-blur"
      :class="variantClasses.container"
    >
      <!-- Prev Button -->
      <button
        type="button"
        :disabled="currentIndex === 0 || isAnimating"
        :class="[
          'w-8 h-8 rounded-[6px] border flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed',
          variantClasses.button,
        ]"
        :aria-label="$t('common.pagination.prev')"
        @click="$emit('prev')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 27"
          class="w-3 h-3 text-current transition-colors"
        >
          <path
            fill-rule="evenodd"
            fill="currentColor"
            d="M14.142,0.127 L17.753,3.737 L7.963,13.527 L17.753,23.318 L14.142,26.928 L0.743,13.527 L14.142,0.127 Z"
          />
        </svg>
      </button>

      <!-- Index Display -->
      <span
        class="font-tech text-sm font-bold tracking-wider px-2"
        :class="variantClasses.index"
      >
        {{ formattedIndex }} / {{ formattedTotal }}
      </span>

      <!-- Next Button -->
      <button
        type="button"
        :disabled="currentIndex >= totalItems - 1 || isAnimating"
        :class="[
          'w-8 h-8 rounded-[6px] border flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed',
          variantClasses.button,
        ]"
        :aria-label="$t('common.pagination.next')"
        @click="$emit('next')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 27"
          class="w-3 h-3 text-current transition-colors rotate-180"
        >
          <path
            fill-rule="evenodd"
            fill="currentColor"
            d="M14.142,0.127 L17.753,3.737 L7.963,13.527 L17.753,23.318 L14.142,26.928 L0.743,13.527 L14.142,0.127 Z"
          />
        </svg>
      </button>
    </div>

    <!-- Right Summary Label -->
    <span class="hidden sm:inline-block tracking-widest uppercase">
      <slot name="summary">
        {{ summaryText }}
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  currentIndex: number;
  totalItems: number;
  isAnimating?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "purple";
  hintText?: string;
  summaryText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isAnimating: false,
  variant: "primary",
  hintText: "",
  summaryText: "",
});

defineEmits<{
  (e: "prev"): void;
  (e: "next"): void;
}>();

const formattedIndex = computed(() => {
  const num = props.currentIndex + 1;
  return num < 10 ? `0${num}` : `${num}`;
});

const formattedTotal = computed(() => {
  const num = props.totalItems;
  return num < 10 ? `0${num}` : `${num}`;
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "secondary":
      return {
        container:
          "border-secondary-400 dark:border-secondary-700 bg-secondary-100/80 dark:bg-secondary-950/90",
        button:
          "border-secondary-400/50 dark:border-secondary-600/50 hover:bg-secondary-700 hover:border-secondary-500 hover:text-white text-secondary-800 dark:text-white",
        index: "text-secondary-700 dark:text-secondary-400",
      };
    case "tertiary":
      return {
        container:
          "border-tertiary-400 dark:border-tertiary-700 bg-tertiary-100/80 dark:bg-tertiary-950/90",
        button:
          "border-tertiary-400/50 dark:border-tertiary-600/50 hover:bg-tertiary-700 hover:border-tertiary-500 hover:text-white text-tertiary-800 dark:text-white",
        index: "text-tertiary-700 dark:text-tertiary-400",
      };
    case "purple":
      return {
        container:
          "border-purple-300 dark:border-tertiary-700 bg-purple-100/80 dark:bg-secondary-900/90",
        button:
          "border-purple-400/50 dark:border-tertiary-600/50 hover:bg-purple-600 dark:hover:bg-tertiary-700 hover:border-purple-500 dark:hover:border-tertiary-500 hover:text-white text-purple-900 dark:text-white",
        index: "text-purple-700 dark:text-tertiary-400",
      };
    case "primary":
    default:
      return {
        container:
          "border-primary-400 dark:border-primary-700 bg-primary-100/80 dark:bg-primary-950/90",
        button:
          "border-primary-400/50 dark:border-primary-600/50 hover:bg-primary-700 hover:border-primary-500 hover:text-white text-primary-800 dark:text-white",
        index: "text-primary-700 dark:text-primary-400",
      };
  }
});
</script>
