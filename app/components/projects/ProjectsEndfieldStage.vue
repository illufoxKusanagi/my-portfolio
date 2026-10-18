<template>
  <div
    class="hidden lg:block relative w-full h-full overflow-hidden bg-purple-100 dark:bg-secondary-950 transition-colors duration-500"
  >
    <!-- =================================================================== -->
    <!-- VIEWPORT-ADAPTIVE 900px-HEIGHT STAGE                                -->
    <!-- Scales proportionally by viewport height/width so all zones stay    -->
    <!-- locked to the sketch proportions without clipping on any screen.    -->
    <!-- =================================================================== -->
    <div
      class="absolute left-0 top-0 h-[900px] origin-top-left overflow-hidden"
      :style="{
        width: `${stageWidth}px`,
        transform: `scale(${stageScale})`,
      }"
    >
      <!-- ================================================================= -->
      <!-- LAYER 1 (z-10): RIGHT-SIDE POLAR FAN & DIAGONAL SPINE             -->
      <!-- Radiates from the Giant Left Hub Center (hubCenterX, 480) so the  -->
      <!-- diagonal title band emerges flush from the curved left boundary.  -->
      <!-- ================================================================= -->
      <div class="absolute inset-0 pointer-events-none z-10">
        <!-- Shared Polar Origin at (hubCenterX, 480px) -->
        <div
          class="absolute top-[480px] w-0 h-0"
          :style="{ left: `${hubCenterX}px` }"
        >
          <!-- 1A. Outer Polar Rim Circle -->
          <div
            class="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/60 dark:bg-secondary-900 border border-purple-500/35 dark:border-tertiary-400/30 transition-colors duration-500"
            :style="{
              width: `${fanDiameter + 360}px`,
              height: `${fanDiameter + 360}px`,
            }"
          ></div>

          <!-- 1B. Main Royal-Blue Polar Fan Circle -->
          <div
            class="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200 dark:bg-secondary-700 border border-purple-500/45 dark:border-tertiary-400/45 transition-colors duration-500"
            :style="{
              width: `${fanDiameter}px`,
              height: `${fanDiameter}px`,
            }"
          ></div>

          <!-- 1C. Scroll-Driven Rotating Polar Wheel SVG -->
          <svg
            viewBox="-1600 -1600 3200 3200"
            class="absolute left-[-1600px] top-[-1600px] w-[3200px] h-[3200px] overflow-visible"
            aria-hidden="true"
          >
            <g :transform="`rotate(${wheelAngle})`">
              <g
                class="stroke-purple-600/20 dark:stroke-tertiary-400/20"
                stroke-width="1"
              >
                <line
                  v-for="n in 24"
                  :key="'wheel-spoke-' + n"
                  x1="740"
                  y1="0"
                  x2="1560"
                  y2="0"
                  :transform="`rotate(${(n - 1) * 15})`"
                />
              </g>

              <circle
                cx="0"
                cy="0"
                r="880"
                fill="none"
                class="stroke-purple-600/30 dark:stroke-tertiary-400/30"
                stroke-width="1.5"
                stroke-dasharray="60 24"
              />
              <circle
                cx="0"
                cy="0"
                r="1120"
                fill="none"
                class="stroke-purple-600/25 dark:stroke-tertiary-400/25"
                stroke-width="1.2"
                stroke-dasharray="100 36"
              />
              <circle
                cx="0"
                cy="0"
                r="1360"
                fill="none"
                class="stroke-purple-600/20 dark:stroke-tertiary-400/22"
                stroke-width="1.2"
                stroke-dasharray="140 48"
              />
              <circle
                cx="0"
                cy="0"
                r="1580"
                fill="none"
                class="stroke-purple-700/35 dark:stroke-tertiary-300/35"
                stroke-width="2"
                stroke-dasharray="180 44"
              />
            </g>
          </svg>

          <!-- 1D. Diagonal Title Band (-14deg, emerging from the middle of the half-circle arc) -->
          <div
            ref="spineArmRef"
            class="absolute left-[670px] top-[-110px] w-0 h-0 origin-left -rotate-[14deg] z-20 pointer-events-none"
          >
            <div
              class="w-[2400px] h-[112px] bg-purple-600 dark:bg-primary-800 border-y border-white/35 dark:border-tertiary-400/55 shadow-xl transition-colors duration-500 flex items-center"
            >
              <!-- Project Index Tag Above Band -->
              <div class="absolute -top-7 left-[105px] flex items-center gap-2">
                <span
                  class="font-tech text-sm font-bold tracking-wider text-purple-950 dark:text-tertiary-200 uppercase whitespace-nowrap"
                >
                  {{ projectLabel }} // {{ formattedActiveIndex }} OF
                  {{ formattedTotal }}
                </span>
              </div>

              <!-- Project Title, Subtitle & Progress Line (Width adapts to stageWidth) -->
              <div
                class="ml-[105px] flex flex-col justify-center gap-1.5"
                :style="{ width: `${titleBoxWidth}px` }"
              >
                <h3
                  class="font-sans font-extrabold text-2xl lg:text-4xl text-white uppercase tracking-tight leading-none truncate"
                >
                  {{ activeProjectTitle }}
                </h3>

                <p
                  class="font-tech font-medium text-xs text-purple-100 dark:text-tertiary-200 tracking-wide truncate"
                >
                  {{ activeProjectSubtitle }}
                </p>

                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1 bg-white/25 relative overflow-hidden">
                    <div
                      class="h-full bg-white transition-all duration-500"
                      :style="{ width: `${barFillProgress * 100}%` }"
                    ></div>
                  </div>
                  <span
                    class="w-1.5 h-1.5 rotate-45 bg-white block shrink-0"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 1E. Middle-Right Project Description & Action Buttons (-6deg subtle upward tilt) -->
        <div
          ref="descContainerRef"
          class="absolute top-[485px] origin-left -rotate-[6deg] pointer-events-auto z-20 flex flex-col gap-4"
          :style="{
            left: `${descLeftX}px`,
            width: `${descBoxWidth}px`,
          }"
        >
          <div
            class="border-l-2 border-purple-700 dark:border-tertiary-400 pl-4 py-1"
          >
            <p
              class="font-sans text-sm lg:text-base text-purple-950/90 dark:text-white/95 leading-relaxed line-clamp-4"
            >
              {{ activeProjectDescription }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3 pl-4">
            <a
              v-if="activeProject.demoUrl"
              :href="activeProject.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 dark:bg-primary-700 dark:hover:bg-primary-600 text-white font-tech font-bold text-xs uppercase tracking-wider rounded-md border border-white/30 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {{ activeProjectDemoLabel }} &rarr;
            </a>
            <a
              v-if="activeProject.repoUrl && activeProject.repoUrl !== '-'"
              :href="activeProject.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3.5 py-1.5 bg-secondary-950/90 hover:bg-secondary-800 text-white border border-tertiary-400/60 font-tech font-semibold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-400"
            >
              {{ viewRepoLabel }}
            </a>
            <NuxtLink
              to="/projects"
              class="px-3.5 py-1.5 rounded-md bg-purple-950/15 dark:bg-secondary-950/80 hover:bg-purple-950/25 dark:hover:bg-secondary-800 border border-purple-500/40 dark:border-tertiary-400/40 text-purple-950 dark:text-tertiary-200 font-tech text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-400"
            >
              ALL PROJECTS ({{ totalProjects }})
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- LAYER 2 (z-30): GIANT LEFT HALF-CIRCLE FILLED BY PREVIEW IMAGE    -->
      <!-- The half-circle itself clips the full-bleed project screenshot    -->
      <!-- edge-to-edge, with the PROJECTS header at top-left and navigation -->
      <!-- pill buttons at bottom-left overlaid on top.                      -->
      <!-- ================================================================= -->
      <div
        class="absolute left-0 top-[56px] bottom-0 z-30 pointer-events-none"
        :style="{ width: `${arcApexX + 40}px` }"
      >
        <!-- 2A. Giant Left Half-Circle Base (Centered at x=hubCenterX, y=424 -> stage y=480, R=730px) -->
        <div
          class="absolute top-[424px] w-0 h-0"
          :style="{ left: `${hubCenterX}px` }"
        >
          <!-- Half-Circle Masking Container Filled Edge-to-Edge by the Project Image -->
          <div
            class="absolute left-[-730px] top-[-730px] w-[1460px] h-[1460px] rounded-full overflow-hidden bg-purple-950 dark:bg-secondary-950 border-2 border-purple-500/80 dark:border-tertiary-400/80 shadow-[12px_0_40px_rgba(0,0,0,0.45)] pointer-events-auto group"
          >
            <!-- Visible Half-Circle Viewport Region (x = 0..arcApexX, y = 56..900px) -->
            <div
              ref="previewLensRef"
              class="absolute top-[306px] h-[844px] overflow-hidden"
              :style="{
                left: `${730 - hubCenterX}px`,
                width: `${arcApexX}px`,
              }"
            >
              <img
                :src="activeProject.previewImage"
                :alt="activeProjectTitle"
                class="w-full h-full object-cover object-scale-down transition-transform duration-500 group-hover:scale-105"
              />
              <!-- Subtle Top & Bottom Vignette Gradients so Overlaid Header & Buttons Pop Cleanly -->
              <div
                class="absolute inset-0 bg-gradient-to-b from-secondary-950/85 via-transparent to-secondary-950/85 pointer-events-none"
              ></div>
            </div>
          </div>

          <!-- Rotating Mechanical Caliper Arc SVG Along the Half-Circle Rim (R = 710px) -->
          <svg
            viewBox="-730 -730 1460 1460"
            class="absolute left-[-730px] top-[-730px] w-[1460px] h-[1460px] pointer-events-none z-10"
            aria-hidden="true"
          >
            <g :transform="`rotate(${wheelAngle * 0.35})`">
              <circle
                cx="0"
                cy="0"
                r="710"
                fill="none"
                class="stroke-purple-400 dark:stroke-tertiary-400"
                stroke-opacity="0.7"
                stroke-width="2.5"
                stroke-dasharray="84 36 20 36"
              />
              <g
                class="stroke-purple-300 dark:stroke-tertiary-300"
                stroke-opacity="0.6"
                stroke-width="1.5"
              >
                <line
                  v-for="tick in 36"
                  :key="'giant-hub-tick-' + tick"
                  x1="696"
                  y1="0"
                  x2="720"
                  y2="0"
                  :transform="`rotate(${(tick - 1) * 10})`"
                />
              </g>
            </g>
          </svg>

          <!-- Orbiting Project Selector Nodes Mounted Directly on the R=730px Rim (1460x1460px) -->
          <!-- Uses explicit left-[-730px] top-[-730px] so inline rotate() never overwrites centering! -->
          <div
            class="absolute left-[-730px] top-[-730px] w-[1460px] h-[1460px] rounded-full border border-dashed border-purple-500/40 dark:border-tertiary-400/40 flex items-center justify-center pointer-events-none z-20"
            :style="{ transform: `rotate(${wheelRingRotation}deg)` }"
          >
            <div
              v-for="spoke in wheelProjectSpokes"
              :key="'wheel-proj-spoke-' + spoke.projIdx"
              class="absolute inset-0 flex items-center justify-end pointer-events-none"
              :style="{ transform: `rotate(${spoke.spokeDeg}deg)` }"
            >
              <button
                type="button"
                class="rounded-full font-tech font-bold flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                :class="[
                  spoke.isActive
                    ? 'w-9 h-9 text-xs bg-purple-600 dark:bg-primary-700 text-white border-2 border-white shadow-md'
                    : 'w-7 h-7 text-[10px] bg-purple-950 dark:bg-secondary-950 text-purple-200 dark:text-tertiary-300 border border-purple-400/75 dark:border-tertiary-400/75 hover:border-white',
                  spoke.isInteractive
                    ? 'pointer-events-auto cursor-pointer'
                    : 'pointer-events-none',
                ]"
                :style="{
                  transform: `translateX(50%) rotate(${spoke.counterRotDeg}deg)`,
                  opacity: spoke.opacity,
                }"
                :aria-label="`Select project ${spoke.label}`"
                :aria-current="spoke.isActive ? 'true' : undefined"
                :tabindex="spoke.isInteractive ? 0 : -1"
                @click="$emit('select', spoke.projIdx)"
              >
                {{ spoke.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- 2B. Left Sector Top Horizontal Border Line (Under Menu) -->
        <div
          class="absolute left-0 top-0 h-[2px] bg-purple-500/80 dark:bg-tertiary-400/80 z-20"
          :style="{ width: `${Math.max(300, arcApexX - 136)}px` }"
        ></div>

        <!-- 2C. Overlaid Header (Top-Left) & Pill Buttons (Bottom-Left) Over the Half-Circle Image -->
        <div
          class="relative z-20 h-full px-8 lg:px-10 py-8 pb-14 flex flex-col justify-between pointer-events-none"
          :style="{ width: `${arcApexX - 20}px` }"
        >
          <!-- TOP: Section Header Overlaid on Half-Circle -->
          <div
            class="flex items-start gap-3.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          >
            <div
              class="w-2.5 h-16 bg-purple-500 dark:bg-primary-600 shrink-0"
            ></div>
            <div class="flex flex-col gap-1">
              <h2
                class="font-sans font-extrabold text-4xl lg:text-5xl text-white tracking-tight leading-none uppercase"
              >
                {{ sectionTitle }}
              </h2>
              <p
                class="font-tech text-sm lg:text-base text-tertiary-300 uppercase tracking-widest"
              >
                SELECTED WORKS AND SYSTEM
              </p>
            </div>
          </div>

          <!-- BOTTOM: Two Pill Navigation Buttons Overlaid on Half-Circle -->
          <div class="flex items-center gap-3.5 pointer-events-auto">
            <button
              type="button"
              class="h-11 px-5 rounded-full bg-white text-secondary-950 border border-purple-300 dark:border-secondary-800 shadow-lg flex items-center gap-2.5 hover:bg-tertiary-100 transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-400"
              aria-label="Previous project"
              @click="$emit('prev')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                class="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span class="font-sans font-bold text-[13px] tracking-tight">
                Prev
              </span>
            </button>

            <button
              type="button"
              class="h-11 px-5 rounded-full bg-white text-secondary-950 border border-purple-300 dark:border-secondary-800 shadow-lg flex items-center gap-2.5 hover:bg-tertiary-100 transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-400"
              @click="$emit('next')"
            >
              <span class="font-sans font-bold text-[13px] tracking-tight">
                Rotate Next
              </span>
              <span
                class="w-5 h-5 rounded-full bg-secondary-950 text-white flex items-center justify-center text-[9px] font-bold"
                aria-hidden="true"
              >
                &#9650;
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- LAYER 3 (z-25): BOTTOM TECH-STACK TRACK (ANCHORED BY bottom-[60px])-->
      <!-- Positioned clear of the lower left arc rim with w-fit sizing so   -->
      <!-- fewer modules never leave empty space and narrow screens fit.     -->
      <!-- ================================================================= -->
      <div
        ref="techBarRef"
        class="absolute bottom-[60px] origin-left rotate-[2deg] z-25 pointer-events-auto flex flex-col gap-2 w-fit"
        :style="{
          left: `${techBarLeftX}px`,
          maxWidth: `${stageWidth - techBarLeftX - 40}px`,
        }"
      >
        <div
          class="flex items-center justify-between gap-6 px-1 font-tech text-xs font-bold tracking-wider text-purple-900 dark:text-tertiary-300 uppercase"
        >
          <span>TECHNOLOGIES &bull; {{ activeTechName }}</span>
          <span class="opacity-80"> {{ bottomTechNodes.length }} MODULES </span>
        </div>

        <!-- Sketch-Faithful Bordered Rectangular Track Container -->
        <div
          class="relative w-fit max-w-full px-5 py-3.5 rounded-xl bg-purple-200/80 dark:bg-secondary-900/85 border-2 border-purple-500/60 dark:border-tertiary-400/60 backdrop-blur-xs shadow-xl overflow-x-auto"
        >
          <!-- Thin 1px Connector Line Behind Nodes -->
          <div
            v-if="bottomTechNodes.length > 1"
            class="absolute left-9 right-9 top-[38px] h-px bg-purple-600/35 dark:bg-tertiary-400/35 pointer-events-none"
          ></div>

          <!-- Enlarged Tech Nodes Row (w-12 h-12 [48px] circle badge with w-6 h-6 [24px] icon) -->
          <div class="relative z-10 flex items-center gap-4 lg:gap-5">
            <button
              v-for="node in bottomTechNodes"
              :key="'tech-node-' + node.index + '-' + node.name"
              type="button"
              class="group flex flex-col items-center gap-1.5 shrink-0 cursor-pointer focus-visible:outline-none"
              :aria-label="node.name"
              @click="selectedTechIndex = node.index"
            >
              <div
                class="tech-wheel-badge w-12 h-12 rounded-full bg-white flex items-center justify-center transition-transform duration-200 shadow-md"
                :class="
                  node.isSelected
                    ? 'scale-110 border-2 border-purple-600 dark:border-tertiary-400 ring-2 ring-purple-500/30 dark:ring-tertiary-400/40'
                    : 'border border-purple-400/60 dark:border-tertiary-400/50 opacity-90 group-hover:opacity-100 group-hover:scale-105'
                "
              >
                <img
                  v-if="node.iconUrl"
                  :src="node.iconUrl"
                  :alt="node.name"
                  width="24"
                  height="24"
                  class="w-6 h-6 object-contain"
                />
                <span
                  v-else
                  class="font-tech font-bold text-[10px] text-secondary-950"
                >
                  {{ node.name.slice(0, 3).toUpperCase() }}
                </span>
              </div>

              <span
                class="font-tech text-[10px] tracking-wider uppercase whitespace-nowrap transition-colors duration-200"
                :class="
                  node.isSelected
                    ? 'font-bold text-purple-950 dark:text-white'
                    : 'font-medium text-purple-900/80 dark:text-white/80 group-hover:text-purple-950 dark:group-hover:text-white'
                "
              >
                {{ node.name }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- TOP-RIGHT ARCHIVE BUTTON                                            -->
    <!-- =================================================================== -->
    <NuxtLink
      to="/projects"
      class="absolute right-6 lg:right-8 top-16 z-40 px-4 py-2 rounded-md bg-purple-200/80 dark:bg-secondary-900/90 hover:bg-purple-600 hover:text-white dark:hover:bg-primary-700 text-foreground dark:text-white border border-purple-400/50 dark:border-tertiary-400/50 font-tech font-bold text-xs uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-400"
    >
      {{ sectionTitle }} Archive &rarr;
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import type { ProjectItem } from "./projectsData";

const props = withDefaults(
  defineProps<{
    activeProject: ProjectItem;
    activeIndex: number;
    totalProjects: number;
    scrollProgress?: number;
    activeProjectTitle: string;
    activeProjectSubtitle: string;
    activeProjectDescription: string;
    activeProjectDemoLabel: string;
    projectLabel: string;
    sectionTitle: string;
    viewRepoLabel: string;
  }>(),
  {
    scrollProgress: undefined,
  },
);

defineEmits<{
  (e: "next"): void;
  (e: "prev"): void;
  (e: "select", index: number): void;
}>();

const MAX_TECH_NODES = 10;

const spineArmRef = ref<HTMLElement | null>(null);
const descContainerRef = ref<HTMLElement | null>(null);
const previewLensRef = ref<HTMLElement | null>(null);
const techBarRef = ref<HTMLElement | null>(null);

const selectedTechIndex = ref(0);
const barFillProgress = ref(1);
const animatedWheelIndex = ref(0);

const stageScale = ref(1);
const stageWidth = ref(1600);
const fanDiameter = computed(() =>
  Math.max(2800, Math.round(stageWidth.value * 1.75)),
);

// Rightmost X coordinate of the R=730px half-circle (42% of stageWidth, clamped between 440px and 640px)
const arcApexX = computed(() =>
  Math.max(440, Math.min(640, Math.round(stageWidth.value * 0.42))),
);

// X coordinate of the R=730px circle center (-90px when arcApexX = 640px)
const hubCenterX = computed(() => arcApexX.value - 730);

// Responsive width of the Title content inside the -14deg spine so it never overflows stageWidth
const titleBoxWidth = computed(() =>
  Math.max(320, Math.min(680, stageWidth.value - (arcApexX.value + 110))),
);

// Responsive left offset & width of the -6deg Description container so it never clips off the right edge
const descLeftX = computed(() => arcApexX.value + 40);
const descBoxWidth = computed(() =>
  Math.max(340, Math.min(680, stageWidth.value - (arcApexX.value + 88))),
);

// Responsive left offset of the bottom Tech Stack bar so it clears the lower half-circle rim and index badges
const techBarLeftX = computed(() => arcApexX.value + 15);

const formattedActiveIndex = computed(() =>
  String(props.activeIndex + 1).padStart(2, "0"),
);
const formattedTotal = computed(() =>
  String(props.totalProjects).padStart(2, "0"),
);

// Continuous wheel rotation angle in degrees for decorative caliper/polar rings
const wheelAngle = computed(() => {
  return -(animatedWheelIndex.value * 36);
});

// Angular step between consecutive projects along the Giant Left Arc rim (12deg per step)
const projectStepDeg = computed(() => {
  return 12;
});

// Master rotation angle of the 1460x1460px Project Index Wheel container
// Aligns the active project spoke with the -5deg junction where the lowered Title Band meets the arc
const wheelRingRotation = computed(() => {
  return -5 - animatedWheelIndex.value * projectStepDeg.value;
});

// Project index nodes mounted along the Giant Left Arc perimeter
const wheelProjectSpokes = computed(() => {
  const total = Math.max(1, props.totalProjects);
  const step = projectStepDeg.value;
  const currentPos = animatedWheelIndex.value;
  const ringRot = wheelRingRotation.value;

  return Array.from({ length: total }, (_, i) => {
    const spokeDeg = i * step;
    let diff = (i - currentPos) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    const isActive = i === props.activeIndex;
    const isInteractive = absDiff <= 2.2;

    let opacity = 0;
    if (absDiff <= 2.2) {
      opacity = isActive ? 1 : Math.max(0, Math.min(0.9, 1 - absDiff * 0.32));
    }

    return {
      projIdx: i,
      label: String(i + 1).padStart(2, "0"),
      spokeDeg,
      counterRotDeg: -(spokeDeg + ringRot),
      isActive,
      isInteractive,
      opacity,
    };
  });
});

const activeTechName = computed(() => {
  const icons = props.activeProject.techIcons || [];
  const chosen = icons[selectedTechIndex.value] || icons[0];
  return chosen ? chosen.name : "";
});

const bottomTechNodes = computed(() => {
  const icons = (props.activeProject.techIcons || []).slice(0, MAX_TECH_NODES);
  return icons.map((tech, idx) => ({
    index: idx,
    name: tech.name,
    iconUrl: tech.iconUrl || "",
    isSelected: selectedTechIndex.value === idx,
  }));
});

function updateStageMetrics() {
  if (typeof window === "undefined") return;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = vh / 900;
  stageScale.value = scale;
  stageWidth.value = Math.round(vw / scale);
}

watch(
  () => props.scrollProgress,
  (prog) => {
    if (typeof prog === "number" && !Number.isNaN(prog)) {
      const targetIdx = prog * Math.max(1, props.totalProjects - 1);
      gsap.to(animatedWheelIndex, {
        value: targetIdx,
        duration: 0.16,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
  },
);

watch(
  () => props.activeIndex,
  (nextIdx, prevIdx) => {
    selectedTechIndex.value = 0;

    const oldIdx = prevIdx ?? 0;
    let delta = nextIdx - oldIdx;
    if (delta > props.totalProjects / 2) delta -= props.totalProjects;
    if (delta < -props.totalProjects / 2) delta += props.totalProjects;
    const dir = delta >= 0 ? 1 : -1;

    const currentMod =
      ((animatedWheelIndex.value % props.totalProjects) + props.totalProjects) %
      props.totalProjects;
    let shortestDelta = nextIdx - currentMod;
    if (shortestDelta > props.totalProjects / 2)
      shortestDelta -= props.totalProjects;
    if (shortestDelta < -props.totalProjects / 2)
      shortestDelta += props.totalProjects;

    gsap.to(animatedWheelIndex, {
      value: animatedWheelIndex.value + shortestDelta,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });

    // 1. Wheel-spoke swing on the -14deg title spine
    if (spineArmRef.value) {
      gsap.fromTo(
        spineArmRef.value,
        { rotation: -14 + dir * 4, opacity: 0.45 },
        {
          rotation: -14,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }

    // 2. Subtle transition on the -6deg description container
    if (descContainerRef.value) {
      gsap.fromTo(
        descContainerRef.value,
        { y: dir * 12, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }

    // 3. Smooth focus transition on the full-bleed half-circle preview image
    if (previewLensRef.value) {
      gsap.fromTo(
        previewLensRef.value,
        { scale: 1.03, opacity: 0.55 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }

    // 4. Radial swing on the bottom-[60px] tech stack track & node badges
    if (techBarRef.value) {
      gsap.fromTo(
        techBarRef.value,
        { rotation: 2 + dir * 3.5, opacity: 0.45 },
        {
          rotation: 2,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        },
      );

      const badges = techBarRef.value.querySelectorAll(".tech-wheel-badge");
      if (badges.length > 0) {
        gsap.fromTo(
          badges,
          { rotation: -dir * 90, scale: 0.85 },
          {
            rotation: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.025,
            ease: "back.out(1.4)",
            overwrite: "auto",
          },
        );
      }
    }

    barFillProgress.value = 0.2;
    gsap.to(barFillProgress, {
      value: 1,
      duration: 0.45,
      ease: "power2.out",
    });
  },
);

onMounted(() => {
  animatedWheelIndex.value = props.activeIndex;
  updateStageMetrics();
  window.addEventListener("resize", updateStageMetrics, { passive: true });
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateStageMetrics);
  }
});
</script>
