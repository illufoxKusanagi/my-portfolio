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
      :scroll-progress="scrollProgress"
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

    <!-- Mobile Fallback (< md) -->
    <div
      class="flex md:hidden w-full h-full flex-col justify-between pt-16 pb-6 px-4 z-20"
    >
      <div class="flex items-center justify-between">
        <div>
          <div class="flex items-center gap-2">
            <span
              class="w-3.5 h-3.5 rotate-45 bg-purple-600 dark:bg-tertiary-400 inline-block"
            />
            <h2
              class="font-sans font-extrabold text-2xl text-foreground dark:text-white uppercase leading-none"
            >
              {{ $t("projects.title") }}
            </h2>
          </div>
          <p
            class="font-tech text-xs text-purple-700 dark:text-tertiary-400 pl-5 mt-0.5"
          >
            {{ $t("projects.subtitle") }}
          </p>
        </div>

        <NuxtLink
          to="/projects"
          class="px-3 py-1.5 rounded-full bg-white text-secondary-950 font-tech text-[11px] font-bold uppercase shadow"
        >
          ALL ({{ PROJECTS_DATA.length }}) &rarr;
        </NuxtLink>
      </div>

      <div
        class="my-auto bg-purple-700 dark:bg-secondary-800 rounded-t-[16px] rounded-b-[36px] overflow-hidden shadow-2xl border border-purple-400/30 dark:border-tertiary-400/30 flex flex-col"
      >
        <div class="relative w-full h-44 bg-secondary-950 overflow-hidden">
          <img
            :src="activeProject.previewImage"
            :alt="activeProjectTitle"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute bottom-2 right-2 px-2.5 py-0.5 bg-secondary-950/90 font-tech text-[10px] font-bold text-tertiary-300 uppercase rounded"
          >
            {{ formattedActiveIndex }} / {{ formattedTotal }}
          </div>
        </div>

        <div class="p-5 space-y-2.5 text-white">
          <h3 class="font-sans font-extrabold text-xl uppercase leading-tight">
            {{ activeProjectTitle }}
          </h3>
          <p class="font-tech text-xs text-tertiary-300 uppercase line-clamp-1">
            {{ activeProjectSubtitle }}
          </p>
          <p
            class="font-sans text-xs text-white/90 leading-relaxed line-clamp-4"
          >
            {{ activeProjectDescription }}
          </p>

          <div class="flex flex-wrap items-center gap-2 pt-2">
            <a
              v-if="activeProject.demoUrl"
              :href="activeProject.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-1.5 bg-primary-700 text-white font-tech text-xs font-bold uppercase rounded-full"
            >
              {{ activeProjectDemoLabel }}
            </a>
            <a
              v-if="activeProject.repoUrl && activeProject.repoUrl !== '-'"
              :href="activeProject.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-1.5 bg-secondary-950 text-white font-tech text-xs font-bold uppercase rounded-full border border-white/25"
            >
              {{ $t("projects.viewRepo") }}
            </a>
          </div>
        </div>

        <div
          class="mx-3 mb-4 px-4 py-2.5 rounded-full bg-purple-950 dark:bg-secondary-950 flex items-center justify-between gap-2"
        >
          <span
            class="font-tech font-bold text-[10px] text-white uppercase tracking-wider shrink-0"
          >
            TECH
          </span>
          <div class="flex items-center gap-2 overflow-x-auto py-0.5">
            <div
              v-for="(tech, tIdx) in activeProject.techIcons"
              :key="'mob-tech-' + tIdx"
              class="w-7 h-7 rounded-full bg-white border border-primary-500 p-1.5 shrink-0 flex items-center justify-center"
            >
              <img
                v-if="tech.iconUrl"
                :src="tech.iconUrl"
                :alt="tech.name"
                class="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between gap-2">
        <button
          type="button"
          class="px-4 py-2.5 rounded-full bg-white text-secondary-950 font-sans font-bold text-xs shadow-md"
          @click="goToPrev"
        >
          &larr; Prev
        </button>
        <span
          class="font-tech text-xs font-bold text-foreground dark:text-white"
        >
          {{ formattedActiveIndex }} / {{ formattedTotal }}
        </span>
        <button
          type="button"
          class="px-5 py-2.5 rounded-full bg-white text-secondary-950 font-sans font-bold text-xs shadow-md"
          @click="goToNext"
        >
          Rotate Next &#9650;
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA } from "./projectsData";
import ProjectsEndfieldStage from "./ProjectsEndfieldStage.vue";

const { t, te } = useI18n();
const { $lenis } = useNuxtApp();

const sectionRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const scrollProgress = ref(0);
let isProgrammaticScroll = false;
let scrollTriggerInstance: ScrollTrigger | null = null;

const activeProject = computed(() => {
  return PROJECTS_DATA[activeIndex.value] || PROJECTS_DATA[0]!;
});

const formattedActiveIndex = computed(() =>
  String(activeIndex.value + 1).padStart(2, "0"),
);
const formattedTotal = computed(() =>
  String(PROJECTS_DATA.length).padStart(2, "0"),
);

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

function syncScrollToIndex(idx: number) {
  const total = PROJECTS_DATA.length;
  scrollProgress.value = idx / Math.max(1, total - 1);

  if (!scrollTriggerInstance) return;
  const targetProgress = (idx + 0.5) / total;
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
}

function jumpToProject(idx: number) {
  if (idx === activeIndex.value) return;
  activeIndex.value = idx;
  syncScrollToIndex(idx);
}

function goToNext() {
  const nextIdx = (activeIndex.value + 1) % PROJECTS_DATA.length;
  activeIndex.value = nextIdx;
  syncScrollToIndex(nextIdx);
}

function goToPrev() {
  const prevIdx =
    (activeIndex.value - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
  activeIndex.value = prevIdx;
  syncScrollToIndex(prevIdx);
}

onMounted(() => {
  if (import.meta.server || !sectionRef.value) return;

  gsap.registerPlugin(ScrollTrigger);
  const total = PROJECTS_DATA.length;

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: sectionRef.value,
    pin: true,
    start: "top top",
    end: () => `+=${total * 85}%`,
    scrub: 1,
    onUpdate: (self) => {
      // Continuously drive wheel rotation on every pixel of scroll
      scrollProgress.value = self.progress;
      if (isProgrammaticScroll) return;
      const step = Math.min(total - 1, Math.floor(self.progress * total));
      if (step !== activeIndex.value) {
        activeIndex.value = step;
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
