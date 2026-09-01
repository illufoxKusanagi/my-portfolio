<template>
  <div
    class="w-full h-full min-w-0 shrink-0 bg-purple-50 dark:bg-secondary-900 transition-colors duration-500 border border-purple-200 dark:border-tertiary-700 rounded-[16px] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
  >
    <!-- 1. Top Strip on Mobile / Right Panel on Desktop (Order: 1 on Mobile, 3 on Desktop) -->
    <div
      class="order-1 md:order-3 w-full md:w-12 h-8 sm:h-9 md:h-full bg-purple-200 dark:bg-secondary-600 transition-colors duration-500 flex flex-row md:flex-col items-center justify-between px-4 py-1.5 md:py-10 md:px-0 shrink-0 z-20"
    >
      <!-- Horizontal on Mobile / Vertical on Desktop -->
      <div
        class="strip-label font-sans font-bold text-xs sm:text-sm md:text-[18px] md:leading-[24px] text-foreground dark:text-white transition-colors tracking-wider uppercase"
      >
        {{ $t("projects.projectLabel") }}
      </div>

      <!-- SVG Icon (Figma Node 22:176) -->
      <img
        src="~/assets/images/side_section_icon.svg"
        alt="side icon"
        class="w-5 h-2 md:w-[28px] md:h-[8px]"
      />
    </div>

    <!-- 2. Middle Image Preview (Order: 2 on Mobile, 1 on Desktop) -->
    <div
      class="order-2 md:order-1 w-full md:w-1/2 min-w-0 h-28 sm:h-36 md:h-full relative overflow-hidden group shrink-0 border-b md:border-b-0 md:border-r border-purple-200 dark:border-tertiary-700"
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

    <!-- 3. Bottom Content & Specs (Order: 3 on Mobile, 2 on Desktop) -->
    <div
      class="order-3 md:order-2 w-full md:w-1/2 min-w-0 flex-1 md:h-full p-3 sm:p-5 md:p-10 flex flex-col justify-between relative z-10 overflow-y-auto space-y-2 sm:space-y-3 md:space-y-0"
    >
      <div class="space-y-2 sm:space-y-3 md:space-y-4">
        <h3
          class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-foreground dark:text-white transition-colors tracking-tight uppercase"
        >
          {{
            $te(`projects.items.${project.id}.title`)
              ? $t(`projects.items.${project.id}.title`)
              : project.title
          }}
        </h3>

        <!-- Sub-description Tag Box -->
        <div class="flex items-center gap-2.5 sm:gap-3">
          <div
            class="w-1 h-8 sm:h-10 md:h-12 bg-purple-600 dark:bg-tertiary-600 rounded-full"
          ></div>
          <div class="space-y-0.5 sm:space-y-1">
            <p
              class="font-tech text-[11px] sm:text-xs text-purple-700 dark:text-tertiary-400 font-light max-w-[260px] leading-snug uppercase tracking-widest"
            >
              {{
                $te(`projects.items.${project.id}.subtitle`)
                  ? $t(`projects.items.${project.id}.subtitle`)
                  : project.subtitle
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Description -->
      <p
        class="text-foreground/80 dark:text-white/80 leading-relaxed text-xs sm:text-sm md:text-base max-h-[120px] sm:max-h-[160px] md:max-h-[160px] overflow-y-auto pr-2 custom-scrollbar transition-colors"
      >
        {{
          $te(`projects.items.${project.id}.description`)
            ? $t(`projects.items.${project.id}.description`)
            : project.description
        }}
      </p>

      <!-- Footer / Tech Stack & Links -->
      <div
        class="flex flex-col gap-3 sm:gap-4 md:gap-5 pt-2 border-t border-purple-200/60 dark:border-secondary-700/40 md:border-0 md:pt-0"
      >
        <!-- Tech Stack -->
        <div>
          <span
            class="font-tech text-xs sm:text-[14px] text-purple-600 dark:text-tertiary-400 font-light block uppercase tracking-widest mb-2"
          >
            TECH-STACK
          </span>
          <div class="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div
              v-for="(tech, i) in project.techIcons"
              :key="i"
              class="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-purple-100 dark:bg-primary-500 border border-purple-300 dark:border-tertiary-700 p-1.5 shadow-sm transition-colors duration-300"
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
          class="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 sm:pt-4 border-t border-purple-200 dark:border-secondary-700"
        >
          <a
            v-if="project.demoUrl"
            :href="project.demoUrl"
            target="_blank"
            class="px-4 sm:px-5 py-1.5 sm:py-2 bg-purple-600 dark:bg-tertiary-700 text-white font-semibold rounded-[8px] text-xs sm:text-sm hover:bg-purple-700 dark:hover:bg-tertiary-600 transition-colors shadow-md"
          >
            {{
              $te(`projects.items.${project.id}.demoLabel`)
                ? $t(`projects.items.${project.id}.demoLabel`)
                : project.demoLabel || $t("projects.viewDemo")
            }}
          </a>
          <a
            v-if="project.repoUrl && project.repoUrl !== '-'"
            :href="project.repoUrl"
            target="_blank"
            class="px-4 sm:px-5 py-1.5 sm:py-2 border border-purple-400 dark:border-tertiary-600 text-foreground dark:text-white font-semibold rounded-[8px] text-xs sm:text-sm hover:bg-purple-100 dark:hover:bg-tertiary-900/50 transition-colors"
          >
            {{
              $te(`projects.items.${project.id}.repoLabel`)
                ? $t(`projects.items.${project.id}.repoLabel`)
                : project.repoLabel || $t("projects.viewRepo")
            }}
          </a>
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
@media (min-width: 768px) {
  .strip-label {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
}
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
  background: var(--color-purple-400);
  border-radius: 4px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-tertiary-700);
}
</style>
