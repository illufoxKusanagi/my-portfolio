<template>
  <Transition name="curtain">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[99999] flex flex-col items-center justify-between p-8 sm:p-12 bg-[#050014] text-white font-sans select-none pointer-events-auto overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Initializing 3D Vehicle Experience"
    >
      <!-- Top HUD Header Bar -->
      <div class="w-full max-w-5xl flex items-center justify-between border-b border-primary-500/20 pb-4">
        <div class="flex items-center gap-3">
          <div class="w-2 h-7 bg-primary-600 rounded-xs" />
          <div>
            <span class="font-sans font-bold text-sm tracking-tight uppercase block leading-tight">
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

      <!-- Center Reticle & Telemetry Unit -->
      <div class="relative flex flex-col items-center max-w-md w-full my-auto space-y-8">
        <!-- 1. Rotating Targeting Reticle -->
        <div class="relative w-40 h-40 flex items-center justify-center">
          <!-- Outer Rotating Dashed Ring -->
          <div
            class="absolute inset-0 rounded-full border-2 border-dashed border-primary-500/70 animate-spin-slow"
          />

          <!-- Inner Reverse Rotating Ring -->
          <div
            class="absolute inset-3 rounded-full border border-dotted border-secondary-400/60 animate-spin-reverse"
          />

          <!-- Center Crosshair Brackets -->
          <div class="absolute inset-7 rounded-full border border-primary-400/30 flex items-center justify-center">
            <span class="font-tech text-xs text-primary-400 font-extrabold animate-pulse">
              +
            </span>
          </div>

          <!-- Live Numerical Percentage -->
          <div class="relative z-10 flex flex-col items-center">
            <span class="font-tech font-extrabold text-3xl sm:text-4xl text-white tracking-wider">
              {{ String(progress).padStart(3, '0') }}%
            </span>
          </div>
        </div>

        <!-- 2. Telemetry Readout & Progress Bar -->
        <div class="w-full space-y-4">
          <!-- Sub-tag Box with Vertical Accent Bar -->
          <div class="flex items-center justify-center gap-3">
            <div class="w-1.5 h-8 bg-primary-600 rounded-full shrink-0" />
            <div class="text-left">
              <span class="font-sans font-bold text-sm text-white uppercase tracking-tight block leading-none">
                3D ASSET COMPILATION
              </span>
              <span class="font-tech text-[11px] text-primary-400 uppercase tracking-widest font-light">
                {{ currentItem }}
              </span>
            </div>
          </div>

          <!-- Cyber Progress Track -->
          <div class="w-full h-2 rounded-full bg-primary-950 border border-primary-800/80 overflow-hidden relative p-0.5">
            <div
              class="h-full bg-primary-500 rounded-full transition-all duration-300 shadow-[0_0_16px_rgba(26,133,255,0.9)]"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>
      </div>

      <!-- Bottom Telemetry Footer -->
      <div class="w-full max-w-5xl flex items-center justify-between border-t border-primary-500/20 pt-4 font-tech text-xs text-primary-400/70">
        <span>PIPELINE: THREE.JS + DRACO</span>
        <span>TARGET: 60 FPS</span>
        <span>STATUS: DECOMPRESSING</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount } from "vue";
import { useThreeLoading } from "./useThreeLoading";

const { isLoading, progress, currentItem } = useThreeLoading();

// Lock scroll while preloader is active
watch(
  isLoading,
  (loading) => {
    if (import.meta.server) return;
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (isLoading.value) {
    document.body.style.overflow = "hidden";
  }
});

onBeforeUnmount(() => {
  if (!import.meta.server) {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 8s linear infinite;
}

/* Smooth curtain slide transition */
.curtain-leave-active {
  transition: transform 0.8s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.6s ease;
}

.curtain-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
