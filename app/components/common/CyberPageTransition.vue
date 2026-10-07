<template>
  <Transition
    :name="transitionName"
    @after-enter="onCoverComplete"
    @after-leave="onRevealComplete"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[99990] select-none overflow-hidden pointer-events-auto"
      aria-hidden="true"
    >
      <!-- Screen-reader announcement for route navigation -->
      <div
        class="sr-only"
        role="status"
        aria-live="polite"
      >
        Navigating to {{ isRootTarget ? 'Home' : currentLink.title }}
      </div>

      <!-- ============================================== -->
      <!-- A. ROOT PAGE CURTAIN: Fall & Reveal Lifecycle -->
      <!-- ============================================== -->
      <template v-if="isRootTarget">
        <div class="absolute inset-0 bg-[#050014] text-white flex flex-col justify-between p-8 sm:p-12 shadow-2xl overflow-hidden">
          <!-- Subtle Scanline texture on root curtain -->
          <div class="absolute inset-0 bg-cyber-scanlines opacity-25 pointer-events-none" />

          <!-- Top HUD Header Bar -->
          <div class="w-full max-w-5xl mx-auto flex items-center justify-between border-b border-primary-500/20 pb-4 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-2 h-7 bg-primary-600 rounded-xs" />
              <div>
                <span class="font-sans font-bold text-sm tracking-tight uppercase block leading-tight text-white">
                  Illufox Kusanagi
                </span>
                <span class="font-tech text-[10px] text-primary-400 uppercase tracking-widest">
                  PORTFOLIO // V2.0 BOOT
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2 font-tech text-xs text-primary-400">
              <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span class="tracking-widest uppercase">WEBGL 2.0</span>
            </div>
          </div>

          <!-- Center Clean Reticle Seam -->
          <div class="my-auto flex flex-col items-center justify-center relative z-10 space-y-4">
            <div class="relative w-24 h-24 flex items-center justify-center">
              <div class="absolute inset-0 rounded-full border border-dashed border-primary-500/60 animate-spin-slow" />
              <div class="absolute inset-2 rounded-full border border-dotted border-secondary-400/50 animate-spin-reverse" />
              <span class="font-tech text-base text-primary-400 font-extrabold animate-pulse">+</span>
            </div>
            <span class="font-tech text-xs tracking-widest text-primary-300 uppercase">
              ENGAGING 3D TELEMETRY
            </span>
          </div>

          <!-- Bottom Telemetry Footer -->
          <div class="w-full max-w-5xl mx-auto flex items-center justify-between border-t border-primary-500/20 pt-4 font-tech text-xs text-primary-400/70 relative z-10">
            <span>PIPELINE: THREE.JS + DRACO</span>
            <span>TARGET: 60 FPS</span>
            <span>STATUS: READY</span>
          </div>
        </div>
      </template>

      <!-- ============================================== -->
      <!-- B. NON-ROOT PAGES: Signature Sector Wipe      -->
      <!-- ============================================== -->
      <template v-else>
        <!-- Leading Accent Layer -->
        <div class="absolute inset-0 bg-primary-700 pointer-events-none" />

        <!-- Main Base Panel -->
        <div class="absolute inset-0 bg-primary-100 dark:bg-primary-950 text-foreground dark:text-white flex flex-row overflow-hidden transition-colors duration-500 shadow-2xl">
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

            <!-- Center Route Identity (Masked text reveal) -->
            <div class="my-auto max-w-2xl w-full">
              <div class="flex items-start gap-3 sm:gap-5">
                <!-- Index Number -->
                <div class="overflow-hidden">
                  <span
                    class="font-tech font-extrabold text-3xl sm:text-5xl md:text-6xl text-primary-600 dark:text-primary-400 block"
                  >
                    {{ currentLink.num }}
                  </span>
                </div>

                <!-- Vertical Accent Bar -->
                <div class="w-1.5 h-12 sm:h-16 md:h-20 bg-primary-700 rounded-full shrink-0 mt-1" />

                <!-- Title & Subtitle Container -->
                <div class="min-w-0 space-y-1 sm:space-y-2">
                  <div class="overflow-hidden">
                    <h1
                      class="font-sans font-bold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-none text-foreground dark:text-white truncate"
                    >
                      {{ currentLink.title }}
                    </h1>
                  </div>

                  <div class="overflow-hidden">
                    <p
                      class="font-tech text-xs sm:text-sm md:text-base text-primary-700 dark:text-primary-400 font-light uppercase tracking-wider sm:tracking-widest truncate"
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
      </template>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePageTransition } from "~/composables/usePageTransition";
import { useNavLinks } from "~/composables/useNavLinks";

const {
  isOpen,
  targetPath,
  onCoverComplete,
  onRevealComplete,
} = usePageTransition();

const { getLinkForPath } = useNavLinks();

const isRootTarget = computed(() => {
  return targetPath.value === "/" || targetPath.value === "";
});

const transitionName = computed(() => {
  return isRootTarget.value ? "curtain-fall" : "sector-wipe";
});

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
</script>

<style scoped>
.writing-vertical {
  writing-mode: vertical-rl;
}

.bg-cyber-scanlines {
  background: linear-gradient(
    rgba(18, 16, 38, 0) 50%,
    rgba(0, 0, 0, 0.6) 50%
  );
  background-size: 100% 4px;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 8s linear infinite;
}

/* ======================================================== */
/* 1. ROOT CURTAIN TRANSITION (curtain-fall)                */
/* Falls from top (-100% to 0), reveals up (0 to -100%)     */
/* ======================================================== */
.curtain-fall-enter-from {
  transform: translateY(-100%);
}

.curtain-fall-enter-active {
  transition: transform 550ms cubic-bezier(0.85, 0, 0.15, 1);
  will-change: transform;
}

.curtain-fall-enter-to {
  transform: translateY(0);
}

.curtain-fall-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.curtain-fall-leave-active {
  transition: transform 700ms cubic-bezier(0.85, 0, 0.15, 1), opacity 500ms ease;
  will-change: transform;
}

.curtain-fall-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* ======================================================== */
/* 2. SECTOR WIPE TRANSITION (sector-wipe)                  */
/* Sweeps from bottom (100% to 0), reveals up (0 to -100%)  */
/* ======================================================== */
.sector-wipe-enter-from {
  transform: translateY(100%);
}

.sector-wipe-enter-active {
  transition: transform 480ms cubic-bezier(0.76, 0, 0.24, 1);
  will-change: transform;
}

.sector-wipe-enter-to {
  transform: translateY(0);
}

.sector-wipe-leave-from {
  transform: translateY(0);
}

.sector-wipe-leave-active {
  transition: transform 560ms cubic-bezier(0.76, 0, 0.24, 1);
  will-change: transform;
}

.sector-wipe-leave-to {
  transform: translateY(-100%);
}

/* ======================================================== */
/* 3. ACCESSIBILITY: REDUCED MOTION                         */
/* ======================================================== */
@media (prefers-reduced-motion: reduce) {
  .curtain-fall-enter-active,
  .curtain-fall-leave-active,
  .sector-wipe-enter-active,
  .sector-wipe-leave-active {
    transition: opacity 180ms ease !important;
    transform: none !important;
  }

  .curtain-fall-enter-from,
  .curtain-fall-leave-to,
  .sector-wipe-enter-from,
  .sector-wipe-leave-to {
    opacity: 0 !important;
    transform: none !important;
  }

  .curtain-fall-enter-to,
  .curtain-fall-leave-from,
  .sector-wipe-enter-to,
  .sector-wipe-leave-from {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
