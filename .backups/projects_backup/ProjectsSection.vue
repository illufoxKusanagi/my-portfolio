<template>
  <section
    ref="sectionRef"
    id="projects"
    class="relative w-full h-screen bg-tertiary-50 dark:bg-tertiary-900 transition-colors duration-500 overflow-hidden font-sans"
  >
    <!-- Left arc decoration -->
    <img
      src="~/assets/images/projects_left_side.svg"
      alt=""
      class="absolute pointer-events-none z-0"
      style="left: -19.09vw; top: -6.39vw; width: 50.34vw; height: auto"
    />

    <!-- Section heading (upright, top-left) -->
    <div
      class="absolute z-50 flex items-start gap-4"
      style="top: 9%; left: 3.3%"
    >
      <div class="w-5 h-8 bg-primary-400 clip-polygon mt-1 shrink-0" />
      <div>
        <h2 class="text-h1 text-tertiary-900 dark:text-white transition-colors">PROJECTS</h2>
        <p class="text-desc-regular text-tertiary-800 dark:text-white/90 transition-colors mt-2">
          Projects i have built
        </p>
      </div>
    </div>

    <!-- Blue background shape (Figma SVG vector) -->
    <img
      src="~/assets/images/projects_blue_bg.svg"
      alt=""
      class="absolute z-10 pointer-events-none"
      style="left: 6.11vw; top: -28.8vw; width: 90.59vw; height: auto"
    />

    <!-- Frame 14 translucent overlay (dynamic div styled with exact Figma coordinates scaled to viewport width) -->
    <div
      class="absolute z-12 pointer-events-none bg-[rgba(223,238,255,0.3)]"
      style="
        left: -13.73vw;
        top: -28.47vw;
        width: 122.82vw;
        height: 85.82vw;
        transform: rotate(-30deg);
        transform-origin: top left;
      "
    />

    <!-- Rotated content group -->
    <div
      ref="cardGroupRef"
      class="absolute z-20"
      style="
        left: 23%;
        top: 4%;
        transform: scale(0.68) rotate(-30deg);
        transform-origin: top left;
      "
    >
      <ProjectCard :project="singleProject" />
    </div>

    <!-- Car cutout (upright, foreground) -->
    <img
      ref="carRef"
      src="/images/gtr_car_cutout.png"
      alt=""
      class="absolute z-40 pointer-events-none"
      style="left: -14.38vw; top: 20.97vw; width: 45.1vw; height: auto"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA } from "./projectsData";
import ProjectCard from "./ProjectCard.vue";

const sectionRef = ref<HTMLElement | null>(null);
const carRef = ref<HTMLElement | null>(null);
const cardGroupRef = ref<HTMLElement | null>(null);

const singleProject = computed(() => PROJECTS_DATA[0]!);

let ctx: gsap.Context | null = null;

onMounted(() => {
  if (import.meta.server || !sectionRef.value) return;

  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    if (carRef.value) {
      gsap.to(carRef.value, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (cardGroupRef.value) {
      gsap.to(cardGroupRef.value, {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<style scoped>
.clip-polygon {
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}
</style>
