<template>
  <main
    class="relative w-full bg-purple-700 transition-colors duration-500 overflow-hidden"
  >
    <!-- Layer 3: WebGL 3D Interactive Canvas -->
    <ThreeCanvas :is-active="isCanvasActive" />

    <!-- Layer 2b: Pre-rendered GTR loop video (2D mode background, below constellation) -->
    <HeroVideoBackground :is-active="is2DCanvasActive" />

    <!-- Layer 2a: 2D Interactive Cyber Constellation Canvas -->
    <Hero2DCanvas :is-active="is2DCanvasActive" />

    <!-- Hero Section (Observed for scroll-freeze viewport optimization) -->
    <div ref="heroContainer" class="relative w-full h-screen overflow-hidden">
      <HeroSection />
    </div>

    <!-- 3 Vertical Tech-Stack Sections (Frameworks, Tools, Languages) -->
    <TechSection
      v-for="category in TECH_CATEGORIES"
      :key="category.id"
      :category="category"
    />

    <!-- Featured Projects Section (Figma Node 22:265) -->
    <ProjectsSection />

    <!-- Experience Section (Figma Node 29:3) -->
    <ExperienceSection />

    <!-- Awards and Certificates Section (Figma Node 32:26) -->
    <CertificatesSection />

    <!-- Contact Section -->
    <ContactSection />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRenderMode } from "@/composables/useRenderMode";
import ThreeCanvas from "@/components/three/ThreeCanvas.vue";
import Hero2DCanvas from "@/components/hero/Hero2DCanvas.vue";
import HeroVideoBackground from "@/components/hero/HeroVideoBackground.vue";
import HeroSection from "@/components/hero/HeroSection.vue";

import { TECH_CATEGORIES } from "@/components/tech-stack/techData";
import TechSection from "@/components/tech-stack/TechSection.vue";
import ProjectsSection from "@/components/projects/ProjectsSection.vue";
import ExperienceSection from "@/components/experience/ExperienceSection.vue";
import CertificatesSection from "@/components/certificates/CertificatesSection.vue";
import ContactSection from "@/components/contact/ContactSection.vue";

const renderMode = useRenderMode();
const heroContainer = ref<HTMLElement | null>(null);

const isHeroVisible = ref(true);

let observer: IntersectionObserver | null = null;

const isCanvasActive = computed(() => {
  return renderMode.value === "3D" && isHeroVisible.value;
});

const is2DCanvasActive = computed(() => {
  return renderMode.value === "2D" && isHeroVisible.value;
});

onMounted(() => {
  if (heroContainer.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisible.value = entry.isIntersecting;
        });
      },
      {
        threshold: 0.01, // Pause rendering as soon as Hero leaves viewport
      },
    );

    observer.observe(heroContainer.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>
