<template>
  <div
    class="hidden md:block relative w-full h-full overflow-hidden bg-purple-100 dark:bg-secondary-950 transition-colors duration-500"
  >
    <!-- =================================================================== -->
    <!-- VIEWPORT-ADAPTIVE 900px-HEIGHT FLEX STAGE                           -->
    <!-- Uses pure Flexbox centering (`flex items-center`) so the Left Hub   -->
    <!-- and 2x Preview Image are always vertically centered without any     -->
    <!-- arbitrary top/bottom offsets.                                       -->
    <!-- =================================================================== -->
    <div
      class="absolute left-0 top-0 h-[900px] origin-top-left overflow-hidden flex items-center"
      :style="{
        width: `${stageWidth}px`,
        transform: `scale(${stageScale})`,
      }"
    >
      <!-- ================================================================= -->
      <!-- LAYER 1 (z-10): CONCENTRIC POLAR FAN & -14deg PROJECT SPINE       -->
      <!-- Shares the exact same Flex Column + 640x640px Hub box as Layer 2  -->
      <!-- so the Polar Fan and Spine Pivot are 100% concentric with the     -->
      <!-- 576x576px Preview Image by pure Flexbox layout.                   -->
      <!-- ================================================================= -->
      <div class="absolute inset-0 flex items-center pointer-events-none z-10">
        <div
          class="h-full pl-6 pt-10 flex flex-col items-center justify-center self-center"
        >
          <div
            class="relative w-[640px] h-[640px] flex items-center justify-center self-center"
          >
            <!-- 1A. Outer Polar Rim Circle (Concentric Flex Child) -->
            <div
              class="absolute rounded-full bg-purple-300/60 dark:bg-secondary-900 border border-purple-500/35 dark:border-tertiary-400/30 transition-colors duration-500 shrink-0"
              :style="{
                width: `${fanDiameter + 360}px`,
                height: `${fanDiameter + 360}px`,
              }"
            ></div>

            <!-- 1B. Main Royal-Blue Polar Fan Circle (Concentric Flex Child) -->
            <div
              class="absolute rounded-full bg-purple-200 dark:bg-secondary-700 border border-purple-500/45 dark:border-tertiary-400/45 transition-colors duration-500 shrink-0"
              :style="{
                width: `${fanDiameter}px`,
                height: `${fanDiameter}px`,
              }"
            ></div>

            <!-- 1C. Scroll-Driven Rotating Polar Wheel SVG (Concentric Flex Child) -->
            <svg
              viewBox="-1400 -1400 2800 2800"
              class="absolute w-[2800px] h-[2800px] shrink-0 overflow-visible"
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
                    x1="320"
                    y1="0"
                    x2="1320"
                    y2="0"
                    :transform="`rotate(${(n - 1) * 15})`"
                  />
                </g>

                <circle
                  cx="0"
                  cy="0"
                  r="490"
                  fill="none"
                  class="stroke-purple-600/30 dark:stroke-tertiary-400/30"
                  stroke-width="1.5"
                  stroke-dasharray="60 24"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="750"
                  fill="none"
                  class="stroke-purple-600/25 dark:stroke-tertiary-400/25"
                  stroke-width="1.2"
                  stroke-dasharray="100 36"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="1030"
                  fill="none"
                  class="stroke-purple-600/20 dark:stroke-tertiary-400/22"
                  stroke-width="1.2"
                  stroke-dasharray="140 48"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="1260"
                  fill="none"
                  class="stroke-purple-700/35 dark:stroke-tertiary-300/35"
                  stroke-width="2"
                  stroke-dasharray="180 44"
                />
              </g>
            </svg>

            <!-- 1D. Top-Left Angled Mask Above the -14deg Spine -->
            <!-- <div class="absolute w-0 h-0 -rotate-[14deg]">
              <div
                class="absolute -left-[1500px] bottom-[116px] w-[4600px] h-[2200px] bg-purple-100 dark:bg-secondary-950 transition-colors duration-500"
              ></div>
              <div
                class="absolute left-[280px] bottom-[116px] w-[640px] h-[1200px] origin-bottom-left skew-x-[14deg] bg-purple-200/85 dark:bg-secondary-800/85 border-r border-purple-500/30 dark:border-tertiary-400/25 transition-colors duration-500"
              ></div>
            </div> -->

            <!-- 1E. Gentle -14deg Spine (Title Band + Description) Anchored to Hub Center -->
            <div
              ref="spineArmRef"
              class="absolute w-0 h-0 -rotate-[11deg] z-20 pointer-events-none"
            >
              <!-- Upper Title Band (h-[116px]) -->
              <div
                class="absolute left-0 bottom-0 w-[3400px] h-[116px] bg-purple-600 dark:bg-primary-800 border-y border-white/30 dark:border-tertiary-400/50 transition-colors duration-500"
              >
                <!-- <div class="absolute inset-0 flex pointer-events-none">
                  <div class="w-[560px] h-full border-r border-white/10"></div>
                  <div class="w-[260px] h-full border-r border-white/10"></div>
                  <div class="w-[260px] h-full border-r border-white/10"></div>
                </div> -->

                <!-- Project Index Tag Above Band -->
                <div
                  class="absolute -top-7 left-[380px] flex items-center gap-2"
                >
                  <!-- <span
                    class="w-4 h-4 bg-purple-950 dark:bg-secondary-950 border border-white/80 flex items-center justify-center font-tech text-[10px] font-bold text-white"
                  >
                    X
                  </span> -->
                  <span
                    class="font-tech text-base font-bold tracking-wider text-purple-950 dark:text-tertiary-200 uppercase whitespace-nowrap"
                  >
                    {{ projectLabel }} // {{ formattedActiveIndex }} OF
                    {{ formattedTotal }}
                  </span>
                </div>

                <!-- Project Title, Subtitle & Progress Line (u = 380..1060px) -->
                <div
                  class="ml-92 w-170 h-full flex flex-col justify-center px-4 py-2"
                >
                  <h3
                    class="font-sans font-extrabold text-3xl text-white uppercase tracking-tight leading-none"
                  >
                    {{ activeProjectTitle }}
                  </h3>

                  <p
                    class="font-tech font-medium text-xs text-purple-100 dark:text-tertiary-200 tracking-wide mt-1.5"
                  >
                    {{ activeProjectSubtitle }}
                  </p>

                  <div class="flex items-center gap-2 mt-2.5">
                    <div
                      class="flex-1 h-1 bg-white/25 relative overflow-hidden"
                    >
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

              <!-- Lower Project Description & Action Links (-14deg) -->
              <div
                ref="descContainerRef"
                class="ml-96 mt-28 w-160 pointer-events-auto rotate-6"
              >
                <div
                  class="border-l-2 border-purple-700 dark:border-tertiary-400 pl-3.5 py-0.5"
                >
                  <p
                    class="font-sans text-base text-purple-950/90 dark:text-white/95 leading-relaxed"
                  >
                    {{ activeProjectDescription }}
                  </p>
                </div>

                <div class="flex flex-wrap items-center gap-3 mt-3.5 pl-3.5">
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
                    v-if="
                      activeProject.repoUrl && activeProject.repoUrl !== '-'
                    "
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
          </div>

          <!-- Matching 40px spacer so Layer 1 and Layer 2 Flex centers are 100% identical -->
          <div class="mt-4 h-10"></div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- LAYER 2 (z-30): PURE-FLEXBOX CENTERED HUB & 2x PREVIEW IMAGE      -->
      <!-- Zero top/bottom positioning: centered by `flex items-center       -->
      <!-- justify-center self-center` and `m-auto`!                         -->
      <!-- ================================================================= -->
      <div
        class="relative h-full pl-6 pt-10 flex flex-col items-center justify-center self-center z-30 pointer-events-none"
      >
        <!-- 640x640px Concentric Hub Container -->
        <div
          class="relative size-160 flex items-center justify-center self-center"
        >
          <!-- 2A. True Mechanical Rotating Wheel for Project Indexes (680x680px concentric flex child) -->
          <!-- Every project sits on a fixed-angle spoke (`inset-0 flex items-center justify-end`)       -->
          <!-- while the wheel container itself rotates via `wheelRingRotation`. Nodes never fly off!    -->
          <div
            class="absolute size-170 rounded-full border border-dashed border-purple-500/40 dark:border-tertiary-400/40 flex items-center justify-center pointer-events-none z-30"
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

          <!-- 2B. Outer Hub Base Circle (640x640px concentric flex child) -->
          <div
            class="absolute inset-0 rounded-full bg-purple-100 dark:bg-secondary-900 border border-purple-500/65 dark:border-tertiary-400/65 shadow-xl transition-colors duration-500 z-10"
          ></div>

          <!-- 2C. Rotating Caliper Ring SVG (640x640px concentric flex child) -->
          <svg
            viewBox="-320 -320 640 640"
            class="absolute inset-0 w-full h-full pointer-events-none z-15"
            aria-hidden="true"
          >
            <g :transform="`rotate(${wheelAngle})`">
              <circle
                cx="0"
                cy="0"
                r="304"
                fill="none"
                class="stroke-purple-600 dark:stroke-tertiary-400"
                stroke-opacity="0.7"
                stroke-width="2.5"
                stroke-dasharray="72 36 18 36"
              />
              <g
                class="stroke-purple-700 dark:stroke-tertiary-300"
                stroke-opacity="0.6"
                stroke-width="1.5"
              >
                <line
                  v-for="tick in 12"
                  :key="'hub-tick-' + tick"
                  x1="292"
                  y1="0"
                  x2="312"
                  y2="0"
                  :transform="`rotate(${(tick - 1) * 30})`"
                />
              </g>
            </g>
          </svg>

          <!-- 2D. 2.0x Enlarged Circular Preview Image (576x576px = 2 * 288px!) -->
          <!-- Centered purely via Flexbox (`m-auto self-center flex items-center justify-center`) -->
          <div
            ref="previewLensRef"
            class="relative z-20 size-144 m-auto self-center rounded-full overflow-hidden bg-purple-950 dark:bg-secondary-950 border-2 border-purple-500 dark:border-tertiary-400 flex items-center justify-center pointer-events-auto group"
          >
            <img
              :src="activeProject.previewImage"
              :alt="activeProjectTitle"
              class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <!-- 2E. Prev & Rotate Next Controls in Pure Flex Column Flow (`mt-4 self-center`) -->
        <div
          class="mt-4 h-10 flex items-center justify-center self-center gap-2.5 pointer-events-auto z-40 whitespace-nowrap"
        >
          <button
            type="button"
            class="w-10 h-10 rounded-full bg-white text-secondary-950 border border-purple-300 dark:border-secondary-800 shadow-md flex items-center justify-center hover:bg-tertiary-100 transition-transform active:scale-95 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-400"
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
          </button>

          <button
            type="button"
            class="h-10 px-4 rounded-full bg-white text-secondary-950 border border-purple-300 dark:border-secondary-800 shadow-md flex items-center gap-2.5 hover:bg-tertiary-100 transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-400"
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

      <!-- ================================================================= -->
      <!-- LAYER 3 (z-25): BOTTOM TECH STACK WITH RESTORED ROTATION          -->
      <!-- Tilted at `origin-left rotate-[6deg]` along the lower polar spoke -->
      <!-- and rotates in sync with the wheel when switching projects.       -->
      <!-- ================================================================= -->
      <div
        ref="techBarRef"
        class="absolute left-[710px] right-[80px] max-w-[820px] top-[730px] origin-left rotate-[6deg] z-25 pointer-events-auto"
      >
        <div
          class="mb-2.5 flex items-center justify-between font-tech text-[11px] font-bold tracking-wider text-purple-900 dark:text-tertiary-300 uppercase"
        >
          <span>TECHNOLOGIES &bull; {{ activeTechName }}</span>
          <span class="opacity-75"
            >{{ formattedActiveIndex }} / {{ formattedTotal }}</span
          >
        </div>

        <div class="relative w-full">
          <!-- Thin 1px Connector Line Behind Nodes -->
          <div
            v-if="bottomTechNodes.length > 1"
            class="absolute left-4 right-4 top-[18px] h-px bg-purple-600/35 dark:bg-tertiary-400/35 pointer-events-none"
          ></div>

          <!-- Tech Nodes Row (w-9 h-9 circle badge with w-4 h-4 [16px] icon inside) -->
          <div class="relative z-10 flex items-center justify-between">
            <button
              v-for="node in bottomTechNodes"
              :key="'tech-node-' + node.index + '-' + node.name"
              type="button"
              class="group flex flex-col items-center gap-1.5 cursor-pointer focus-visible:outline-none"
              :aria-label="node.name"
              @click="selectedTechIndex = node.index"
            >
              <div
                class="tech-wheel-badge w-9 h-9 rounded-full bg-white flex items-center justify-center transition-transform duration-200"
                :class="
                  node.isSelected
                    ? 'scale-110 border-2 border-purple-600 dark:border-tertiary-400 shadow-sm'
                    : 'border border-purple-400/60 dark:border-tertiary-400/50 opacity-85 group-hover:opacity-100 group-hover:scale-105'
                "
              >
                <img
                  v-if="node.iconUrl"
                  :src="node.iconUrl"
                  :alt="node.name"
                  width="16"
                  height="16"
                  class="w-4 h-4 object-contain"
                />
                <span
                  v-else
                  class="font-tech font-bold text-[9px] text-secondary-950"
                >
                  {{ node.name.slice(0, 3).toUpperCase() }}
                </span>
              </div>

              <span
                class="font-tech text-[10px] tracking-wider uppercase whitespace-nowrap transition-colors duration-200"
                :class="
                  node.isSelected
                    ? 'font-bold text-purple-950 dark:text-white'
                    : 'font-medium text-purple-900/75 dark:text-white/75 group-hover:text-purple-950 dark:group-hover:text-white'
                "
              >
                {{ node.name }}
              </span>
            </button>
          </div>

          <!-- Clean 3px Accent Line -->
          <div
            class="mt-2.5 w-full h-[3px] rounded-full bg-purple-600 dark:bg-tertiary-400 transition-colors duration-500"
          ></div>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- TOP-LEFT & TOP-RIGHT SECTION HEADER (Aligned with TechSection)      -->
    <!-- =================================================================== -->
    <div
      class="absolute left-6 lg:left-8 top-16 z-40 flex items-start gap-3 pointer-events-auto"
    >
      <div
        class="w-2 h-16 bg-purple-600 dark:bg-primary-700 shrink-0 mt-0.5"
      ></div>
      <div>
        <h2
          class="font-sans font-bold text-xl lg:text-5xl text-foreground dark:text-white tracking-tight leading-none uppercase"
        >
          {{ sectionTitle }}
        </h2>
        <p
          class="font-tech text-base text-purple-700 dark:text-tertiary-400 uppercase tracking-widest mt-1"
        >
          SELECTED WORKS AND SYSTEM
        </p>
      </div>
    </div>

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
  Math.max(2560, Math.round(stageWidth.value * 1.52)),
);

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

// Angular step between consecutive projects around the 360deg index wheel
const projectStepDeg = computed(() => {
  return 360 / Math.max(1, props.totalProjects);
});

// Master rotation angle of the 680x680px Project Index Wheel container
// Aligns the active project spoke with the -14deg Project Title Spine
const wheelRingRotation = computed(() => {
  return -14 - animatedWheelIndex.value * projectStepDeg.value;
});

// True rotating wheel spokes: all projects stay mounted at fixed spoke angles
// around the wheel rim (`i * projectStepDeg`), while the parent wheel container
// rotates by `wheelRingRotation`. Nodes can never fly off the circle perimeter.
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
    const isInteractive = absDiff <= 2.15;

    let opacity = 0;
    if (absDiff <= 2.15) {
      opacity = isActive ? 1 : Math.max(0, Math.min(0.9, 1 - absDiff * 0.35));
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
  const scale = Math.min(vh / 900, vw / 1280);
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

    // Shortest-path wheel index target so wrapping 11 -> 01 rotates smoothly
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

    // 1. Wheel-spoke swing on the -14deg spine
    if (spineArmRef.value) {
      gsap.fromTo(
        spineArmRef.value,
        { rotation: -14 + dir * 4.5, opacity: 0.45 },
        {
          rotation: -14,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }

    // 2. Dial rotation on the 576x576 preview image
    if (previewLensRef.value) {
      gsap.fromTo(
        previewLensRef.value,
        { rotation: dir * 10, scale: 0.96, opacity: 0.45 },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }

    // 3. Restored radial rotation on the bottom tech stack spoke & node badges
    if (techBarRef.value) {
      gsap.fromTo(
        techBarRef.value,
        { rotation: 6 + dir * 5, opacity: 0.45 },
        {
          rotation: 6,
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
