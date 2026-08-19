<template>
  <!--
    Phase 5 — 2D Mode Video Fallback Layer
    Layer stack (bottom to top when 2D mode active):
      1. CSS gradient (always rendered — failsafe for iOS Low Power Mode autoplay block)
      2. <video> GTR loop (rendered when src exists and isActive)
  -->
  <div
    class="video-bg-wrap"
    :class="{ 'video-bg-hidden': !isActive }"
    aria-hidden="true"
  >
    <!-- Layer 1: Static CSS gradient failsafe -->
    <div class="video-bg-gradient" />

    <!-- Layer 2: GTR loop video -->
    <video
      ref="videoRef"
      class="video-bg-element"
      src="/videos/gtr_loop.webm"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";

const props = withDefaults(
  defineProps<{
    isActive?: boolean;
  }>(),
  {
    isActive: false,
  }
);

const videoRef = ref<HTMLVideoElement | null>(null);

const ensurePlaying = async () => {
  await nextTick();
  const el = videoRef.value;
  if (!el) return;
  try {
    el.muted = true;
    el.defaultMuted = true;
    if (el.paused) {
      await el.play();
    }
  } catch (err) {
    // Autoplay blocked by browser policy
  }
};

watch(
  () => props.isActive,
  (active) => {
    const el = videoRef.value;
    if (!el) return;
    if (active) {
      ensurePlaying();
    } else {
      el.pause();
    }
  },
  { immediate: true }
);

onMounted(() => {
  ensurePlaying();
});
</script>

<style scoped>
.video-bg-wrap {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.video-bg-hidden {
  opacity: 0;
  pointer-events: none;
}

/* Layer 1 — always-visible gradient failsafe */
.video-bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--color-primary-950) 0%,
    var(--color-secondary-950) 50%,
    var(--color-purple-900) 100%
  );
  z-index: 0;
}

/* Layer 2 — video fills the frame, object-fit preserves GTR framing */
.video-bg-element {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
  opacity: 0.85;
}
</style>
