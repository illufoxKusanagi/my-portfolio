<template>
  <div
    class="min-h-screen bg-purple-100 dark:bg-secondary-950 transition-colors duration-500 font-sans pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28"
  >
    <!-- Header Block & Cyber-Tech Filter Console -->
    <div class="max-w-7xl mx-auto mb-8 sm:mb-12">
      <!-- Top Utility Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-purple-200/70 dark:bg-secondary-900 border border-purple-300 dark:border-tertiary-700 text-foreground dark:text-white font-tech text-xs font-bold uppercase tracking-wider hover:bg-purple-600 hover:text-white dark:hover:bg-tertiary-700 transition-colors"
        >
          <span aria-hidden="true">&larr;</span>
          <span>BACK TO OVERVIEW</span>
        </NuxtLink>

        <div
          class="px-3.5 py-1.5 rounded-[8px] bg-purple-200/50 dark:bg-secondary-900/80 border border-purple-200 dark:border-tertiary-700/80 font-tech text-xs text-purple-800 dark:text-tertiary-300 uppercase tracking-widest flex items-center gap-2"
        >
          <span
            class="w-2 h-2 rounded-full bg-purple-600 dark:bg-tertiary-400 animate-pulse"
          />
          <span>DISPLAYING {{ String(filteredProjects.length).padStart(2, "0") }} / {{ String(PROJECTS_DATA.length).padStart(2, "0") }} PROJECTS</span>
        </div>
      </div>

      <!-- Main Section Title Block -->
      <div class="flex items-start gap-3 sm:gap-4 mb-4">
        <!-- Vertical Accent Bar -->
        <div
          class="w-2 sm:w-2.5 h-12 sm:h-16 md:h-20 bg-purple-600 dark:bg-tertiary-700 shrink-0 mt-1"
        />

        <div class="space-y-0.5 sm:space-y-1">
          <h1
            class="font-sans font-bold text-3xl sm:text-5xl md:text-6xl text-foreground dark:text-white transition-colors tracking-tight uppercase leading-none"
          >
            {{ $t("projects.archiveTitle") }}
          </h1>
          <p
            class="font-tech text-xs sm:text-sm md:text-base text-purple-700 dark:text-tertiary-400 uppercase tracking-widest font-light mt-1"
          >
            {{ $t("projects.archiveSubtitle") }}
          </p>
        </div>
      </div>

      <!-- Search & Pill Filter Bar -->
      <div
        class="mt-8 flex flex-col gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-[16px] bg-purple-200/60 dark:bg-secondary-900/90 border border-purple-200 dark:border-tertiary-700 shadow-xl backdrop-blur-md"
      >
        <!-- Search Input with Cyber Tech styling -->
        <div class="relative w-full">
          <div
            class="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-purple-700 dark:text-tertiary-400 pointer-events-none"
          >
            <span class="font-tech font-extrabold text-xs">&gt;</span>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="SEARCH BY TECH, TITLE, OR KEYWORD..."
            class="w-full pl-8 pr-9 py-2.5 rounded-[8px] bg-purple-50/90 dark:bg-secondary-950/90 border border-purple-200 dark:border-tertiary-700 text-foreground dark:text-white text-xs font-tech tracking-wider focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-tertiary-600 transition-all placeholder:text-foreground/40 dark:placeholder:text-white/40"
          />
          <button
            v-if="searchQuery"
            type="button"
            aria-label="Clear search"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-purple-200 dark:bg-secondary-800 text-foreground/70 dark:text-white/70 hover:text-white hover:bg-purple-600 dark:hover:bg-tertiary-700 flex items-center justify-center text-[10px] font-tech font-bold transition-colors cursor-pointer"
            @click="searchQuery = ''"
          >
            &#10005;
          </button>
        </div>

        <!-- Filter Pill Badges -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="tag in FILTER_TAGS"
            :key="tag"
            type="button"
            class="px-4 py-2 rounded-[6px] text-xs font-tech font-bold transition-all duration-200 whitespace-nowrap cursor-pointer uppercase tracking-wider"
            :class="
              selectedTag === tag
                ? 'bg-purple-600 dark:bg-tertiary-700 text-white shadow-md'
                : 'bg-purple-50 dark:bg-secondary-950 border border-purple-200 dark:border-tertiary-700 text-foreground/75 dark:text-white/75 hover:bg-purple-200 dark:hover:bg-secondary-800'
            "
            @click="selectedTag = tag; searchQuery = ''"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <!-- Projects List: Using the Signature ProjectCard Multi-Panel Structure -->
    <div class="max-w-7xl mx-auto space-y-8 sm:space-y-10">
      <div v-if="filteredProjects.length > 0" class="space-y-8 sm:space-y-10">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="w-full bg-purple-50 dark:bg-secondary-900 border border-purple-200 dark:border-tertiary-700 rounded-[16px] overflow-hidden flex flex-col lg:flex-row shadow-2xl transition-all duration-300 hover:border-purple-400 dark:hover:border-tertiary-500 relative group/card"
        >
          <!-- Top Strip on Mobile -->
          <div
            class="flex lg:hidden w-full h-9 bg-purple-200 dark:bg-secondary-600 items-center justify-between px-4 shrink-0"
          >
            <div
              class="font-sans font-bold text-xs text-foreground dark:text-white tracking-wider uppercase"
            >
              {{ $t("projects.projectLabel") }} // {{ formatIndex(index) }}
            </div>
            <img
              src="~/assets/images/side_section_icon.svg"
              alt="side icon"
              class="w-5 h-2"
            />
          </div>

          <!-- 1. Left Panel: 16:9 Widescreen Preview Showcase -->
          <div
            class="w-full lg:w-[54%] xl:w-[56%] bg-purple-950/95 dark:bg-secondary-950 p-3 sm:p-4 lg:p-5 flex flex-col justify-center shrink-0 border-b lg:border-b-0 lg:border-r border-purple-200 dark:border-tertiary-700 relative"
          >
            <!-- Top Mini HUD Bar -->
            <div class="flex items-center justify-between mb-2 px-1">
              <div class="flex items-center gap-2">
                <span
                  class="w-2 h-2 rotate-45 bg-purple-400 dark:bg-tertiary-400 inline-block"
                />
                <span
                  class="font-tech text-[11px] font-bold tracking-widest uppercase text-purple-200 dark:text-tertiary-300"
                >
                  PREVIEW // {{ formatIndex(index) }}
                </span>
              </div>
              <button
                type="button"
                class="font-tech text-[11px] font-bold tracking-wider uppercase text-purple-200 hover:text-white dark:text-tertiary-300 dark:hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                @click="openLightbox(index)"
              >
                <span>EXPAND PREVIEW</span>
                <span aria-hidden="true">&#10530;</span>
              </button>
            </div>

            <!-- 16:9 Widescreen Frame -->
            <div
              class="relative w-full aspect-video rounded-[10px] overflow-hidden bg-secondary-950 border border-purple-400/35 dark:border-tertiary-700/80 shadow-inner cursor-zoom-in group/preview"
              @click="openLightbox(index)"
            >
              <img
                :src="project.previewImage"
                :alt="getProjectTitle(project)"
                loading="lazy"
                class="w-full h-full object-contain bg-secondary-950 transition-transform duration-500 group-hover/preview:scale-[1.03]"
              />

              <!-- Subtle Corner HUD Brackets -->
              <span
                class="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-purple-300/60 dark:border-tertiary-400/70 pointer-events-none"
              />
              <span
                class="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-purple-300/60 dark:border-tertiary-400/70 pointer-events-none"
              />
              <span
                class="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-purple-300/60 dark:border-tertiary-400/70 pointer-events-none"
              />
              <span
                class="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-purple-300/60 dark:border-tertiary-400/70 pointer-events-none"
              />

              <!-- Hover Zoom Overlay Badge -->
              <div
                class="absolute inset-0 bg-secondary-950/0 group-hover/preview:bg-secondary-950/35 transition-colors duration-300 flex items-center justify-center pointer-events-none"
              >
                <div
                  class="opacity-0 group-hover/preview:opacity-100 transition-all duration-300 scale-95 group-hover/preview:scale-100 px-4 py-2 rounded-full bg-purple-600/95 dark:bg-tertiary-700/95 text-white font-tech font-bold text-xs uppercase tracking-widest shadow-xl border border-white/30 flex items-center gap-2"
                >
                  <span>INSPECT FULL SCREENSHOT</span>
                  <span aria-hidden="true">&#x2922;</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Center Panel: Project Info Content -->
          <div
            class="flex-1 min-w-0 p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative z-10 gap-5"
          >
            <!-- Top Info Block -->
            <div class="space-y-3.5">
              <h3
                class="text-2xl sm:text-3xl font-sans font-bold text-foreground dark:text-white tracking-tight uppercase leading-tight"
              >
                {{ getProjectTitle(project) }}
              </h3>

              <!-- Signature Sub-description Tag Box -->
              <div class="flex items-center gap-3">
                <div
                  class="w-1 h-10 sm:h-12 bg-purple-600 dark:bg-tertiary-600 rounded-full shrink-0"
                />
                <div class="space-y-1 min-w-0">
                  <p
                    class="font-tech text-xs text-purple-700 dark:text-tertiary-400 font-light uppercase tracking-widest leading-snug"
                  >
                    {{ getProjectSubtitle(project) }}
                  </p>
                  <img
                    src="~/assets/images/desc_sub_tag.svg"
                    alt="sub tag graphic"
                    class="w-[64px] sm:w-[80px] h-[10px] sm:h-[12px] opacity-85"
                  />
                </div>
              </div>

              <!-- Description Body -->
              <p
                class="font-sans font-medium text-sm sm:text-[15px] leading-relaxed text-foreground/80 dark:text-white/85"
              >
                {{ getProjectDescription(project) }}
              </p>
            </div>

            <!-- Bottom Footer Block: Tech Stack & Actions -->
            <div
              class="flex flex-col gap-5 pt-4 border-t border-purple-200 dark:border-secondary-700"
            >
              <!-- Interactive Tech Stack Chips -->
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <span
                    class="font-tech text-xs text-purple-600 dark:text-tertiary-400 font-light uppercase tracking-widest"
                  >
                    TECH-STACK ({{ project.techIcons.length }})
                  </span>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <button
                    v-for="(tech, tIdx) in project.techIcons"
                    :key="tIdx"
                    type="button"
                    class="inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border transition-all duration-200 cursor-pointer"
                    :class="
                      isTechActive(tech.name)
                        ? 'bg-purple-600 dark:bg-tertiary-700 border-purple-600 dark:border-tertiary-500 text-white shadow-sm'
                        : 'bg-purple-100 dark:bg-secondary-950 border-purple-300 dark:border-tertiary-700 text-foreground/85 dark:text-white/85 hover:border-purple-500 dark:hover:border-tertiary-500'
                    "
                    :title="`Filter by ${tech.name}`"
                    @click="toggleTagFilter(tech.name)"
                  >
                    <span
                      class="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1 shrink-0 shadow-xs"
                    >
                      <img
                        v-if="tech.iconUrl"
                        :src="tech.iconUrl"
                        :alt="tech.name"
                        class="w-full h-full object-contain"
                      />
                      <span
                        v-else
                        class="text-[9px] font-bold text-foreground/70"
                      >
                        {{ tech.name.substring(0, 2).toUpperCase() }}
                      </span>
                    </span>
                    <span
                      class="font-tech text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                    >
                      {{ tech.name }}
                    </span>
                  </button>
                </div>
              </div>

              <!-- Action Buttons Row -->
              <div
                class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-purple-200/60 dark:border-secondary-800"
              >
                <div class="flex flex-wrap items-center gap-2.5">
                  <a
                    v-if="project.demoUrl"
                    :href="project.demoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-5 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-tertiary-700 dark:hover:bg-tertiary-600 text-white font-tech font-bold text-xs uppercase tracking-wider rounded-[8px] transition-colors shadow-md inline-flex items-center gap-1.5"
                  >
                    <span>{{ getProjectDemoLabel(project) }}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                  <a
                    v-if="project.repoUrl && project.repoUrl !== '-'"
                    :href="project.repoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-5 py-2 border border-purple-400 dark:border-tertiary-600 text-foreground dark:text-white hover:bg-purple-100 dark:hover:bg-tertiary-900/50 font-tech font-semibold text-xs uppercase tracking-wider rounded-[8px] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{{ getProjectRepoLabel(project) }}</span>
                  </a>
                </div>

                <button
                  type="button"
                  class="px-3.5 py-2 rounded-[8px] bg-purple-200/70 dark:bg-secondary-800 hover:bg-purple-300 dark:hover:bg-secondary-700 text-foreground dark:text-white font-tech text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  @click="openLightbox(index)"
                >
                  <span>ZOOM PREVIEW</span>
                  <span aria-hidden="true">&#10530;</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 3. Right Side Accent Strip on Desktop -->
          <div
            class="hidden lg:flex w-12 bg-purple-200 dark:bg-secondary-600 transition-colors duration-500 flex-col items-center justify-between py-8 shrink-0 select-none"
          >
            <div
              class="writing-vertical font-sans font-bold text-[16px] leading-[22px] text-foreground/80 dark:text-white tracking-wider uppercase rotate-180"
            >
              {{ $t("projects.projectLabel") }} // {{ formatIndex(index) }}
            </div>

            <!-- SVG Icon (Figma Node 22:176) -->
            <img
              src="~/assets/images/side_section_icon.svg"
              alt="side icon"
              class="w-[28px] h-[8px]"
            />
          </div>
        </div>
      </div>

      <!-- No Results Found State -->
      <div
        v-else
        class="text-center py-20 bg-purple-50/50 dark:bg-secondary-900/50 rounded-[16px] border border-dashed border-purple-300 dark:border-tertiary-700 p-8"
      >
        <h3
          class="text-xl font-bold font-sans uppercase text-foreground dark:text-white mb-2"
        >
          No Matching Projects
        </h3>
        <p
          class="font-tech text-xs text-foreground/60 dark:text-white/60 mb-6 uppercase tracking-wider"
        >
          Try clearing search query or selecting another technology tag.
        </p>
        <button
          type="button"
          class="px-6 py-2.5 rounded-[8px] bg-purple-600 hover:bg-purple-700 dark:bg-tertiary-700 dark:hover:bg-tertiary-600 text-white font-tech text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
          @click="resetFilters"
        >
          Reset Filters
        </button>
      </div>
    </div>

    <!-- Interactive Fullscreen Screenshot Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="activeLightboxProject && lightboxIndex !== null"
        class="fixed inset-0 z-[200] bg-secondary-950/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="getProjectTitle(activeLightboxProject)"
        @click.self="closeLightbox"
      >
        <!-- Top Lightbox Bar -->
        <div
          class="max-w-7xl w-full mx-auto flex items-center justify-between gap-4 pb-3 border-b border-white/15 shrink-0"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span
              class="px-2.5 py-1 rounded bg-purple-600/80 text-white font-tech text-xs font-bold shrink-0 tracking-wider"
            >
              {{ formatIndex(lightboxIndex) }} / {{ formatIndex(filteredProjects.length - 1) }}
            </span>
            <h2
              class="font-sans font-bold text-base sm:text-xl md:text-2xl text-white uppercase tracking-tight truncate"
            >
              {{ getProjectTitle(activeLightboxProject) }}
            </h2>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <button
              type="button"
              class="px-3.5 py-1.5 rounded-[8px] bg-secondary-900 border border-tertiary-600 text-white font-tech text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-tertiary-700 transition-colors"
              @click="isZoomed = !isZoomed"
            >
              {{ isZoomed ? 'FIT TO SCREEN (1X)' : 'ZOOM IN (1.75X)' }}
            </button>
            <button
              v-if="filteredProjects.length > 1"
              type="button"
              class="px-3.5 py-1.5 rounded-[8px] bg-secondary-900 border border-white/20 text-white font-tech text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-secondary-800 transition-colors"
              aria-label="Previous project preview"
              @click="prevLightboxProject"
            >
              &larr; PREV
            </button>
            <button
              v-if="filteredProjects.length > 1"
              type="button"
              class="px-3.5 py-1.5 rounded-[8px] bg-secondary-900 border border-white/20 text-white font-tech text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-secondary-800 transition-colors"
              aria-label="Next project preview"
              @click="nextLightboxProject"
            >
              NEXT &rarr;
            </button>
            <button
              type="button"
              class="px-3.5 py-1.5 rounded-[8px] bg-purple-600 hover:bg-purple-500 text-white font-tech text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              aria-label="Close preview"
              @click="closeLightbox"
            >
              CLOSE [ESC] &times;
            </button>
          </div>
        </div>

        <!-- Center Widescreen Image Viewport -->
        <div
          class="flex-1 min-h-0 w-full max-w-7xl mx-auto my-3 flex overflow-auto rounded-[12px] border border-white/15 bg-secondary-950/80 p-2 sm:p-4"
          :class="isZoomed ? 'items-start justify-start' : 'items-center justify-center'"
          @click.self="closeLightbox"
        >
          <img
            :src="activeLightboxProject.previewImage"
            :alt="getProjectTitle(activeLightboxProject)"
            class="rounded-[8px] shadow-2xl transition-transform duration-300"
            :class="
              isZoomed
                ? 'w-[165%] max-w-none h-auto cursor-zoom-out m-auto'
                : 'max-w-full max-h-full object-contain cursor-zoom-in'
            "
            @click="isZoomed = !isZoomed"
          />
        </div>

        <!-- Bottom Lightbox Bar -->
        <div
          class="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-white/15 shrink-0"
        >
          <div class="space-y-1 min-w-0">
            <p
              class="font-tech text-xs text-tertiary-300 font-light uppercase tracking-widest truncate"
            >
              {{ getProjectSubtitle(activeLightboxProject) }}
            </p>
            <div class="flex flex-wrap items-center gap-1.5">
              <span
                v-for="(tech, tIdx) in activeLightboxProject.techIcons"
                :key="tIdx"
                class="px-2 py-0.5 rounded-full bg-secondary-900 border border-tertiary-700 text-white/90 font-tech text-[10px] uppercase tracking-wider"
              >
                {{ tech.name }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2.5 shrink-0">
            <a
              v-if="activeLightboxProject.demoUrl"
              :href="activeLightboxProject.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-tertiary-700 dark:hover:bg-tertiary-600 text-white font-tech font-bold text-xs uppercase tracking-wider rounded-[8px] transition-colors shadow-md inline-flex items-center gap-1.5"
            >
              <span>{{ getProjectDemoLabel(activeLightboxProject) }}</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              v-if="activeLightboxProject.repoUrl && activeLightboxProject.repoUrl !== '-'"
              :href="activeLightboxProject.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 border border-purple-400 dark:border-tertiary-600 text-white hover:bg-tertiary-900/50 font-tech font-semibold text-xs uppercase tracking-wider rounded-[8px] transition-colors inline-flex items-center gap-1.5"
            >
              <span>{{ getProjectRepoLabel(activeLightboxProject) }}</span>
            </a>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import {
  PROJECTS_DATA,
  type ProjectItem,
} from "@/components/projects/projectsData";

const { t, te } = useI18n();

useHead({
  title: "Projects Archive // Illufox Kusanagi",
  meta: [
    {
      name: "description",
      content:
        "Complete engineering catalog of software projects, 3D interactive applications, and system utilities.",
    },
  ],
});

const searchQuery = ref("");
const selectedTag = ref("ALL");

const FILTER_TAGS = [
  "ALL",
  "REACT",
  "VUE",
  "NUXT",
  "NEXT.JS",
  "LARAVEL",
  "LIVEWIRE",
  "TYPESCRIPT",
  "PHP",
  "C++",
  "QT",
  "DOCKER",
  "POSTGRESQL",
  "MYSQL",
  "THREE.JS",
  "SHADCN UI",
];

const formatIndex = (idx: number): string => {
  return String(idx + 1).padStart(2, "0");
};

const getProjectTitle = (project: ProjectItem): string => {
  return te(`projects.items.${project.id}.title`)
    ? t(`projects.items.${project.id}.title`)
    : project.title;
};

const getProjectSubtitle = (project: ProjectItem): string => {
  return te(`projects.items.${project.id}.subtitle`)
    ? t(`projects.items.${project.id}.subtitle`)
    : project.subtitle;
};

const getProjectDescription = (project: ProjectItem): string => {
  return te(`projects.items.${project.id}.description`)
    ? t(`projects.items.${project.id}.description`)
    : project.description;
};

const getProjectDemoLabel = (project: ProjectItem): string => {
  return te(`projects.items.${project.id}.demoLabel`)
    ? t(`projects.items.${project.id}.demoLabel`)
    : project.demoLabel || t("projects.viewDemo");
};

const getProjectRepoLabel = (project: ProjectItem): string => {
  return te(`projects.items.${project.id}.repoLabel`)
    ? t(`projects.items.${project.id}.repoLabel`)
    : project.repoLabel || t("projects.viewRepo");
};

const filteredProjects = computed(() => {
  return PROJECTS_DATA.filter((project) => {
    const q = searchQuery.value.toLowerCase().trim();
    const title = getProjectTitle(project).toLowerCase();
    const subtitle = getProjectSubtitle(project).toLowerCase();
    const desc = getProjectDescription(project).toLowerCase();

    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.subtitle.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      title.includes(q) ||
      subtitle.includes(q) ||
      desc.includes(q) ||
      project.techIcons.some((t) => t.name.toLowerCase().includes(q));

    const matchesTag =
      selectedTag.value === "ALL" ||
      project.techIcons.some((t) => t.name.toUpperCase() === selectedTag.value);

    return matchesSearch && matchesTag;
  });
});

const isTechActive = (techName: string): boolean => {
  return (
    selectedTag.value === techName.toUpperCase() ||
    (searchQuery.value.trim().toLowerCase() === techName.toLowerCase() &&
      techName.length > 0)
  );
};

const toggleTagFilter = (techName: string) => {
  const upper = techName.toUpperCase();
  if (FILTER_TAGS.includes(upper)) {
    searchQuery.value = "";
    selectedTag.value = selectedTag.value === upper ? "ALL" : upper;
  } else {
    selectedTag.value = "ALL";
    searchQuery.value =
      searchQuery.value.trim().toLowerCase() === techName.toLowerCase()
        ? ""
        : techName;
  }
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedTag.value = "ALL";
};

// Lightbox modal state & controls
const lightboxIndex = ref<number | null>(null);
const isZoomed = ref(false);

const activeLightboxProject = computed<ProjectItem | null>(() => {
  if (lightboxIndex.value === null) return null;
  return filteredProjects.value[lightboxIndex.value] ?? null;
});

const openLightbox = (idx: number) => {
  lightboxIndex.value = idx;
  isZoomed.value = false;
};

const closeLightbox = () => {
  lightboxIndex.value = null;
  isZoomed.value = false;
};

const nextLightboxProject = () => {
  if (filteredProjects.value.length === 0 || lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % filteredProjects.value.length;
  isZoomed.value = false;
};

const prevLightboxProject = () => {
  if (filteredProjects.value.length === 0 || lightboxIndex.value === null) return;
  lightboxIndex.value =
    (lightboxIndex.value - 1 + filteredProjects.value.length) %
    filteredProjects.value.length;
  isZoomed.value = false;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (lightboxIndex.value === null) return;
  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowRight") {
    nextLightboxProject();
  } else if (e.key === "ArrowLeft") {
    prevLightboxProject();
  }
};

watch(lightboxIndex, (val) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = val !== null ? "hidden" : "";
  }
});

onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleKeydown);
  }
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("keydown", handleKeydown);
  }
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
.writing-vertical {
  writing-mode: vertical-rl;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-purple-400);
  border-radius: 4px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-tertiary-700);
}
</style>
