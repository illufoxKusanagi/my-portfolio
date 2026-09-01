<template>
  <section
    id="leadership"
    class="relative w-full min-h-screen md:h-screen bg-white dark:bg-gray-900 transition-colors duration-500 overflow-y-auto md:overflow-hidden font-sans select-none flex flex-col lg:flex-row"
  >
    <!-- Left Sidebar (Tertiary 100 / 900 background, visible on large screens) -->
    <div
      class="hidden lg:flex w-[140px] xl:w-[160px] h-full bg-tertiary-100 dark:bg-tertiary-900 transition-colors duration-500 flex-col items-center justify-end pb-10 gap-10 z-10 shrink-0"
    >
      <!-- Rotated Labels Group -->
      <div class="flex flex-col items-center gap-6">
        <!-- Classification (vertical text) -->
        <span
          class="text-[26px] xl:text-[30px] font-tech text-foreground/60 dark:text-white/60 uppercase select-none cursor-default transition-colors tracking-wider"
          style="writing-mode: vertical-rl; transform: rotate(180deg)"
        >
          ACTIVITIES
        </span>

        <!-- Separator dot -->
        <div
          class="w-[8px] h-[8px] rounded-full bg-tertiary-600 dark:bg-tertiary-400"
        />

        <!-- Rotated vertical title -->
        <span
          class="text-h2 text-foreground dark:text-white select-none cursor-default font-bold transition-colors"
          style="writing-mode: vertical-rl; transform: rotate(180deg)"
        >
          {{ $t("leadership.title") }}
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
    <div
      class="flex-1 min-w-0 min-h-full flex flex-col justify-between gap-6 pt-16 sm:pt-20 pb-8 px-4 sm:px-8 md:px-12 z-10 overflow-y-auto"
    >
      <!-- Top Header Block -->
      <div class="flex items-start gap-3 sm:gap-4 shrink-0">
        <!-- Left Tertiary Accent Bar -->
        <div
          class="w-2 sm:w-2.5 h-10 sm:h-14 md:h-16 bg-tertiary-600 dark:bg-tertiary-400 mt-1 shrink-0"
        />

        <div class="space-y-0.5 sm:space-y-1">
          <h2
            class="font-sans font-bold text-2xl sm:text-4xl md:text-5xl text-foreground dark:text-white transition-colors tracking-tight leading-none uppercase"
          >
            {{ $t("leadership.title") }}
          </h2>
          <p
            class="font-tech text-xs sm:text-sm md:text-base text-tertiary-700 dark:text-tertiary-400 transition-colors mt-1 font-light uppercase tracking-widest"
          >
            {{ $t("leadership.subtitle") }}
          </p>
        </div>
      </div>

      <!-- Content Grid: 3 Clean Activity Cards -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-auto py-2"
      >
        <article
          v-for="(item, index) in LEADERSHIP_DATA"
          :key="item.id"
          class="p-6 sm:p-7 rounded-[16px] bg-tertiary-50 dark:bg-tertiary-950 border border-tertiary-200 dark:border-tertiary-800 shadow-xl transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
        >
          <div>
            <!-- Header: Category & Period -->
            <div
              class="flex items-center justify-between gap-3 pb-3 border-b border-tertiary-200/80 dark:border-tertiary-800/80"
            >
              <span
                class="font-tech text-xs text-tertiary-700 dark:text-tertiary-400 font-extrabold uppercase tracking-widest"
              >
                0{{ index + 1 }} //
                {{
                  $te(`leadership.items.${item.id}.type`)
                    ? $t(`leadership.items.${item.id}.type`)
                    : item.type
                }}
              </span>

              <div
                class="px-3 py-1 rounded-[4px] border border-tertiary-300 dark:border-tertiary-700 bg-tertiary-100 dark:bg-tertiary-900 font-tech text-xs font-semibold text-tertiary-800 dark:text-tertiary-200 shrink-0"
              >
                {{
                  $te(`leadership.items.${item.id}.period`)
                    ? $t(`leadership.items.${item.id}.period`)
                    : item.period
                }}
              </div>
            </div>

            <!-- Role & Organization -->
            <div class="pt-4 pb-2">
              <h3
                class="text-lg sm:text-xl font-bold font-sans uppercase text-foreground dark:text-white leading-snug"
              >
                {{
                  $te(`leadership.items.${item.id}.role`)
                    ? $t(`leadership.items.${item.id}.role`)
                    : item.role
                }}
              </h3>
              <p
                class="font-sans text-xs sm:text-sm font-semibold text-tertiary-700/80 dark:text-tertiary-300/80 uppercase tracking-wider mt-1"
              >
                {{ item.organization }} &bull; {{ item.location }}
              </p>
            </div>

            <!-- Contribution Bullets -->
            <ul class="space-y-2.5 pt-3">
              <li
                v-for="(bullet, bIdx) in getBullets(item)"
                :key="bIdx"
                class="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 dark:text-white/80 leading-relaxed font-sans"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-tertiary-600 dark:bg-tertiary-400 shrink-0 mt-1.5"
                />
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <!-- Bottom Spacer to maintain layout balance with sibling sections -->
      <div class="h-2 shrink-0" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { LEADERSHIP_DATA, type OrganizationItem } from "./leadershipData";

const { t, te } = useI18n();

const getBullets = (item: OrganizationItem): string[] => {
  return item.bullets.map((fallback, i) => {
    const key = `leadership.items.${item.id}.bullets.${i}`;
    return te(key) ? t(key) : fallback;
  });
};
</script>
