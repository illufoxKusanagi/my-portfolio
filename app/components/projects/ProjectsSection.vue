<template>
  <section
    id="projects"
    ref="sectionRef"
    class="relative w-full h-screen bg-purple-100 dark:bg-secondary-950 transition-colors duration-500 overflow-hidden font-sans select-none flex"
  >
    <!-- Left Sidebar (Purple 200 / Secondary 700 background matching section theme, visible on large screens) -->
    <div
      class="hidden lg:flex w-[140px] xl:w-[160px] h-full bg-purple-200 dark:bg-secondary-700 transition-colors duration-500 flex-col items-center justify-end pb-10 gap-10 z-10 shrink-0"
    >
      <!-- Rotated Labels Group -->
      <div class="flex flex-col items-center gap-6">
        <!-- Active Project Title (vertical text) -->
        <span
          class="text-[20px] xl:text-[26px] font-tech text-foreground/60 dark:text-white/60 uppercase select-none cursor-default transition-colors tracking-wider max-h-[260px] truncate"
          style="writing-mode: vertical-rl; transform: rotate(180deg)"
        >
          {{
            $te(`projects.items.${activeProject.id}.title`)
              ? $t(`projects.items.${activeProject.id}.title`)
              : activeProject.title
          }}
        </span>

        <!-- Separator dot -->
        <div class="w-[8px] h-[8px] rounded-full bg-purple-400 dark:bg-primary-200" />

        <!-- PROJECTS rotated vertical title -->
        <span
          class="text-h2 text-foreground dark:text-white select-none cursor-default font-bold transition-colors"
          style="writing-mode: vertical-rl; transform: rotate(180deg)"
        >
          {{ $t("projects.title") }}
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

    <!-- Main Content Area -->
    <div
      class="flex-1 min-w-0 h-full flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-8 px-4 sm:px-8 md:px-12 z-10 overflow-hidden"
    >
      <!-- Section Header -->
      <div class="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-20">
        <div class="flex items-start gap-3 sm:gap-4">
          <!-- Left Purple Accent Bar -->
          <div
            class="w-2 sm:w-2.5 h-10 sm:h-14 md:h-16 bg-purple-600 dark:bg-tertiary-700 mt-1 shrink-0"
          />

          <div class="space-y-0.5 sm:space-y-1">
            <h2
              class="font-sans font-bold text-2xl sm:text-4xl md:text-5xl text-foreground dark:text-white transition-colors tracking-tight leading-none uppercase"
            >
              {{ $t("projects.title") }}
            </h2>
            <p
              class="font-tech text-sm sm:text-base text-purple-700 dark:text-tertiary-400 transition-colors font-light uppercase tracking-widest"
            >
              {{ $t("projects.subtitle") }}
            </p>
          </div>
        </div>

        <NuxtLink
          to="/projects"
          class="self-start sm:self-auto px-4 py-2 rounded-[8px] bg-purple-200/80 dark:bg-secondary-900 border border-purple-300 dark:border-tertiary-700 hover:bg-purple-600 hover:text-white dark:hover:bg-tertiary-700 font-tech text-xs font-bold uppercase tracking-wider text-foreground dark:text-white transition-colors shadow-sm"
        >
          {{ $t("projects.archiveTitle") }} &rarr;
        </NuxtLink>
      </div>

      <!-- Main Card Viewport with Clip-Path Stencil Wipe -->
      <div
        class="w-full flex-1 flex items-center justify-center relative overflow-hidden my-4 lg:my-6 z-10"
      >
        <div
          class="w-full h-full max-h-[480px] sm:max-h-[520px] md:max-h-[560px] lg:max-h-[640px] relative overflow-hidden rounded-[16px]"
        >
          <!-- Base Active Card Layer -->
          <div
            v-for="(project, index) in PROJECTS_DATA"
            :key="project.id"
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
            <ProjectCard :project="project" />
          </div>

          <!-- High-Contrast Accent Wipe Curtain -->
          <div
            ref="curtainRef"
            class="absolute inset-0 w-full h-full bg-purple-600 dark:bg-tertiary-700 pointer-events-none z-30 opacity-0"
            style="clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
          />
        </div>
      </div>

      <!-- Bottom Pagination Controls -->
      <SectionPagination
        :current-index="activeIndex"
        :total-items="PROJECTS_DATA.length"
        :is-animating="isAnimating"
        variant="purple"
        :summary-text="
          $t('projects.availableCount', { count: PROJECTS_DATA.length })
        "
        @prev="goToPrev"
        @next="goToNext"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  type ComponentPublicInstance,
} from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA } from "./projectsData";
import ProjectCard from "./ProjectCard.vue";
import SectionPagination from "~/components/common/SectionPagination.vue";

const sectionRef = ref<HTMLElement | null>(null);
const curtainRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);
const activeIndex = ref(0);
const isAnimating = ref(false);
let isProgrammaticScroll = false;

const { $lenis } = useNuxtApp();

const activeProject = computed(() => {
  return PROJECTS_DATA[activeIndex.value] || PROJECTS_DATA[0]!;
});

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
  if (activeIndex.value < PROJECTS_DATA.length - 1) {
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
