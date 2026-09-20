<template>
  <div
    class="min-h-screen bg-purple-100 dark:bg-secondary-950 transition-colors duration-500 font-sans pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-8 md:px-16 lg:px-32"
  >
    <!-- Header Block (Matching TechSection / ProjectsSection style) -->
    <div class="max-w-7xl mx-auto mb-8 sm:mb-12">
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
            class="font-tech text-xs sm:text-sm md:text-base text-purple-700 dark:text-tertiary-400 uppercase tracking-widest font-light"
          >
            {{ $t("projects.archiveSubtitle") }}
          </p>
        </div>
      </div>

      <!-- Search & Pill Filter Bar -->
      <div
        class="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-[16px] bg-purple-200/60 dark:bg-secondary-900/90 border border-purple-200 dark:border-tertiary-700 shadow-xl backdrop-blur-md"
      >
        <!-- Search Input with Cyber Tech styling -->
        <div class="relative flex-1">
          <div
            class="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-purple-700 dark:text-tertiary-400 pointer-events-none"
          >
            <span class="font-tech font-extrabold text-xs">&gt;</span>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="SEARCH BY TECH, TITLE, OR KEYWORD..."
            class="w-full pl-8 pr-4 py-2.5 rounded-[8px] bg-purple-50/90 dark:bg-secondary-950/90 border border-purple-200 dark:border-tertiary-700 text-foreground dark:text-white text-xs font-tech tracking-wider focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-tertiary-600 transition-all placeholder:text-foreground/40 dark:placeholder:text-white/40"
          />
        </div>

        <!-- Filter Pill Badges (Matching TechCard pill badges) -->
        <div
          class="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar"
        >
          <button
            v-for="tag in FILTER_TAGS"
            :key="tag"
            class="px-4 py-2 rounded-[6px] text-xs font-tech font-bold transition-all duration-200 whitespace-nowrap cursor-pointer uppercase tracking-wider"
            :class="
              selectedTag === tag
                ? 'bg-purple-600 dark:bg-tertiary-700 text-white shadow-md'
                : 'bg-purple-50 dark:bg-secondary-950 border border-purple-200 dark:border-tertiary-700 text-foreground/75 dark:text-white/75 hover:bg-purple-200 dark:hover:bg-secondary-800'
            "
            @click="selectedTag = tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <!-- Projects List: Using the Signature ProjectCard Multi-Panel Structure -->
    <div class="max-w-7xl mx-auto space-y-10">
      <div v-if="filteredProjects.length > 0" class="space-y-8">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="w-full bg-purple-50 dark:bg-secondary-900 border border-purple-200 dark:border-tertiary-700 rounded-[16px] overflow-hidden flex flex-col lg:flex-row shadow-2xl transition-all duration-300 hover:shadow-3xl hover:border-purple-400 dark:hover:border-tertiary-500 relative"
        >
          <!-- 1. Left Panel: Image Preview (Large responsive block) -->
          <div
            class="w-full lg:w-5/12 h-64 sm:h-80 lg:h-auto relative overflow-hidden group shrink-0 bg-secondary-950"
          >
            <img
              :src="project.previewImage"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent to-secondary-900/40 dark:to-secondary-950/60 pointer-events-none"
            />
          </div>

          <!-- 2. Center Panel: Project Info Content -->
          <div
            class="flex-1 p-8 sm:p-10 flex flex-col justify-between relative z-10"
          >
            <div class="space-y-4">
              <!-- Title & Sub-description Tag Box -->
              <div>
                <h3
                  class="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-foreground dark:text-white tracking-tight uppercase leading-tight"
                >
                  {{
                    $te(`projects.items.${project.id}.title`)
                      ? $t(`projects.items.${project.id}.title`)
                      : project.title
                  }}
                </h3>

                <!-- Sub-description Tag Box (Signature Figma Node) -->
                <div class="flex items-center gap-3 mt-2">
                  <div
                    class="w-1 h-8 bg-purple-600 dark:bg-tertiary-600 rounded-full"
                  />
                  <p
                    class="font-tech text-xs text-purple-700 dark:text-tertiary-400 font-light uppercase tracking-widest"
                  >
                    {{
                      $te(`projects.items.${project.id}.subtitle`)
                        ? $t(`projects.items.${project.id}.subtitle`)
                        : project.subtitle
                    }}
                  </p>
                </div>
              </div>

              <!-- Description Body -->
              <p
                class="font-sans font-medium text-sm sm:text-base leading-relaxed text-foreground/80 dark:text-white/80 max-w-3xl"
              >
                {{
                  $te(`projects.items.${project.id}.description`)
                    ? $t(`projects.items.${project.id}.description`)
                    : project.description
                }}
              </p>
            </div>

            <!-- Footer: Tech Stack & Actions -->
            <div
              class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 mt-6 border-t border-purple-200 dark:border-secondary-700"
            >
              <!-- Tech Stack Circular Icon Slots (Signature Figma Style) -->
              <div>
                <span
                  class="font-tech text-xs text-purple-600 dark:text-tertiary-400 font-light block uppercase tracking-widest mb-3"
                >
                  TECHNOLOGIES
                </span>
                <div class="flex flex-wrap items-center gap-2.5">
                  <div
                    v-for="(tech, tIdx) in project.techIcons"
                    :key="tIdx"
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-secondary-950 border border-purple-300 dark:border-tertiary-700 p-2 shadow-sm transition-colors duration-300"
                    :title="tech.name"
                  >
                    <img
                      v-if="tech.iconUrl"
                      :src="tech.iconUrl"
                      class="w-full h-full object-contain"
                      :alt="tech.name"
                    />
                    <span
                      v-else
                      class="text-[9px] font-bold text-foreground/70 dark:text-white/70"
                    >
                      {{ tech.name.substring(0, 2).toUpperCase() }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-3 shrink-0">
                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 dark:bg-tertiary-700 dark:hover:bg-tertiary-600 text-white font-tech font-bold text-xs uppercase tracking-wider rounded-[8px] transition-colors shadow-md"
                >
                  {{
                    $te(`projects.items.${project.id}.demoLabel`)
                      ? $t(`projects.items.${project.id}.demoLabel`)
                      : project.demoLabel || $t("projects.viewDemo")
                  }}
                </a>
                <a
                  v-if="project.repoUrl && project.repoUrl !== '-'"
                  :href="project.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-6 py-2.5 border border-purple-400 dark:border-tertiary-600 text-foreground dark:text-white hover:bg-purple-100 dark:hover:bg-tertiary-900/50 font-tech font-semibold text-xs uppercase tracking-wider rounded-[8px] transition-colors"
                >
                  {{
                    $te(`projects.items.${project.id}.repoLabel`)
                      ? $t(`projects.items.${project.id}.repoLabel`)
                      : project.repoLabel || $t("projects.viewRepo")
                  }}
                </a>
              </div>
            </div>
          </div>

          <!-- 3. Right Side Accent Strip with Rotated Vertical Text -->
          <div
            class="hidden lg:flex w-12 bg-purple-200 dark:bg-secondary-600 transition-colors duration-500 flex-col items-center justify-between py-8 shrink-0 select-none"
          >
            <div
              class="writing-vertical font-sans font-bold text-[16px] leading-[22px] text-foreground/70 dark:text-white/70 tracking-wider uppercase rotate-180"
            >
              PROJECT // 0{{ index + 1 }}
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
          class="px-6 py-2.5 rounded-[8px] bg-purple-600 hover:bg-purple-700 dark:bg-tertiary-700 dark:hover:bg-tertiary-600 text-white font-tech text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
          @click="resetFilters"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { PROJECTS_DATA } from "@/components/projects/projectsData";

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
  "TYPESCRIPT",
  "NEXT.JS",
  "C++",
  "THREE.JS",
  "LARAVEL",
];

const filteredProjects = computed(() => {
  return PROJECTS_DATA.filter((project) => {
    const q = searchQuery.value.toLowerCase().trim();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.subtitle.toLowerCase().includes(q) ||
      project.techIcons.some((t) => t.name.toLowerCase().includes(q));

    const matchesTag =
      selectedTag.value === "ALL" ||
      project.techIcons.some((t) => t.name.toUpperCase() === selectedTag.value);

    return matchesSearch && matchesTag;
  });
});

const resetFilters = () => {
  searchQuery.value = "";
  selectedTag.value = "ALL";
};
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
