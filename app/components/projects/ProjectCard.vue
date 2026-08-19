<template>
  <div
    class="w-full h-full min-w-0 shrink-0 bg-tertiary-100 dark:bg-secondary-900 transition-colors duration-500 border border-tertiary-300 dark:border-tertiary-700 rounded-[16px] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
  >
    <!-- Image Section -->
    <div
      class="w-full md:w-1/2 min-w-0 h-64 md:h-full relative overflow-hidden group shrink-0"
    >
      <img
        :src="project.previewImage"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        :alt="project.title"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-transparent to-secondary-900/40 dark:to-secondary-950/60 pointer-events-none"
      ></div>
    </div>

    <!-- Content Section -->
    <div class="w-full md:w-1/2 min-w-0 flex flex-row h-full">
      <!-- Main Content -->
      <div
        class="flex-1 p-8 md:p-10 flex flex-col justify-between relative z-10"
      >
        <div class="space-y-4">
          <h3
            class="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground dark:text-white transition-colors tracking-tight uppercase"
          >
            {{ $te(`projects.items.${project.id}.title`) ? $t(`projects.items.${project.id}.title`) : project.title }}
          </h3>

          <!-- Sub-description Tag Box (matching TechCard style) -->
          <div class="flex items-center gap-3">
            <div class="w-1 h-12 bg-tertiary-600 rounded-full"></div>
            <div class="space-y-1">
              <p
                class="font-tech text-xs text-tertiary-500 dark:text-tertiary-400 font-light max-w-[260px] leading-snug uppercase tracking-widest"
              >
                {{ $te(`projects.items.${project.id}.subtitle`) ? $t(`projects.items.${project.id}.subtitle`) : project.subtitle }}
              </p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <p
          class="text-foreground/80 dark:text-white/80 leading-relaxed text-sm md:text-base max-h-[160px] overflow-y-auto pr-2 custom-scrollbar transition-colors"
        >
          {{ $te(`projects.items.${project.id}.description`) ? $t(`projects.items.${project.id}.description`) : project.description }}
        </p>

        <!-- Footer / Tech Stack & Links -->
        <div class="flex flex-col gap-5">
          <!-- Tech Stack -->
          <div>
            <span
              class="font-tech text-[14px] text-tertiary-500 dark:text-tertiary-400 font-light block uppercase tracking-widest mb-3"
            >
              TECH-STACK
            </span>
            <div class="flex flex-wrap items-center gap-2.5">
              <div
                v-for="(tech, i) in project.techIcons"
                :key="i"
                class="flex items-center justify-center w-10 h-10 rounded-full bg-tertiary-200 dark:bg-secondary-800 border border-tertiary-300 dark:border-tertiary-700 p-2 shadow-sm transition-colors duration-300"
                :title="tech.name"
              >
                <img
                  v-if="tech.iconUrl"
                  :src="tech.iconUrl"
                  class="w-full h-full object-contain"
                  :alt="tech.name"
                />
                <span
                  v-else
                  class="text-[9px] font-bold text-foreground/70 dark:text-white/70"
                  >{{ tech.name.substring(0, 2).toUpperCase() }}</span
                >
              </div>
            </div>
          </div>

          <!-- Links -->
          <div
            class="flex items-center gap-3 pt-4 border-t border-tertiary-200 dark:border-secondary-700"
          >
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              class="px-5 py-2 bg-tertiary-700 text-white font-semibold rounded-full text-xs md:text-sm hover:bg-tertiary-600 transition-colors shadow-md"
            >
              {{ $te(`projects.items.${project.id}.demoLabel`) ? $t(`projects.items.${project.id}.demoLabel`) : (project.demoLabel || $t('projects.viewDemo')) }}
            </a>
            <a
              v-if="project.repoUrl && project.repoUrl !== '-'"
              :href="project.repoUrl"
              target="_blank"
              class="px-5 py-2 border border-tertiary-400 dark:border-tertiary-600 text-foreground dark:text-white font-semibold rounded-full text-xs md:text-sm hover:bg-tertiary-100 dark:hover:bg-tertiary-900/50 transition-colors"
            >
              {{ $te(`projects.items.${project.id}.repoLabel`) ? $t(`projects.items.${project.id}.repoLabel`) : (project.repoLabel || $t('projects.viewRepo')) }}
            </a>
          </div>
        </div>
      </div>

      <!-- Right Accent Strip (matching TechCard side panel) -->
      <div
        class="w-12 h-full bg-tertiary-300 dark:bg-tertiary-800 transition-colors duration-500 flex flex-col items-center justify-between py-10 shrink-0"
      >
        <!-- Rotated Vertical Text -->
        <div
          class="writing-vertical font-sans font-bold text-[18px] leading-[24px] text-foreground/60 dark:text-white/60 transition-colors tracking-wide uppercase rotate-180"
        >
          {{ $t('projects.projectLabel') }}
        </div>

        <!-- Decorative dot cluster -->
        <div class="flex flex-col items-center gap-2">
          <div
            class="w-2 h-2 rounded-full bg-tertiary-400 dark:bg-tertiary-600"
          ></div>
          <div
            class="w-1.5 h-1.5 rounded-full bg-tertiary-300 dark:bg-tertiary-700"
          ></div>
          <div
            class="w-1 h-1 rounded-full bg-tertiary-300 dark:bg-tertiary-700"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectItem } from "./projectsData";

defineProps<{ project: ProjectItem }>();
</script>

<style scoped>
.writing-vertical {
  writing-mode: vertical-rl;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-tertiary-400);
  border-radius: 4px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-tertiary-700);
}
</style>
