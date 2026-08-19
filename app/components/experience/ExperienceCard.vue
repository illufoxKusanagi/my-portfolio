<template>
  <!-- Card Container (relative/flex, sized in Figma pixels, auto-scaled by parent) -->
  <div
    class="relative w-full h-full rounded-xl overflow-hidden border border-primary-300 dark:border-primary-700 bg-gray-900 transition-colors duration-500 shadow-2xl flex flex-col justify-between p-8"
  >
    <!-- Background Image with Fade Transition -->
    <transition name="fade" mode="out-in">
      <img
        :key="activeItem.id"
        :src="activeItem.bgImage"
        alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
      />
    </transition>

    <!-- Legibility Gradient overlays (dark gray bottom fade & dark gray left fade) -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent pointer-events-none z-10"
    />
    <div
      class="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent pointer-events-none z-10"
    />

    <!-- Achievements List (flowing naturally in document flow at the top) -->
    <div
      class="relative z-20 flex flex-col gap-3 max-w-3/4 w-full overflow-y-auto"
    >
      <transition name="fade" mode="out-in">
        <div :key="activeItem.id" class="flex flex-col gap-3">
          <div
            v-for="(bullet, i) in displayedBullets"
            :key="i"
            class="flex items-start gap-4 w-full"
          >
            <!-- Blue Right-pointing Play/Triangle Arrow matching Figma -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4 text-primary-500 mt-[6px] shrink-0"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <p
              class="text-medium-regular text-white/90 transition-colors leading-[1.6]"
            >
              {{ bullet }}
            </p>
          </div>
        </div>
      </transition>
    </div>

    <!-- Bottom Slider / Gallery Controls Container (relative flex positioning at bottom) -->
    <div class="relative z-20 w-full h-[160px] mt-auto flex items-center">
      <!-- Left side: fixed width thumbnails & controls container -->
      <div class="relative w-[737px] h-full shrink-0">
        <!-- Dynamic transitioning thumbnail slots -->
        <div
          v-for="slot in thumbnailSlots"
          :key="slot.item ? slot.item.id : slot.index"
          :class="[
            'absolute rounded-lg overflow-hidden transition-all duration-500 ease-in-out cursor-pointer group shadow-lg',
            slot.isActive ? 'border-2 border-primary-500 z-20' : 'border z-10',
          ]"
          :style="{
            left: slot.style.left,
            top: slot.style.top,
            width: slot.style.width,
            height: slot.style.height,
          }"
          @click="slot.isActive ? null : $emit('change-active', slot.index)"
        >
          <img
            :src="slot.item?.bgImage"
            alt=""
            class="w-full h-full object-cover transition-opacity duration-300"
            :class="
              slot.isActive
                ? 'opacity-100'
                : 'opacity-60 group-hover:opacity-80'
            "
          />

          <!-- Active Item Overlay (shows company name with black gradient background) -->
          <div
            v-if="slot.isActive"
            class="absolute inset-0 items-center bg-linear-to-t from-primary-700 via-primary-600/0 to-transparent flex flex-col justify-end p-4"
          >
            <span class="text-desc-small-bold text-primary-400 text-[10px]"
              >ACTIVE</span
            >
            <h4
              class="text-medium-regular text-white font-bold text-[14px] truncate mt-0.5"
            >
              {{ slot.item?.company }}
            </h4>
          </div>
        </div>

        <!-- Left Navigation Button (placed on top of overlapping slots) -->
        <button
          class="absolute left-[217px] top-[108px] w-[42px] h-[36px] bg-primary-700/90 border border-primary-500 rounded-md flex items-center justify-center text-white hover:bg-primary-600 transition-colors shadow-lg z-30"
          @click="$emit('change-active', prevIndex)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <!-- Right Navigation Button (placed on top of overlapping slots) -->
        <button
          class="absolute left-[478px] top-[108px] w-[42px] h-[36px] bg-primary-700/90 border border-primary-500 rounded-md flex items-center justify-center text-white hover:bg-primary-600 transition-colors shadow-lg z-30"
          @click="$emit('change-active', nextIndex)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        <!-- Last Label Info (Overlaying the left thumbnail) -->
        <div
          class="absolute left-[149px] top-[105px] text-foreground/90 dark:text-white/90 transition-colors pointer-events-none select-none z-30 flex items-center gap-1.5"
        >
          <span class="text-desc-regular text-[13px] font-light">
            {{ formatIndex(prevIndex + 1) }}/{{ formatIndex(items.length) }}
          </span>
          <span class="text-desc-small-bold text-primary-400">LAST</span>
        </div>

        <!-- Next Label Info (Overlaying the right thumbnail) -->
        <div
          class="absolute left-[528px] top-[131px] text-foreground/90 dark:text-white/90 transition-colors pointer-events-none select-none z-30 flex items-center gap-1.5"
        >
          <span class="text-desc-small-bold text-primary-400">NEXT</span>
          <span class="text-desc-regular text-[13px] font-light">
            {{ formatIndex(nextIndex + 1) }}/{{ formatIndex(items.length) }}
          </span>
        </div>
      </div>

      <!-- Right side: fluid decorator line (stretches to fill remaining card width) -->
      <div class="flex-1 h-[2px] bg-primary-700/50 shadow-inner ml-6 mb-16" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { ExperienceItem } from "./experienceData";

const props = defineProps<{
  activeItem: ExperienceItem;
  activeIndex: number;
  items: ExperienceItem[];
}>();

defineEmits<{
  (e: "change-active", index: number): void;
}>();

const { t, te } = useI18n();

const displayedBullets = computed(() => {
  const bullets = props.activeItem.bullets || [];
  return bullets.map((fallback, i) => {
    const key = `experience.items.${props.activeItem.id}.bullets.${i}`;
    return te(key) ? t(key) : fallback;
  });
});

// Calculate adjacent indices
const prevIndex = computed(
  () => (props.activeIndex - 1 + props.items.length) % props.items.length,
);
const nextIndex = computed(() => (props.activeIndex + 1) % props.items.length);

// Dynamic thumbnail properties to drive transitions
const thumbnailSlots = computed(() => {
  return [
    {
      index: prevIndex.value,
      item: props.items[prevIndex.value],
      isActive: false,
      label: "LAST",
      style: {
        left: "0px",
        top: "26px",
        width: "223px",
        height: "134px",
      },
    },
    {
      index: props.activeIndex,
      item: props.activeItem,
      isActive: true,
      label: "ACTIVE",
      style: {
        left: "235px",
        top: "0px",
        width: "267px",
        height: "160px",
      },
    },
    {
      index: nextIndex.value,
      item: props.items[nextIndex.value],
      isActive: false,
      label: "NEXT",
      style: {
        left: "514px",
        top: "26px",
        width: "223px",
        height: "134px",
      },
    },
  ];
});

// Formatting helper
const formatIndex = (val: number): string => {
  return val < 10 ? `0${val}` : `${val}`;
};
</script>

<style scoped>
.clip-polygon {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

/* Slide/Fade Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
