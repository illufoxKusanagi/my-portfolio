<template>
  <div
    class="w-full h-full min-w-0 shrink-0 bg-primary-200 dark:bg-primary-950 transition-colors duration-500 border border-primary-300 dark:border-primary-700 rounded-[16px] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
  >
    <!-- 1. Top Strip on Mobile / Right Panel on Desktop (Order: 1 on Mobile, 3 on Desktop) -->
    <div
      class="order-1 md:order-3 w-full md:w-12 h-8 sm:h-10 md:h-full bg-primary-700 dark:bg-primary-700 transition-colors duration-500 flex flex-row md:flex-col items-center justify-between px-4 py-1.5 md:py-10 md:px-0 shrink-0 z-20"
    >
      <!-- Horizontal Text on Mobile / Rotated Vertical Text on Desktop -->
      <div
        class="strip-label font-sans font-bold text-xs sm:text-sm md:text-[20px] md:leading-[28px] text-white transition-colors tracking-wider uppercase"
      >
        {{ itemSideTag }}
      </div>

      <!-- SVG Icon (Figma Node 22:176) -->
      <img
        src="~/assets/images/side_section_icon.svg"
        alt="side icon"
        class="w-5 h-2 md:w-[28px] md:h-[8px]"
      />
    </div>

    <!-- 2. Middle Visual on Mobile / Center Panel on Desktop (Order: 2 on Mobile, 2 on Desktop) -->
    <div
      class="order-2 md:order-2 w-full md:w-11/32 h-42 md:h-full bg-primary-500 transition-colors duration-500 border-b md:border-b-0 md:border-l md:border-r border-primary-600 dark:border-primary-600 p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center relative overflow-hidden shrink-0"
    >
      <!-- Center Downloaded Figma Image -->
      <div
        class="w-24 h-24 sm:w-32 sm:h-32 md:w-[280px] md:h-[280px] flex items-center justify-center relative z-10"
      >
        <img
          :src="item.imageUrl"
          :alt="item.title"
          class="max-w-full max-h-full object-contain drop-shadow-2xl"
        />
      </div>
    </div>

    <!-- 3. Bottom Content on Mobile / Left Panel on Desktop (Order: 3 on Mobile, 1 on Desktop) -->
    <div
      class="order-3 md:order-1 w-full md:w-5/8 flex-1 md:h-full p-3 sm:p-5 md:p-10 flex flex-col justify-between relative z-10 overflow-y-auto space-y-2 sm:space-y-3 md:space-y-0"
    >
      <!-- Category Header & Sub-description (hidden on mobile — already shown in top strip + section title) -->
      <div class="hidden md:block space-y-2 sm:space-y-3 md:space-y-4">
        <h2
          class="font-sans font-bold text-xl sm:text-2xl md:text-[30px] leading-tight text-foreground dark:text-white transition-colors tracking-tight uppercase"
        >
          {{
            $te(`tech.${item.category.toLowerCase().replace(/[^a-z]/g, "")}`)
              ? $t(`tech.${item.category.toLowerCase().replace(/[^a-z]/g, "")}`)
              : item.category
          }}
        </h2>

        <!-- Sub-description Tag Box (Figma Node 22:192 & 22:197) -->
        <div class="flex items-center gap-2.5 sm:gap-3">
          <div
            class="w-1 h-10 sm:h-12 md:h-16 bg-primary-700 rounded-full"
          ></div>
          <div class="space-y-0.5 sm:space-y-1">
            <p
              class="font-tech text-[11px] sm:text-xs text-primary-500 font-light max-w-[220px] leading-snug"
            >
              {{
                item.category.toLowerCase().includes("framework")
                  ? $t("tech.frameworksSub")
                  : item.category.toLowerCase().includes("tool")
                    ? $t("tech.toolsSub")
                    : $t("tech.languagesSub")
              }}
            </p>
            <img
              src="~/assets/images/desc_sub_tag.svg"
              alt="sub tag graphic"
              class="w-[60px] sm:w-[80px] h-[10px] sm:h-[12px]"
            />
          </div>
        </div>
      </div>

      <!-- Item Content Block -->
      <div class="space-y-1 sm:space-y-2">
        <!-- Index Label (01 / 04) -->
        <span
          class="font-tech font-extrabold text-xs sm:text-[14px] text-primary-600 block"
        >
          {{ item.index }}
        </span>

        <!-- Item Title (React.Js / Git / C++) -->
        <h3
          class="font-sans font-bold text-lg sm:text-xl md:text-[24px] leading-snug md:leading-[32px] text-foreground dark:text-white transition-colors"
        >
          {{ itemTitle }}
        </h3>

        <!-- Description Body (608px max-width) -->
        <p
          class="font-sans font-medium text-xs sm:text-sm md:text-[16px] leading-relaxed text-foreground/80 dark:text-white/90 transition-colors max-w-[608px]"
        >
          {{ itemDesc }}
        </p>
      </div>

      <!-- Footer: Experience & Proficiency -->
      <div
        class="space-y-1 sm:space-y-2 pt-2 border-t border-primary-300/40 dark:border-primary-700/40 md:border-0 md:pt-0"
      >
        <div class="flex flex-wrap items-center gap-2 sm:gap-3">
          <span
            class="font-tech text-xs sm:text-[14px] text-primary-500 font-light block uppercase"
          >
            {{ $t("tech.experienceLabel") }}: {{ item.experienceYears }}
          </span>
          <span
            class="hidden sm:inline font-tech text-[14px] text-primary-500 font-light"
            >|</span
          >
          <span
            class="font-tech text-xs sm:text-[14px] text-primary-500 font-light block uppercase"
          >
            {{ $t("tech.proficiency") }}:
            {{
              $te(`tech.${item.proficiency.toLowerCase()}`)
                ? $t(`tech.${item.proficiency.toLowerCase()}`)
                : item.proficiency
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { TechCardData } from "./techData";

const props = defineProps<{
  item: TechCardData;
}>();

const { t, te, locale } = useI18n();

const itemTitle = computed(() => {
  const k = `techStack.items.${props.item.id}.title`;
  return te(k) ? t(k) : props.item.title;
});

const itemDesc = computed(() => {
  const k = `techStack.items.${props.item.id}.description`;
  return te(k) ? t(k) : props.item.description;
});

const itemBadge = computed(() => {
  const k = `techStack.items.${props.item.id}.badgeText`;
  return te(k) ? t(k) : props.item.badgeText;
});

const itemSideTag = computed(() => {
  const k = `techStack.items.${props.item.id}.sideTag`;
  return te(k) ? t(k) : props.item.sideTag;
});
</script>

<style scoped>
@media (min-width: 768px) {
  .strip-label {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
}
</style>
