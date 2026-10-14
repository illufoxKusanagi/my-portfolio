<template>
  <section
    class="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-40 py-8 pointer-events-none select-none"
  >
    <div class="w-full mx-auto">
      <!-- Left Content Column -->
      <div
        class="max-w-155 flex flex-col items-start gap-4 sm:gap-5 pointer-events-auto"
      >
        <!-- Chip Badge -->
        <div
          class="inline-flex items-center justify-center px-3.5 sm:px-4 py-1 sm:py-1.5 bg-primary-700 dark:bg-primary-800 rounded-lg shadow-sm"
        >
          <span
            class="font-tech font-normal text-xs sm:text-sm md:text-base text-white tracking-tight"
          >
            {{ $t("hero.badge") }}
          </span>
        </div>

        <!-- Title -->
        <h1
          class="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white transition-colors tracking-tight leading-[1.12] drop-shadow-md"
        >
          {{ $t("hero.titleLine1") }}<br />
          {{ $t("hero.titleLine2") }}
        </h1>

        <!-- Subtitle -->
        <p
          class="font-tech font-normal text-sm sm:text-base md:text-lg lg:text-xl text-white/90 transition-colors leading-relaxed drop-shadow-sm"
        >
          {{ $t("hero.roleLine1") }}<br />
          {{ $t("hero.roleLine2") }}
        </p>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 font-tech font-normal text-xs sm:text-sm md:text-base text-primary-300 transition-colors pointer-events-auto animate-bounce text-center"
    >
      <span>{{ $t("hero.scrollExplore") }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
// Frameless Hero overlay over ThreeCanvas / Hero2DCanvas
</script>
