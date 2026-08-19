<template>
  <!-- Main container sized in absolute Figma pixels, scaled cleanly by parent transform -->
  <div class="relative select-none" style="width: 1200px; height: 1120px">
    <!-- Preview image (sharp corners, no rounded corners or shadow to match Figma design) -->
    <div
      class="absolute overflow-hidden bg-card dark:bg-black transition-colors duration-500"
      style="left: 0px; top: 0px; width: 924px; height: 771px"
    >
      <img :src="project.previewImage" class="w-full h-full object-cover" />
    </div>

    <!-- Title (single line, matching Figma textStyle h2 and exact offset coordinates) -->
    <h3 class="absolute text-h2 text-foreground dark:text-white transition-colors" style="left: 258px; top: 597px">
      {{ project.title }}
    </h3>

    <!-- Description (matching Figma textStyle medium-regular and coordinates) -->
    <p
      class="absolute text-medium-regular text-foreground/80 dark:text-white/95 transition-colors leading-[1.6]"
      style="left: 279px; top: 668px; width: 766px"
    >
      {{ project.description }}
    </p>

    <!-- Tech stack bar (matching Figma secondary-900 fill, dimensions, and coordinates) -->
    <div
      class="absolute bg-secondary-100 dark:bg-secondary-900 transition-colors duration-500 rounded-[32px] shadow-xl flex items-center pl-8 pr-4"
      style="left: 95px; top: 980px; width: 980px; height: 82px"
    >
      <span
        class="text-secondary-900 dark:text-white transition-colors font-tech font-extrabold text-[16px] tracking-widest uppercase shrink-0"
      >
        TECH-STACK
      </span>

      <!-- 5 circular indicators matching Figma 1:1 -->
      <div class="flex items-center gap-3 ml-auto">
        <!-- Circle 1: React -->
        <div
          class="w-[64px] h-[64px] rounded-full bg-primary-100 border border-primary-300 dark:border-primary-700 transition-colors flex items-center justify-center shadow-lg shrink-0"
          style="margin-top: 0px"
          title="React"
        >
          <img
            src="/images/react_framework.png"
            class="w-[36px] h-[36px] object-contain"
          />
        </div>

        <!-- Circle 2: Three.js -->
        <div
          class="w-[64px] h-[64px] rounded-full bg-primary-100 border border-primary-300 dark:border-primary-700 transition-colors flex items-center justify-center shadow-lg shrink-0"
          style="margin-top: 4px"
          title="Three.js"
        >
          <img
            src="/images/tech_icon_three.png"
            class="w-[36px] h-[36px] object-contain"
          />
        </div>

        <!-- Circle 3: TypeScript (styled blue square TS icon) -->
        <div
          class="w-[64px] h-[64px] rounded-full bg-primary-100 border border-primary-300 dark:border-primary-700 transition-colors flex items-center justify-center shadow-lg shrink-0"
          style="margin-top: 8px"
          title="TypeScript"
        >
          <div
            class="w-[36px] h-[36px] bg-[#3178C6] text-white font-bold text-[14px] flex items-center justify-center rounded-[4px] select-none"
          >
            TS
          </div>
        </div>

        <!-- Circle 4: Empty -->
        <div
          class="w-[64px] h-[64px] rounded-full bg-primary-100 border border-primary-300 dark:border-primary-700 transition-colors flex items-center justify-center shadow-lg shrink-0"
          style="margin-top: 12px"
        />

        <!-- Circle 5: Empty -->
        <div
          class="w-[64px] h-[64px] rounded-full bg-primary-100 border border-primary-300 dark:border-primary-700 transition-colors flex items-center justify-center shadow-lg shrink-0"
          style="margin-top: 16px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectItem } from "./projectsData";

defineProps<{ project: ProjectItem }>();
</script>
