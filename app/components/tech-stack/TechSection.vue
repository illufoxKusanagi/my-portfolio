<template>
  <section
    :id="`tech-category-${category.id}`"
    ref="sectionRef"
    class="w-full h-screen overflow-hidden bg-primary-100 dark:bg-primary-950 transition-colors duration-500 flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-8 px-4 sm:px-8 md:px-16 lg:px-28 xl:px-44"
  >
    <!-- Section Header (Figma node 22:219) -->
    <div class="w-full mx-auto flex items-center justify-between z-50">
      <div class="flex items-start gap-3 sm:gap-4">
        <!-- Left Tertiary Accent Bar -->
        <div
          class="w-2 sm:w-2.5 h-10 sm:h-14 md:h-16 bg-tertiary-700 mt-1 shrink-0"
        />

        <div class="space-y-0.5 sm:space-y-1">
          <h2
            class="font-sans font-bold text-2xl sm:text-4xl md:text-5xl text-foreground dark:text-white transition-colors tracking-tight leading-none uppercase"
          >
            {{ $t("tech.title") }}
          </h2>
          <p
            class="font-tech text-xs sm:text-sm md:text-base text-foreground/80 dark:text-white/80 transition-colors font-light uppercase tracking-widest mt-1"
          >
            {{
              category.id === "frameworks"
                ? $t("tech.frameworksSub")
                : category.id === "tools"
                  ? $t("tech.toolsSub")
                  : $t("tech.languagesSub")
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- Main Card Viewport with Clip-Path Stencil Wipe -->
    <div
      class="w-full flex-1 flex items-center justify-center relative overflow-hidden my-2 sm:my-4 z-10"
    >
      <div
        class="w-full h-full max-h-[420px] sm:max-h-[460px] md:max-h-[546px] relative overflow-hidden rounded-[16px]"
      >
        <!-- Base Active Card Layer -->
        <div
          v-for="(item, index) in category.items"
          :key="item.id"
          :ref="(el: any) => setCardRef(el, index)"
          class="absolute inset-0 w-full h-full"
          :style="{
            zIndex: index === activeIndex ? 20 : 10,
            clipPath:
              index === activeIndex
                ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          }"
        >
          <TechCard :item="item" />
        </div>

        <!-- High-Contrast Accent Color Wipe Curtain (Endfield Yellow / Primary Accent Wipe) -->
        <div
          ref="curtainRef"
          class="absolute inset-0 w-full h-full bg-primary-700 pointer-events-none z-30 opacity-0"
          style="clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
        ></div>
      </div>
    </div>

    <!-- Bottom Pagination Controls (Matching Endfield Pagination_button__cVH8L) -->
    <div
      class="max-w-7xl w-full mx-auto flex items-center justify-between text-xs font-tech text-foreground/70 dark:text-white/70 transition-colors z-50 pt-1"
    >
      <span class="hidden sm:inline-block">SCROLL OR USE ARROWS &darr;</span>

      <!-- Interactive Arrow Pagination Controls -->
      <div
        class="flex items-center gap-4 mx-auto sm:mx-0 border border-primary-700 bg-secondary-900/90 px-4 py-2 rounded-[8px] shadow-lg"
      >
        <!-- Prev Button -->
        <button
          @click="goToPrev"
          :disabled="activeIndex === 0 || isAnimating"
          class="w-8 h-8 rounded-[6px] border border-primary-600/50 flex items-center justify-center transition-all duration-200 hover:bg-primary-700 hover:border-primary-500 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 27"
            class="w-3 h-3 text-foreground dark:text-white transition-colors"
          >
            <path
              fill-rule="evenodd"
              fill="currentColor"
              d="M14.142,0.127 L17.753,3.737 L7.963,13.527 L17.753,23.318 L14.142,26.928 L0.743,13.527 L14.142,0.127 Z"
            ></path>
          </svg>
        </button>

        <!-- Index Display -->
        <span
          class="font-tech text-sm text-primary-500 font-bold tracking-wider px-2"
        >
          0{{ activeIndex + 1 }} / 0{{ category.items.length }}
        </span>

        <!-- Next Button -->
        <button
          @click="goToNext"
          :disabled="activeIndex === category.items.length - 1 || isAnimating"
          class="w-8 h-8 rounded-[6px] border border-primary-600/50 flex items-center justify-center transition-all duration-200 hover:bg-primary-700 hover:border-primary-500 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 27"
            class="w-3 h-3 text-foreground dark:text-white transition-colors rotate-180"
          >
            <path
              fill-rule="evenodd"
              fill="currentColor"
              d="M14.142,0.127 L17.753,3.737 L7.963,13.527 L17.753,23.318 L14.142,26.928 L0.743,13.527 L14.142,0.127 Z"
            ></path>
          </svg>
        </button>
      </div>

      <span class="hidden sm:inline-block tracking-widest uppercase"
        >{{ category.items.length }} ITEMS //
        {{
          $te(`tech.${category.id}`)
            ? $t(`tech.${category.id}`)
            : category.title
        }}</span
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  type ComponentPublicInstance,
} from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TechCategoryGroup } from "./techData";
import TechCard from "./TechCard.vue";

const props = defineProps<{
  category: TechCategoryGroup;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const curtainRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);
const activeIndex = ref(0);
const isAnimating = ref(false);

const setCardRef = (
  el: Element | null | ComponentPublicInstance,
  index: number,
) => {
  if (el) {
    cardRefs.value[index] = el as HTMLElement;
  }
};

let scrollTriggerInstance: ScrollTrigger | null = null;

// Execute Endfield Stencil Clip-Path Wipe Transition (Card A -> Curtain Wipe -> Card B)
const transitionToCard = (
  nextIdx: number,
  direction: "next" | "prev" = "next",
) => {
  if (nextIdx === activeIndex.value || isAnimating.value) return;

  isAnimating.value = true;

  const currentCard = cardRefs.value[activeIndex.value]!;
  const nextCard = cardRefs.value[nextIdx]!;
  const curtain = curtainRef.value;

  const tl = gsap.timeline({
    onComplete: () => {
      activeIndex.value = nextIdx;
      isAnimating.value = false;
    },
  });

  const startPolygon =
    direction === "next"
      ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
      : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";

  const fullPolygon = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

  const endPolygon =
    direction === "next"
      ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
      : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

  // Step 1: Set z-index for incoming card & show curtain
  gsap.set(nextCard, { zIndex: 25, clipPath: fullPolygon });
  gsap.set(curtain, { zIndex: 30, opacity: 0.9, clipPath: startPolygon });

  // Step 2: Sweep accent curtain across screen
  tl.to(curtain, {
    clipPath: fullPolygon,
    duration: 0.35,
    ease: "power3.inOut",
  })
    // Step 3: Switch underlying card display while curtain covers viewport
    .call(() => {
      gsap.set(currentCard, {
        zIndex: 10,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      });
      gsap.set(nextCard, { zIndex: 20 });
    })
    // Step 4: Wipe curtain off to reveal new card content underneath
    .to(curtain, {
      clipPath: endPolygon,
      duration: 0.35,
      ease: "power3.inOut",
    })
    .set(curtain, { opacity: 0 });
};

const goToNext = () => {
  if (activeIndex.value < props.category.items.length - 1) {
    const nextIdx = activeIndex.value + 1;
    transitionToCard(nextIdx, "next");
    syncScrollToIndex(nextIdx);
  }
};

const goToPrev = () => {
  if (activeIndex.value > 0) {
    const nextIdx = activeIndex.value - 1;
    transitionToCard(nextIdx, "prev");
    syncScrollToIndex(nextIdx);
  }
};

// Seek the ScrollTrigger scroll position to match the button-driven card index
// so onUpdate doesn't contradict and snap back on the next scroll event
const syncScrollToIndex = (idx: number) => {
  if (!scrollTriggerInstance) return;
  const cards = cardRefs.value;
  const targetProgress = (idx + 0.5) / cards.length;
  const start = scrollTriggerInstance.start;
  const end = scrollTriggerInstance.end;
  const targetScroll = start + targetProgress * (end - start);
  scrollTriggerInstance.scroll(targetScroll);
};

onMounted(() => {
  if (import.meta.server || !sectionRef.value || cardRefs.value.length === 0)
    return;

  gsap.registerPlugin(ScrollTrigger);

  const section = sectionRef.value;
  const cards = cardRefs.value;

  // Pin section & trigger step transitions on vertical scroll scrub
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: section,
    pin: true,
    start: "top top",
    end: () => `+=${cards.length * 100}%`,
    scrub: 1,
    onUpdate: (self) => {
      const step = Math.min(
        cards.length - 1,
        Math.floor(self.progress * cards.length),
      );
      if (step !== activeIndex.value && !isAnimating.value) {
        const dir = step > activeIndex.value ? "next" : "prev";
        transitionToCard(step, dir);
      }
    },
  });
});

onBeforeUnmount(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
});
</script>
