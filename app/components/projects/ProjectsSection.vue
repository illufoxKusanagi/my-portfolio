<template>
  <section
    id="projects"
    ref="sectionRef"
    class="relative w-full h-screen bg-tertiary-200 dark:bg-secondary-950 transition-colors duration-500 overflow-hidden font-sans select-none flex"
  >
    <!-- Left Sidebar (Secondary 100 / 700 background matching Experience section) -->
    <div
      class="w-[120px] md:w-[160px] h-full bg-secondary-100 dark:bg-secondary-700 transition-colors duration-500 flex flex-col items-center justify-end pb-10 gap-10 z-10 shrink-0"
    >
      <!-- Rotated Labels Group -->
      <div class="flex flex-col items-center gap-6">
        <!-- Active Project Title (vertical text) -->
        <span
          class="text-[20px] md:text-[26px] font-tech text-foreground/60 dark:text-white/60 uppercase select-none cursor-default transition-colors tracking-wider"
          style="writing-mode: vertical-rl; transform: rotate(180deg)"
        >
          {{ $te(`projects.items.${activeProject.id}.title`) ? $t(`projects.items.${activeProject.id}.title`) : activeProject.title }}
        </span>

        <!-- Separator dot -->
        <div class="w-[8px] h-[8px] rounded-full bg-primary-200" />

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
      class="flex-1 min-w-0 h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 z-10 overflow-hidden"
    >
      <!-- Section Header -->
      <div class="w-full flex items-center justify-between z-20">
        <div class="flex items-start gap-4">
          <!-- Left Tertiary Accent Bar -->
          <div class="w-2.5 h-14 md:h-16 bg-tertiary-700 mt-1 shrink-0"></div>

          <div class="space-y-1">
            <h2
              class="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-foreground dark:text-white transition-colors tracking-tight leading-none uppercase"
            >
              {{ $t("projects.title") }}
            </h2>
            <p
              class="font-tech text-sm sm:text-base text-tertiary-600 dark:text-tertiary-400 transition-colors font-light uppercase tracking-widest"
            >
              {{ $t("projects.subtitle") }}
            </p>
          </div>
        </div>
      </div>

      <!-- Main Card Viewport with Clip-Path Stencil Wipe -->
      <div
        class="w-full flex-1 flex items-center justify-center relative overflow-hidden my-4 lg:my-6 z-10"
      >
        <div
          class="w-full h-full max-h-[640px] relative overflow-hidden rounded-[16px]"
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
            class="absolute inset-0 w-full h-full bg-tertiary-700 pointer-events-none z-30 opacity-0"
            style="clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
          ></div>
        </div>
      </div>

      <!-- Bottom Pagination Controls -->
      <div
        class="w-full flex items-center justify-between text-xs font-tech text-foreground/70 dark:text-white/70 transition-colors z-20"
      >
        <span class="hidden sm:inline-block tracking-widest uppercase"
          >Scroll or use arrows &darr;</span
        >

        <!-- Interactive Arrow Pagination Controls -->
        <div
          class="flex items-center gap-4 mx-auto sm:mx-0 border border-tertiary-400 dark:border-tertiary-700 bg-tertiary-100/80 dark:bg-secondary-900/90 backdrop-blur px-4 py-2 rounded-full shadow-lg"
        >
          <!-- Prev Button -->
          <button
            @click="goToPrev"
            :disabled="activeIndex === 0 || isAnimating"
            class="w-8 h-8 rounded-full border border-tertiary-400/50 dark:border-tertiary-600/50 flex items-center justify-center transition-all duration-200 hover:bg-tertiary-700 hover:border-tertiary-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 27"
              class="w-3 h-3 text-current transition-colors"
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
            class="font-tech text-sm text-tertiary-600 dark:text-tertiary-400 font-bold tracking-wider px-2"
          >
            0{{ activeIndex + 1 }} / 0{{ PROJECTS_DATA.length }}
          </span>

          <!-- Next Button -->
          <button
            @click="goToNext"
            :disabled="activeIndex === PROJECTS_DATA.length - 1 || isAnimating"
            class="w-8 h-8 rounded-full border border-tertiary-400/50 dark:border-tertiary-600/50 flex items-center justify-center transition-all duration-200 hover:bg-tertiary-700 hover:border-tertiary-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 27"
              class="w-3 h-3 text-current transition-colors rotate-180"
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
          >{{ PROJECTS_DATA.length }} Projects Available</span
        >
      </div>
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

const sectionRef = ref<HTMLElement | null>(null);
const curtainRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);
const activeIndex = ref(0);
const isAnimating = ref(false);

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

  // Set z-index and prepare elements
  gsap.set(nextCard, { zIndex: 25, clipPath: fullPolygon });
  gsap.set(curtain, { zIndex: 30, opacity: 0.9, clipPath: startPolygon });

  // Sweep curtain
  tl.to(curtain, {
    clipPath: fullPolygon,
    duration: 0.35,
    ease: "power3.inOut",
  })
    // Switch cards
    .call(() => {
      gsap.set(currentCard, {
        zIndex: 10,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      });
      gsap.set(nextCard, { zIndex: 20 });
    })
    // Wipe curtain off
    .to(curtain, {
      clipPath: endPolygon,
      duration: 0.35,
      ease: "power3.inOut",
    })
    .set(curtain, { opacity: 0 });
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

// Seek the ScrollTrigger scroll position to match the button-driven card index
// so onUpdate doesn't contradict and snap back on the next scroll event
const syncScrollToIndex = (idx: number) => {
  if (!scrollTriggerInstance) return;
  const cards = cardRefs.value;
  // Target progress: midpoint of this card's slot in the scroll budget
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
