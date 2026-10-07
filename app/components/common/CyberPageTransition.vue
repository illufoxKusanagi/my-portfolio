<template>
  <div
    v-show="phase !== 'idle'"
    class="fixed inset-0 z-[99990] select-none overflow-hidden pointer-events-auto"
    aria-hidden="true"
  >
    <!-- Screen-reader announcement for route navigation -->
    <div
      class="sr-only"
      role="status"
      aria-live="polite"
    >
      Navigating to {{ currentLink.title }}
    </div>

    <!-- 1. Leading Accent Layer (sweeps first on cover, trails on reveal) -->
    <div
      class="accent-layer absolute inset-0 bg-primary-700 pointer-events-none"
      :class="`state-${phase}`"
    />

    <!-- 2. Main Base Panel (staggered behind accent layer) -->
    <div
      class="base-panel absolute inset-0 bg-primary-100 dark:bg-primary-950 text-foreground dark:text-white flex flex-row overflow-hidden transition-colors duration-500 shadow-2xl"
      :class="`state-${phase}`"
    >
      <!-- Left Signature Accent Strip (identical to NavSidebar) -->
      <div
        class="w-10 sm:w-12 h-full bg-primary-700 flex flex-col items-center justify-between py-6 sm:py-8 shrink-0 select-none z-10"
      >
        <div
          class="writing-vertical font-sans font-bold text-[16px] sm:text-[18px] leading-[22px] sm:leading-[24px] text-white tracking-wider uppercase rotate-180"
        >
          ARIEF SATRIA // 2026
        </div>

        <img
          src="~/assets/images/side_section_icon.svg"
          alt="side icon"
          class="w-[24px] sm:w-[28px] h-[8px]"
        >
      </div>

      <!-- Main Stage: Centered Destination Dossier & Telemetry -->
      <div class="flex-1 h-full flex flex-col justify-between p-6 sm:p-12 md:p-16 relative overflow-hidden">
        <!-- Top Status Bar -->
        <div class="flex items-center justify-between border-b border-primary-300/60 dark:border-primary-800/60 pb-4">
          <div class="flex items-center gap-2 font-tech text-xs text-primary-700 dark:text-primary-400">
            <span class="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse" />
            <span class="tracking-widest uppercase">SYSTEM // ROUTING</span>
          </div>

          <div class="font-tech text-xs text-primary-600 dark:text-primary-400 uppercase tracking-widest">
            SECTOR // {{ currentLink.num }}
          </div>
        </div>

        <!-- Center Route Identity (Snellenberg-style masked text reveal) -->
        <div class="my-auto max-w-2xl w-full">
          <div class="flex items-start gap-3 sm:gap-5">
            <!-- Index Number -->
            <div class="overflow-hidden">
              <span
                class="font-tech font-extrabold text-3xl sm:text-5xl md:text-6xl text-primary-600 dark:text-primary-400 block transition-transform duration-500 ease-out"
                :class="isTextRevealed ? 'translate-y-0' : 'translate-y-full'"
              >
                {{ currentLink.num }}
              </span>
            </div>

            <!-- Vertical Accent Bar -->
            <div class="w-1.5 h-12 sm:h-16 md:h-20 bg-primary-700 rounded-full shrink-0 mt-1" />

            <!-- Title & Subtitle Mask Container -->
            <div class="min-w-0 space-y-1 sm:space-y-2">
              <div class="overflow-hidden">
                <h1
                  class="font-sans font-bold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-none text-foreground dark:text-white transition-transform duration-500 ease-out delay-75 truncate"
                  :class="isTextRevealed ? 'translate-y-0' : 'translate-y-full'"
                >
                  {{ currentLink.title }}
                </h1>
              </div>

              <div class="overflow-hidden">
                <p
                  class="font-tech text-xs sm:text-sm md:text-base text-primary-700 dark:text-primary-400 font-light uppercase tracking-wider sm:tracking-widest transition-transform duration-500 ease-out delay-150 truncate"
                  :class="isTextRevealed ? 'translate-y-0' : 'translate-y-full'"
                >
                  {{ currentLink.subtitle }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Route Index & Tracker -->
        <div class="flex items-center justify-between border-t border-primary-300/60 dark:border-primary-800/60 pt-4 font-tech text-xs text-primary-700/70 dark:text-primary-400/70">
          <span class="tracking-widest uppercase">DESTINATION: {{ currentLink.path }}</span>
          <span class="font-bold tracking-widest">{{ currentLink.num }} / 04</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePageTransition } from "~/composables/usePageTransition";
import { useNavLinks } from "~/composables/useNavLinks";

const { phase, targetPath } = usePageTransition();
const { getLinkForPath } = useNavLinks();

const currentLink = computed(() => {
  const found = getLinkForPath(targetPath.value);
  if (found) return found;

  const clean = targetPath.value.replace(/\/+$/, "") || "/";
  const segment = clean.split("/").filter(Boolean).pop()?.toUpperCase() || "NODE";
  return {
    num: "XX",
    title: segment,
    subtitle: "DIRECT NAVIGATION",
    path: targetPath.value,
  };
});

const isTextRevealed = computed(() => {
  return phase.value === "covered" || phase.value === "covering";
});
</script>

<style scoped>
.writing-vertical {
  writing-mode: vertical-rl;
}

.accent-layer,
.base-panel {
  will-change: transform;
}

/* 1. IDLE: Prepared below the viewport with zero animation overhead */
.accent-layer.state-idle,
.base-panel.state-idle {
  transform: translateY(100%);
  transition: none;
}

/* 2. COVERING: Accent layer leads by 70ms, base panel follows */
.accent-layer.state-covering {
  transform: translateY(0);
  transition: transform 480ms cubic-bezier(0.76, 0, 0.24, 1);
}

.base-panel.state-covering {
  transform: translateY(0);
  transition: transform 480ms cubic-bezier(0.76, 0, 0.24, 1) 70ms;
}

/* 3. COVERED: Held at resting center position */
.accent-layer.state-covered,
.base-panel.state-covered {
  transform: translateY(0);
  transition: none;
}

/* 4. REVEALING: Base panel exits upward first, accent layer trails by 70ms */
.base-panel.state-revealing {
  transform: translateY(-100%);
  transition: transform 560ms cubic-bezier(0.76, 0, 0.24, 1);
}

.accent-layer.state-revealing {
  transform: translateY(-100%);
  transition: transform 560ms cubic-bezier(0.76, 0, 0.24, 1) 70ms;
}

/* Accessibility: graceful cross-fade without vertical translation */
@media (prefers-reduced-motion: reduce) {
  .accent-layer,
  .base-panel {
    transform: none !important;
  }

  .accent-layer.state-idle,
  .base-panel.state-idle {
    opacity: 0;
    transition: opacity 160ms ease;
  }

  .accent-layer.state-covering,
  .base-panel.state-covering,
  .accent-layer.state-covered,
  .base-panel.state-covered {
    opacity: 1;
    transition: opacity 160ms ease;
  }

  .accent-layer.state-revealing,
  .base-panel.state-revealing {
    opacity: 0;
    transition: opacity 180ms ease;
  }
}
</style>
