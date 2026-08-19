<template>
  <section
    id="certificates"
    class="relative w-full min-h-screen bg-purple-200 dark:bg-purple-800 transition-colors duration-500 overflow-hidden font-sans select-none flex flex-col"
  >
    <!-- Heading Block -->
    <div class="pt-24 px-12">
      <div class="flex items-start gap-4">
        <!-- Left Tertiary Accent Bar -->
        <div class="w-2.5 h-14 md:h-16 bg-tertiary-700 mt-1 shrink-0" />

        <div class="space-y-1">
          <h2 class="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-foreground dark:text-white transition-colors tracking-tight leading-none uppercase">
            {{ $t('certificates.title') }}
          </h2>
          <p class="font-tech text-sm sm:text-base text-foreground/70 dark:text-white/70 transition-colors mt-1 font-light uppercase tracking-widest">
            {{ $t('certificates.subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Book Container -->
    <div class="flex-1 flex items-center justify-center px-12 py-8">
      <div ref="bookContainer" class="book-wrapper">
        <div ref="bookEl" class="book-inner">
          <div
            v-for="(cert, i) in CERTIFICATES"
            :key="cert.src"
            class="book-page"
            data-density="hard"
          >
            <div class="page-content">
              <img :src="cert.src" :alt="cert.alt" class="page-image">
              <div
                class="page-overlay"
                :class="{ 'page-overlay--right': i % 2 !== 0 }"
              >
                <button
                  v-if="i % 2 === 0"
                  class="page-nav-btn"
                  @click="flipPrev"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>

                <button class="page-view-btn" @click="openLightbox(i)">
                  {{ $t('certificates.viewMore') }}
                </button>

                <button
                  v-if="i % 2 !== 0"
                  class="page-nav-btn"
                  @click="flipNext"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Placeholder pages for future certificates -->
          <div
            v-for="n in PLACEHOLDER_COUNT"
            :key="`placeholder-${n}`"
            class="book-page"
            data-density="hard"
          >
            <div class="page-content page-content--empty">
              <p class="empty-label">{{ $t('certificates.comingSoon') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Status Bar -->
    <div class="w-full h-[80px] bg-secondary-200 dark:bg-secondary-700 transition-colors duration-500 flex items-center px-[72px] shrink-0">
      <div class="flex items-center gap-6">
        <span class="text-h3 text-foreground dark:text-white font-bold tracking-tight transition-colors">
          {{ $t('certificates.title') }}
        </span>
        <div class="w-[8px] h-[8px] rounded-full bg-primary-300 dark:bg-primary-200" />
        <span
          class="font-tech text-[24px] leading-[30px] text-foreground dark:text-white font-normal transition-colors"
          style="letter-spacing: -0.0075em"
        >
          BNSP
        </span>
      </div>
    </div>

    <!-- Lightbox -->
    <CertificateLightbox
      :open="lightboxOpen"
      :src="activeCert.src"
      :alt="activeCert.alt"
      @close="lightboxOpen = false"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { CERTIFICATES } from "./certificateData";
import { usePageFlip } from "./usePageFlip";
import CertificateLightbox from "./CertificateLightbox.vue";

const PLACEHOLDER_COUNT = 0;

const bookEl = ref<HTMLElement | null>(null);
const bookContainer = ref<HTMLElement | null>(null);

const { flipPrev, flipNext } = usePageFlip(bookEl, bookContainer);

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const activeCert = computed(() => {
  return CERTIFICATES[lightboxIndex.value] || { src: "", alt: "" };
});

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
}
</script>

<style scoped>
.book-wrapper {
  width: 100%;
  max-width: 1000px;
  aspect-ratio: 5 / 3;
  position: relative;
}

.book-inner {
  width: 100%;
  height: 100%;
}

/* ── Page styling ── */
.book-page {
  background: var(--color-purple-100);
  overflow: hidden;
}

.book-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 2;
}

/* ── Spine shadow (center crease) ── */
/* Odd child (left page) - shadow on the right edge */
.book-page:nth-child(odd)::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 48px;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
  z-index: 4;
}

/* Even child (right page) - shadow on the left edge */
.book-page:nth-child(even)::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 48px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
  z-index: 4;
}

.page-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-content--empty {
  align-items: center;
  justify-content: center;
}

.empty-label {
  font-family: var(--font-tech);
  font-size: 16px;
  color: var(--color-secondary-300);
  font-weight: 300;
}

.page-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Page overlay with controls ── */
.page-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%);
  display: flex;
  align-items: flex-end;
  padding: 16px;
  gap: 12px;
  z-index: 3;
}

.page-overlay--right {
  justify-content: flex-end;
}

.page-nav-btn {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: var(--color-primary-700);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.page-nav-btn:hover {
  background: var(--color-primary-600);
}

.page-view-btn {
  height: 36px;
  padding: 0 20px;
  border-radius: 6px;
  background: var(--color-primary-700);
  color: white;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.page-view-btn:hover {
  background: var(--color-primary-600);
}
</style>
