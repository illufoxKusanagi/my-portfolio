<template>
  <section
    class="absolute inset-0 z-10 flex flex-col justify-center px-40 py-8"
  >
    <div class="w-full mx-auto">
      <!-- Left Content Column -->
      <div
        class="max-w-155 flex flex-col items-start gap-5 pointer-events-auto"
      >
        <!-- Chip Badge -->
        <div
          class="inline-flex items-center justify-center px-4 py-1.5 bg-primary-700 dark:bg-primary-800 rounded-lg shadow-sm"
        >
          <span
            class="font-tech font-normal text-sm sm:text-base text-white tracking-tight"
          >
            {{ $t("hero.badge") }}
          </span>
        </div>

        <!-- Title -->
        <h1
          class="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-white transition-colors tracking-tight leading-[1.12]"
        >
          {{ $t("hero.titleLine1") }}<br />
          {{ $t("hero.titleLine2") }}
        </h1>

        <!-- Subtitle -->
        <p
          class="font-tech font-normal text-base sm:text-lg md:text-xl text-foreground/80 dark:text-white/90 transition-colors leading-relaxed"
        >
          {{ $t("hero.roleLine1") }}<br />
          {{ $t("hero.roleLine2") }}
        </p>
      </div>
    </div>
    <!-- <ThreeCanvas /> -->
    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 font-tech font-normal text-sm sm:text-base text-primary-600 dark:text-primary-300 transition-colors pointer-events-auto animate-bounce"
    >
      <span>{{ $t("hero.scrollExplore") }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import ThreeCanvas from "../three/ThreeCanvas.vue";
</script>
