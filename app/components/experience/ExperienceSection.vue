<template>
  <section
    id="experience"
    class="relative w-full h-screen bg-purple-100 dark:bg-purple-800 transition-colors duration-500 overflow-hidden font-sans select-none flex"
  >
    <!-- Left Sidebar (Secondary 700 background) -->
    <div
      class="w-[160px] h-full bg-secondary-100 dark:bg-secondary-700 transition-colors duration-500 flex flex-col items-center justify-end pb-10 gap-10 z-10 shrink-0"
    >
      <!-- Rotated Labels Group -->
      <div class="flex flex-col items-center gap-6">
        <!-- Internship / Contract classification (vertical text) -->
        <span
          class="text-[30px] font-tech text-foreground/60 dark:text-white/60 uppercase select-none cursor-default transition-colors"
          style="writing-mode: vertical-rl; transform: rotate(180deg)"
        >
          {{ $te(`experience.items.${activeItem.id}.type`) ? $t(`experience.items.${activeItem.id}.type`) : activeItem.type }}
        </span>

        <!-- Separator dot -->
        <div
          class="w-[8px] h-[8px] rounded-full bg-primary-700 dark:bg-primary-200"
        />

        <!-- EXPERIENCE rotated vertical title -->
        <span
          class="text-h2 text-foreground dark:text-white select-none cursor-default font-bold transition-colors"
          style="writing-mode: vertical-rl; transform: rotate(180deg)"
        >
          {{ $t("experience.title") }}
        </span>
      </div>

      <!-- Bottom bar decoration from Figma -->
      <div
        class="flex flex-col justify-between w-[52px] h-[8px] opacity-80 shrink-0"
      >
        <div
          class="h-[2px] bg-foreground dark:bg-white transition-colors w-full"
        />
        <div
          class="h-[2px] bg-foreground dark:bg-white transition-colors w-full"
        />
      </div>
    </div>

    <!-- Main Content Area (relative document flow, fills remaining width/height) -->
    <div class="flex-1 h-full flex flex-col justify-between gap-4 p-12 z-10">
      <!-- Top Header Block -->
      <div class="flex items-start gap-4">
        <!-- Left Tertiary Accent Bar -->
        <div class="w-2.5 h-14 md:h-16 bg-tertiary-700 mt-1 shrink-0" />

        <div class="space-y-1">
          <h2
            class="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-foreground dark:text-white transition-colors tracking-tight leading-none uppercase"
          >
            {{ $t("experience.title") }}
          </h2>
          <p
            class="font-tech text-sm sm:text-base text-primary-700 dark:text-primary-200 transition-colors mt-1 font-light uppercase tracking-widest"
          >
            {{ $t("experience.subtitle") }}
          </p>
        </div>
      </div>

      <!-- Middle Info Block (period + company/role) -->
      <div class="flex flex-col gap-1">
        <span
          class="text-desc-regular text-primary-700 dark:text-primary-400 transition-colors font-semibold tracking-wider"
        >
          {{ $te(`experience.items.${activeItem.id}.period`) ? $t(`experience.items.${activeItem.id}.period`) : activeItem.period }}
        </span>
        <h3
          class="text-h3 text-foreground dark:text-white uppercase font-bold tracking-tight transition-colors"
        >
          {{ activeItem.company }} — {{ $te(`experience.items.${activeItem.id}.role`) ? $t(`experience.items.${activeItem.id}.role`) : activeItem.role }}
        </h3>
      </div>

      <!-- Bottom Experience Card Component (fills remaining space) -->
      <div class="w-full flex-1">
        <ExperienceCard
          :activeItem="activeItem"
          :activeIndex="activeIndex"
          :items="EXPERIENCE_DATA"
          @change-active="setActiveIndex"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { EXPERIENCE_DATA } from "./experienceData";
import ExperienceCard from "./ExperienceCard.vue";

const activeIndex = ref(0);
const activeItem = computed(() => {
  return EXPERIENCE_DATA[activeIndex.value] || EXPERIENCE_DATA[0]!;
});

const setActiveIndex = (index: number) => {
  activeIndex.value = index;
};
</script>

<style scoped>
/* Scoped overrides if needed */
</style>
