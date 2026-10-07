<template>
  <Transition
    :name="transitionName"
    :duration="transitionDuration"
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

      <!-- ======================================================== -->
      <!-- A. ROOT PAGE: Kinetic Dual Blast Shutters & Laser Seam   -->
      <!-- ======================================================== -->
      <template v-if="isRootTarget">
        <!-- 1. Top Shutter Blade (Drops down from ceiling) -->
        <div
          class="shutter-blade shutter-top absolute top-0 left-0 w-full h-1/2 bg-[#050014] border-b border-primary-500/40 flex flex-col justify-between p-6 sm:p-10 pb-4 overflow-hidden z-20 shadow-2xl"
        >
          <div class="absolute inset-0 bg-cyber-scanlines opacity-25 pointer-events-none" />

          <!-- Top HUD Header Bar -->
          <div class="w-full max-w-5xl mx-auto flex items-center justify-between border-b border-primary-500/20 pb-3 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-2 h-6 bg-primary-600 rounded-xs" />
              <div>
                <span class="font-sans font-bold text-xs sm:text-sm tracking-tight uppercase block leading-tight text-white">
                  Illufox Kusanagi
                </span>
                <span class="font-tech text-[9px] sm:text-[10px] text-primary-400 uppercase tracking-widest">
                  PORTFOLIO // V2.0 BOOT
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2 font-tech text-xs text-primary-400">
              <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span class="tracking-widest uppercase">WEBGL 2.0</span>
            </div>
          </div>

          <!-- Bottom edge laser accent guide -->
          <div class="h-px w-full bg-gradient-to-r from-transparent via-primary-500/40 to-transparent relative z-10" />
        </div>

        <!-- 2. Bottom Shutter Blade (Rises up from floor) -->
        <div
          class="shutter-blade shutter-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#050014] border-t border-primary-500/40 flex flex-col justify-between p-6 sm:p-10 pt-4 overflow-hidden z-20 shadow-2xl"
        >
          <div class="absolute inset-0 bg-cyber-scanlines opacity-25 pointer-events-none" />

          <!-- Top edge laser accent guide -->
          <div class="h-px w-full bg-gradient-to-r from-transparent via-primary-500/40 to-transparent relative z-10" />

          <!-- Bottom Telemetry Footer -->
          <div class="w-full max-w-5xl mx-auto flex items-center justify-between border-t border-primary-500/20 pt-3 font-tech text-[10px] sm:text-xs text-primary-400/70 relative z-10">
            <span>PIPELINE: THREE.JS + DRACO</span>
            <span>TARGET: 60 FPS</span>
            <span>STATUS: ENGAGED</span>
          </div>
        </div>

        <!-- 3. Center Laser Beam Flare (Ignites horizontally when blades clamp shut) -->
        <div class="laser-beam absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none z-30">
          <div class="w-full h-[2px] bg-primary-400 shadow-[0_0_24px_rgba(26,133,255,1),0_0_48px_rgba(26,133,255,0.8)]" />
        </div>

        <!-- 4. Center Targeting Reticle Unit (Independent rotating telemetry) -->
        <div class="reticle-unit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none flex flex-col items-center justify-center space-y-3">
          <div class="relative w-28 h-28 flex items-center justify-center">
            <!-- Outer dashed ring (clockwise) -->
            <div class="absolute inset-0 rounded-full border border-dashed border-primary-500/70 animate-spin-slow" />
            <!-- Inner dotted ring (counter-clockwise) -->
            <div class="absolute inset-3 rounded-full border border-dotted border-secondary-400/60 animate-spin-reverse" />
            <!-- Center Crosshair brackets -->
            <div class="absolute inset-7 rounded-full border border-primary-400/30 flex items-center justify-center">
              <span class="font-tech text-base text-primary-400 font-extrabold animate-pulse">+</span>
            </div>
          </div>

          <div class="px-3.5 py-1 bg-[#050014]/95 border border-primary-500/60 rounded-xs shadow-[0_0_20px_rgba(26,133,255,0.4)]">
            <span class="font-tech text-[10px] sm:text-xs tracking-widest text-primary-300 uppercase font-semibold">
              // TELEMETRY LOCK //
            </span>
          </div>
        </div>
      </template>

      <!-- ======================================================== -->
      <!-- B. NON-ROOT PAGES: Signature Sector Wipe                 -->
      <!-- ======================================================== -->
      <template v-else>
        <!-- Leading Accent Layer -->
        <div class="sector-accent absolute inset-0 bg-primary-700 pointer-events-none" />

        <!-- Main Base Panel -->
        <div class="sector-panel absolute inset-0 bg-primary-100 dark:bg-primary-950 text-foreground dark:text-white flex flex-row overflow-hidden transition-colors duration-500 shadow-2xl">
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
  return isRootTarget.value ? "cyber-shutter" : "sector-wipe";
});

const transitionDuration = computed(() => {
  return isRootTarget.value
    ? { enter: 550, leave: 650 }
    : { enter: 550, leave: 650 };
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

.shutter-blade,
.laser-beam,
.reticle-unit,
.sector-accent,
.sector-panel {
  will-change: transform, opacity;
}

/* ======================================================== */
/* 1. KINETIC CYBER SHUTTER: Dual Blades, Laser, Reticle    */
/* ======================================================== */

/* Root transition timing synchronization */
.cyber-shutter-enter-active {
  transition: opacity 550ms ease;
}
.cyber-shutter-leave-active {
  transition: opacity 650ms ease;
}

/* Top blade enters from ceiling (-100% to 0) */
.cyber-shutter-enter-from .shutter-top {
  transform: translateY(-100%);
}
.cyber-shutter-enter-active .shutter-top {
  transition: transform 520ms cubic-bezier(0.85, 0, 0.15, 1);
}
.cyber-shutter-enter-to .shutter-top {
  transform: translateY(0);
}

/* Top blade exits upward (0 to -100%) */
.cyber-shutter-leave-from .shutter-top {
  transform: translateY(0);
}
.cyber-shutter-leave-active .shutter-top {
  transition: transform 620ms cubic-bezier(0.85, 0, 0.15, 1);
}
.cyber-shutter-leave-to .shutter-top {
  transform: translateY(-100%);
}

/* Bottom blade enters from floor (100% to 0) */
.cyber-shutter-enter-from .shutter-bottom {
  transform: translateY(100%);
}
.cyber-shutter-enter-active .shutter-bottom {
  transition: transform 520ms cubic-bezier(0.85, 0, 0.15, 1);
}
.cyber-shutter-enter-to .shutter-bottom {
  transform: translateY(0);
}

/* Bottom blade exits downward (0 to 100%) */
.cyber-shutter-leave-from .shutter-bottom {
  transform: translateY(0);
}
.cyber-shutter-leave-active .shutter-bottom {
  transition: transform 620ms cubic-bezier(0.85, 0, 0.15, 1);
}
.cyber-shutter-leave-to .shutter-bottom {
  transform: translateY(100%);
}

/* Center Laser Beam Flare (Scales horizontally upon contact) */
.cyber-shutter-enter-from .laser-beam {
  transform: translateY(-50%) scaleX(0);
  opacity: 0;
}
.cyber-shutter-enter-active .laser-beam {
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1) 280ms, opacity 240ms ease 260ms;
}
.cyber-shutter-enter-to .laser-beam {
  transform: translateY(-50%) scaleX(1);
  opacity: 1;
}

.cyber-shutter-leave-from .laser-beam {
  transform: translateY(-50%) scaleX(1);
  opacity: 1;
}
.cyber-shutter-leave-active .laser-beam {
  transition: transform 240ms ease, opacity 200ms ease;
}
.cyber-shutter-leave-to .laser-beam {
  transform: translateY(-50%) scaleX(0);
  opacity: 0;
}

/* Center Reticle Badge (Pops in with scale and fades on leave) */
.cyber-shutter-enter-from .reticle-unit {
  transform: translate(-50%, -50%) scale(0.7);
  opacity: 0;
}
.cyber-shutter-enter-active .reticle-unit {
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1) 240ms, opacity 280ms ease 220ms;
}
.cyber-shutter-enter-to .reticle-unit {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.cyber-shutter-leave-from .reticle-unit {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}
.cyber-shutter-leave-active .reticle-unit {
  transition: transform 260ms ease, opacity 220ms ease;
}
.cyber-shutter-leave-to .reticle-unit {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
}

/* ======================================================== */
/* 2. SECTOR WIPE (Sweeps up from bottom, lifts upward)    */
/* ======================================================== */

/* Sector wipe root transition timing */
.sector-wipe-enter-active {
  transition: opacity 550ms ease;
}
.sector-wipe-leave-active {
  transition: opacity 650ms ease;
}

.sector-wipe-enter-from .sector-accent,
.sector-wipe-enter-from .sector-panel {
  transform: translateY(100%);
}
.sector-wipe-enter-active .sector-accent {
  transition: transform 480ms cubic-bezier(0.76, 0, 0.24, 1);
}
.sector-wipe-enter-active .sector-panel {
  transition: transform 480ms cubic-bezier(0.76, 0, 0.24, 1) 70ms;
}
.sector-wipe-enter-to .sector-accent,
.sector-wipe-enter-to .sector-panel {
  transform: translateY(0);
}

.sector-wipe-leave-from .sector-accent,
.sector-wipe-leave-from .sector-panel {
  transform: translateY(0);
}
.sector-wipe-leave-active .sector-panel {
  transition: transform 560ms cubic-bezier(0.76, 0, 0.24, 1);
}
.sector-wipe-leave-active .sector-accent {
  transition: transform 560ms cubic-bezier(0.76, 0, 0.24, 1) 70ms;
}
.sector-wipe-leave-to .sector-accent,
.sector-wipe-leave-to .sector-panel {
  transform: translateY(-100%);
}

/* ======================================================== */
/* 3. ACCESSIBILITY: REDUCED MOTION                         */
/* ======================================================== */
@media (prefers-reduced-motion: reduce) {
  .shutter-top,
  .shutter-bottom,
  .laser-beam,
  .reticle-unit,
  .sector-accent,
  .sector-panel {
    transform: none !important;
    transition: opacity 180ms ease !important;
  }
}
</style>
