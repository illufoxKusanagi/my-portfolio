<template>
  <section
    id="projects"
    ref="sectionRef"
    class="relative w-full h-screen bg-purple-100 dark:bg-secondary-950 transition-colors duration-500 overflow-hidden font-sans select-none"
  >
    <!-- Desktop / Tablet Endfield Stage (>= md) -->
    <ProjectsEndfieldStage
      :active-project="activeProject"
      :active-index="activeIndex"
      :total-projects="PROJECTS_DATA.length"
      :active-project-title="activeProjectTitle"
      :active-project-subtitle="activeProjectSubtitle"
      :active-project-description="activeProjectDescription"
      :active-project-demo-label="activeProjectDemoLabel"
      :project-label="$t('projects.projectLabel')"
      :section-title="$t('projects.title')"
      :view-repo-label="$t('projects.viewRepo')"
      @next="goToNext"
      @prev="goToPrev"
      @select="jumpToProject"
    />

    <!-- Mobile View (< md) matching TechSection.vue -->
    <div
      class="flex lg:hidden w-full h-full flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-8 px-4 sm:px-8 z-10 overflow-hidden"
    >
      <!-- Section Header -->
      <div class="w-full mx-auto flex items-center justify-between z-50">
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
              class="font-tech text-xs sm:text-sm md:text-base text-purple-700 dark:text-tertiary-400 transition-colors font-light uppercase tracking-widest mt-1"
            >
              {{ $t("projects.subtitle") }}
            </p>
          </div>
        </div>
      </div>

      <!-- Main Card Viewport with Clip-Path Stencil Wipe -->
      <div
        class="w-full flex-1 flex items-center justify-center relative overflow-hidden my-2 sm:my-4 z-10"
      >
        <div
          class="w-full h-full max-h-[480px] sm:max-h-[520px] md:max-h-[560px] relative overflow-hidden rounded-[16px]"
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

          <!-- High-Contrast Accent Color Wipe Curtain -->
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
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA } from "./projectsData";
import ProjectsEndfieldStage from "./ProjectsEndfieldStage.vue";
import ProjectCard from "./ProjectCard.vue";
import SectionPagination from "~/components/common/SectionPagination.vue";

const { t, te } = useI18n();
const { $lenis } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const curtainRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);
const activeIndex = ref(0);
const isAnimating = ref(false);
let isProgrammaticScroll = false;

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

const activeProjectTitle = computed(() => {
  const key = `projects.items.${activeProject.value.id}.title`;
  return te(key) ? t(key) : activeProject.value.title;
});

const activeProjectSubtitle = computed(() => {
  const key = `projects.items.${activeProject.value.id}.subtitle`;
  return te(key) ? t(key) : activeProject.value.subtitle;
});

const activeProjectDescription = computed(() => {
  const key = `projects.items.${activeProject.value.id}.description`;
  return te(key) ? t(key) : activeProject.value.description;
});

const activeProjectDemoLabel = computed(() => {
  const key = `projects.items.${activeProject.value.id}.demoLabel`;
  return te(key)
    ? t(key)
    : activeProject.value.demoLabel || t("projects.viewDemo");
});

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

const jumpToProject = (idx: number) => {
  if (idx === activeIndex.value || isAnimating.value) return;
  const dir = idx > activeIndex.value ? "next" : "prev";
  transitionToCard(idx, dir);
  syncScrollToIndex(idx);
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
