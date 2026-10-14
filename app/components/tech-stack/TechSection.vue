<template>
  <section
    :id="`tech-category-${category.id}`"
    ref="sectionRef"
    class="w-full h-screen overflow-hidden bg-primary-100 dark:bg-primary-950 transition-colors duration-500 flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-8 px-4 sm:px-8 md:px-16 lg:px-28 xl:px-44"
  >
    <!-- Section Header (Figma node 22:219) -->
    <div class="w-full mx-auto flex items-center justify-between z-50">
      <div class="flex items-start gap-3 sm:gap-4">
        <!-- Left Primary Accent Bar -->
        <div
          class="w-2 sm:w-2.5 h-10 sm:h-14 md:h-16 bg-primary-700 mt-1 shrink-0"
        />

        <div class="space-y-0.5 sm:space-y-1">
          <h2
            class="font-sans font-bold text-2xl sm:text-4xl md:text-5xl text-foreground dark:text-white transition-colors tracking-tight leading-none uppercase"
          >
            {{ $t("tech.title") }}
          </h2>
          <p
            class="font-tech text-xs sm:text-sm md:text-base text-foreground dark:text-white transition-colors font-light uppercase tracking-widest mt-1"
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

        <!-- High-Contrast Accent Color Wipe Curtain -->
        <div
          ref="curtainRef"
          class="absolute inset-0 w-full h-full bg-primary-700 pointer-events-none z-30 opacity-0"
          style="clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
        />
      </div>
    </div>

    <!-- Bottom Pagination Controls -->
    <SectionPagination
      :current-index="activeIndex"
      :total-items="category.items.length"
      :is-animating="isAnimating"
      variant="primary"
      :summary-text="
        $t('tech.itemsCount', {
          count: category.items.length,
          category: $te(`tech.${category.id}`)
            ? $t(`tech.${category.id}`)
            : category.title,
        })
      "
      @prev="goToPrev"
      @next="goToNext"
    />
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
import SectionPagination from "~/components/common/SectionPagination.vue";

const props = defineProps<{
  category: TechCategoryGroup;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const curtainRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);
const activeIndex = ref(0);
const isAnimating = ref(false);
let isProgrammaticScroll = false;

const { $lenis } = useNuxtApp();

const setCardRef = (
  el: Element | null | ComponentPublicInstance,
  index: number,
) => {
  if (el) {
    cardRefs.value[index] = el as HTMLElement;
  }
};

let scrollTriggerInstance: ScrollTrigger | null = null;

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

  gsap.set(nextCard, { zIndex: 25, clipPath: fullPolygon });
  gsap.set(curtain, { zIndex: 30, opacity: 0.9, clipPath: startPolygon });

  tl.to(curtain, {
    clipPath: fullPolygon,
    duration: 0.35,
    ease: "power3.inOut",
  })
    .call(() => {
      gsap.set(currentCard, {
        zIndex: 10,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      });
      gsap.set(nextCard, { zIndex: 20 });
    })
    .to(curtain, {
      clipPath: endPolygon,
      duration: 0.35,
      ease: "power3.inOut",
    })
    .set(curtain, { opacity: 0 });
};

const syncScrollToIndex = (idx: number) => {
  if (!scrollTriggerInstance) return;
  const cards = cardRefs.value;
  const targetProgress = (idx + 0.5) / cards.length;
  const start = scrollTriggerInstance.start;
  const end = scrollTriggerInstance.end;
  const targetScroll = start + targetProgress * (end - start);

  isProgrammaticScroll = true;
  if ($lenis) {
    ($lenis as any).scrollTo(targetScroll, { immediate: true, force: true });
  } else {
    scrollTriggerInstance.scroll(targetScroll);
  }
  setTimeout(() => {
    isProgrammaticScroll = false;
  }, 600);
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

onMounted(() => {
  if (import.meta.server || !sectionRef.value || cardRefs.value.length === 0)
    return;

  gsap.registerPlugin(ScrollTrigger);

  const section = sectionRef.value;
  const cards = cardRefs.value;

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: section,
    pin: true,
    start: "top top",
    end: () => `+=${cards.length * 65}%`,
    scrub: 1,
    onUpdate: (self) => {
      if (isProgrammaticScroll || isAnimating.value) return;
      const step = Math.min(
        cards.length - 1,
        Math.floor(self.progress * cards.length),
      );
      if (step !== activeIndex.value) {
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
