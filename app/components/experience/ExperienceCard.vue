<template>
  <!-- Card Container -->
  <div
    class="relative w-full h-full min-h-[360px] md:min-h-0 rounded-xl overflow-hidden border border-secondary-300 dark:border-secondary-700 bg-gray-900 transition-colors duration-500 shadow-2xl flex flex-col justify-between p-4 sm:p-6 md:p-8"
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
      class="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent pointer-events-none z-10"
    />
    <div
      class="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent pointer-events-none z-10"
    />

    <!-- Achievements List -->
    <div
      class="relative z-20 flex flex-col gap-2 sm:gap-3 w-full lg:max-w-3/4 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1 sm:pr-2 mb-3"
    >
      <transition name="fade" mode="out-in">
        <div :key="activeItem.id" class="flex flex-col gap-2 sm:gap-3">
          <div
            v-for="(bullet, i) in displayedBullets"
            :key="i"
            class="flex items-start gap-2.5 sm:gap-4 w-full"
          >
            <!-- Secondary Right-pointing Play/Triangle Arrow matching Figma -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary-400 mt-[5px] shrink-0"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <p
              class="text-xs sm:text-sm md:text-base text-white/90 transition-colors leading-relaxed"
            >
              {{ bullet }}
            </p>
          </div>
        </div>
      </transition>
    </div>

    <!-- Desktop: Multi-Slot Sliding Gallery (hidden on mobile, visible on lg) -->
    <div class="hidden lg:flex relative z-20 w-full h-[160px] mt-auto items-center">
      <!-- Left side: thumbnails & controls container (2-slot when items.length === 2, 3-slot when >= 3) -->
      <div
        class="relative h-full shrink-0"
        :style="{ width: items.length === 2 ? '515px' : '737px' }"
      >
        <!-- Dynamic transitioning thumbnail slots -->
        <div
          v-for="slot in thumbnailSlots"
          :key="slot.label + '-' + slot.index"
          :class="[
            'absolute rounded-lg overflow-hidden transition-all duration-500 ease-in-out cursor-pointer group shadow-lg',
            slot.isActive
              ? 'border-2 border-secondary-400 z-20'
              : 'border border-secondary-600/30 z-10',
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

          <!-- Active Item Overlay -->
          <div
            v-if="slot.isActive"
            class="absolute inset-0 items-center bg-linear-to-t from-secondary-900 via-secondary-800/40 to-transparent flex flex-col justify-end p-4"
          >
            <span class="text-desc-small-bold text-secondary-300 text-[10px]">
              ACTIVE
            </span>
            <h4
              class="text-medium-regular text-white font-bold text-[14px] truncate mt-0.5"
            >
              {{ slot.item?.company }}
            </h4>
          </div>
        </div>

        <!-- Left Navigation Button -->
        <button
          type="button"
          class="absolute top-[108px] w-[42px] h-[36px] bg-secondary-700/90 border border-secondary-500 rounded-md flex items-center justify-center text-white hover:bg-secondary-600 transition-colors shadow-lg z-30 cursor-pointer"
          :style="{ left: items.length === 2 ? '200px' : '217px' }"
          aria-label="Previous experience"
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

        <!-- Right Navigation Button -->
        <button
          type="button"
          class="absolute top-[108px] w-[42px] h-[36px] bg-secondary-700/90 border border-secondary-500 rounded-md flex items-center justify-center text-white hover:bg-secondary-600 transition-colors shadow-lg z-30 cursor-pointer"
          :style="{ left: items.length === 2 ? '248px' : '478px' }"
          aria-label="Next experience"
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

        <!-- Last Label Info (only when 3+ items) -->
        <div
          v-if="items.length >= 3"
          class="absolute left-[149px] top-[105px] text-white/90 transition-colors pointer-events-none select-none z-30 flex items-center gap-1.5"
        >
          <span class="text-desc-regular text-[13px] font-light">
            {{ formatIndex(prevIndex + 1) }}/{{ formatIndex(items.length) }}
          </span>
          <span class="text-desc-small-bold text-secondary-400">LAST</span>
        </div>

        <!-- Next Label Info -->
        <div
          class="absolute top-[131px] text-white/90 transition-colors pointer-events-none select-none z-30 flex items-center gap-1.5"
          :style="{ left: items.length === 2 ? '300px' : '528px' }"
        >
          <span class="text-desc-small-bold text-secondary-400">NEXT</span>
          <span class="text-desc-regular text-[13px] font-light">
            {{ formatIndex(nextIndex + 1) }}/{{ formatIndex(items.length) }}
          </span>
        </div>
      </div>

      <!-- Right side: fluid decorator line (stretches to fill remaining card width) -->
      <div class="flex-1 h-[2px] bg-secondary-700/50 shadow-inner ml-6 mb-16" />
    </div>

    <!-- Mobile / Tablet: Responsive Compact Slider Bar (visible on < lg) -->
    <div
      class="flex lg:hidden relative z-20 w-full mt-auto pt-2.5 sm:pt-3 border-t border-white/10 items-center justify-between gap-2"
    >
      <button
        type="button"
        class="w-8 h-8 sm:w-9 sm:h-9 rounded-[6px] bg-secondary-700 hover:bg-secondary-600 border border-secondary-500 flex items-center justify-center text-white shrink-0 shadow-md transition-all active:scale-95"
        aria-label="Previous experience"
        @click="$emit('change-active', prevIndex)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <div
        class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 max-w-[calc(100%-80px)]"
      >
        <button
          v-for="(item, idx) in items"
          :key="item.id"
          type="button"
          class="px-2 sm:px-3 py-1 rounded-[4px] text-[11px] sm:text-xs font-tech font-bold transition-all whitespace-nowrap"
          :class="
            idx === activeIndex
              ? 'bg-secondary-700 text-white border border-secondary-400 shadow-sm'
              : 'bg-black/40 text-white/60 hover:text-white border border-white/10'
          "
          @click="$emit('change-active', idx)"
        >
          0{{ idx + 1 }} // {{ item.company.split(" ")[0] }}
        </button>
      </div>

      <button
        type="button"
        class="w-8 h-8 sm:w-9 sm:h-9 rounded-[6px] bg-secondary-700 hover:bg-secondary-600 border border-secondary-500 flex items-center justify-center text-white shrink-0 shadow-md transition-all active:scale-95"
        aria-label="Next experience"
        @click="$emit('change-active', nextIndex)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
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

const prevIndex = computed(
  () => (props.activeIndex - 1 + props.items.length) % props.items.length,
);
const nextIndex = computed(() => (props.activeIndex + 1) % props.items.length);

// When items.length === 2, render 2 distinct slots (ACTIVE + NEXT) so the other
// company is not duplicated on both the left and right simultaneously.
const thumbnailSlots = computed(() => {
  if (props.items.length === 2) {
    return [
      {
        index: props.activeIndex,
        item: props.activeItem,
        isActive: true,
        label: "ACTIVE",
        style: {
          left: "0px",
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
          left: "279px",
          top: "26px",
          width: "223px",
          height: "134px",
        },
      },
    ];
  }

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

const formatIndex = (val: number): string => {
  return val < 10 ? `0${val}` : `${val}`;
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-primary-600);
  border-radius: 4px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-primary-400);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
