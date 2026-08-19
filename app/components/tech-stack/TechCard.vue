<template>
  <div
    class="w-full h-full shrink-0 bg-primary-200 dark:bg-secondary-900 transition-colors duration-500 border border-primary-300 dark:border-primary-700 rounded-[16px] overflow-hidden flex flex-row shadow-2xl relative"
  >
    <!-- 1. Left Panel: Desc section (688px width) -->
    <div
      class="w-5/8 h-full p-10 flex flex-col justify-between relative z-10 shrink-0"
    >
      <!-- Category Header & Sub-description -->
      <div class="space-y-4">
        <h2
          class="font-sans font-bold text-[30px] leading-tight text-foreground dark:text-white transition-colors tracking-tight uppercase"
        >
          {{ $te(`tech.${item.category.toLowerCase().replace(/[^a-z]/g, '')}`) ? $t(`tech.${item.category.toLowerCase().replace(/[^a-z]/g, '')}`) : item.category }}
        </h2>

        <!-- Sub-description Tag Box (Figma Node 22:192 & 22:197) -->
        <div class="flex items-center gap-3">
          <div class="w-1 h-16 bg-primary-700 rounded-full"></div>
          <div class="space-y-1">
            <p
              class="font-tech text-xs text-primary-500 font-light max-w-[220px] leading-snug"
            >
              {{ item.category.toLowerCase().includes('framework') ? $t('tech.frameworksSub') : (item.category.toLowerCase().includes('tool') ? $t('tech.toolsSub') : $t('tech.languagesSub')) }}
            </p>
            <img
              src="~/assets/images/desc_sub_tag.svg"
              alt="sub tag graphic"
              class="w-[80px] h-[12px]"
            />
          </div>
        </div>
      </div>

      <!-- Item Content Block -->
      <div class="space-y-2">
        <!-- Index Label (01 / 04) -->
        <span
          class="font-tech font-extrabold text-[14px] text-primary-600 block"
        >
          {{ item.index }}
        </span>

        <!-- Item Title (React.Js / Git / C++) -->
        <h3
          class="font-sans font-bold text-[24px] leading-[32px] text-foreground dark:text-white transition-colors"
        >
          {{ itemTitle }}
        </h3>

        <!-- Description Body (608px max-width) -->
        <p
          class="font-sans font-medium text-[16px] leading-[24px] text-foreground/80 dark:text-white/90 transition-colors max-w-[608px]"
        >
          {{ itemDesc }}
        </p>
      </div>

      <!-- Footer: Experience & Proficiency -->
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <span
            class="font-tech text-[14px] text-primary-500 font-light block uppercase"
          >
            {{ $t('tech.experienceLabel') }}: {{ item.experienceYears }}
          </span>
          <span class="font-tech text-[14px] text-primary-500 font-light block"
            >|</span
          >
          <span
            class="font-tech text-[14px] text-primary-500 font-light block uppercase"
          >
            {{ $t('tech.proficiency') }}: {{ $te(`tech.${item.proficiency.toLowerCase()}`) ? $t(`tech.${item.proficiency.toLowerCase()}`) : item.proficiency }}
          </span>
        </div>
      </div>
    </div>

    <!-- 2. Center Panel: Tech image section (479px width) -->
    <div
      class="w-11/32 h-full bg-secondary-400 dark:bg-tertiary-700 transition-colors duration-500 border-l border-r border-primary-300 dark:border-primary-600 p-6 flex flex-col items-center justify-center relative overflow-hidden shrink-0"
    >
      <!-- Center Downloaded Figma Image (280px x 280px) -->
      <div
        class="w-[280px] h-[280px] flex items-center justify-center relative z-10"
      >
        <img
          :src="item.imageUrl"
          :alt="item.title"
          class="max-w-full max-h-full object-contain drop-shadow-2xl"
        />
      </div>

      <!-- Pill Badge at Bottom Left -->
      <div
        class="absolute bottom-4 left-4 z-10 w-[120px] h-[46px] rounded-full border border-secondary-600 bg-primary-200/90 dark:bg-secondary-900/90 transition-colors duration-500 flex items-center justify-center"
      >
        <span
          class="font-tech text-xs text-foreground dark:text-white transition-colors"
        >
          {{ itemBadge }}
        </span>
      </div>
    </div>

    <!-- 3. Right Panel: Side section (48px width) -->
    <div
      class="w-12 h-full bg-primary-700 dark:bg-primary-700 transition-colors duration-500 flex flex-col items-center justify-between py-10 shrink-0"
    >
      <!-- Rotated Vertical Text -->
      <div
        class="writing-vertical font-sans font-bold text-[20px] leading-[28px] text-white transition-colors tracking-wide uppercase rotate-180"
      >
        {{ itemSideTag }}
      </div>

      <!-- SVG Icon (Figma Node 22:176) -->
      <img
        src="~/assets/images/side_section_icon.svg"
        alt="side icon"
        class="w-[28px] h-[8px]"
      />
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
.writing-vertical {
  writing-mode: vertical-rl;
}
</style>
