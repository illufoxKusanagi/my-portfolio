<template>
  <section
    id="certificates"
    class="relative w-full min-h-screen bg-primary-100 dark:bg-primary-950 transition-colors duration-500 overflow-hidden font-sans select-none flex flex-col justify-between"
  >
    <!-- Heading Block -->
    <div class="pt-16 sm:pt-20 px-4 sm:px-8 md:px-12 shrink-0">
      <div class="flex items-start gap-3 sm:gap-4">
        <!-- Left Primary Accent Bar -->
        <div
          class="w-2 sm:w-2.5 h-10 sm:h-14 md:h-16 bg-primary-700 mt-1 shrink-0"
        />

        <div class="space-y-0.5 sm:space-y-1">
          <h2
            class="font-sans font-bold text-2xl sm:text-4xl md:text-5xl text-foreground dark:text-white transition-colors tracking-tight leading-none uppercase"
          >
            {{ $t("certificates.title") }}
          </h2>
          <p
            class="font-tech text-xs sm:text-sm md:text-base text-primary-700 dark:text-primary-300 transition-colors mt-1 font-light uppercase tracking-widest"
          >
            {{ $t("certificates.subtitle") }}
          </p>
        </div>
      </div>
    </div>

    <!-- Book Container -->
    <div
      class="flex-1 flex items-center justify-center px-4 sm:px-8 md:px-12 py-4 sm:py-6 min-h-0"
    >
      <div
        ref="bookContainer"
        class="book-wrapper"
        :class="`book-wrapper--${currentOrientation}`"
      >
        <div ref="bookEl" class="book-inner">
          <div
            v-for="(cert, i) in CERTIFICATES"
            :key="cert.src"
            class="book-page"
            data-density="hard"
          >
            <div class="page-content bg-white">
              <img
                :src="cert.src"
                :alt="cert.alt"
                class="page-image"
                loading="eager"
              />

              <!-- In-Page Controls -->
              <div
                class="page-overlay"
                :class="
                  i % 2 === 0 ? 'page-overlay--left' : 'page-overlay--right'
                "
              >
                <!-- Prev Button -->
                <button
                  type="button"
                  class="page-nav-btn page-nav-btn--prev"
                  :class="{
                    'opacity-40 pointer-events-none cursor-not-allowed':
                      i === 0,
                  }"
                  :disabled="i === 0"
                  aria-label="Previous certificate"
                  @mousedown.stop
                  @touchstart.stop
                  @pointerdown.stop
                  @click.stop="flipPrev"
                >
                  <svg
                    class="pointer-events-none"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <!-- View More Button -->
                <button
                  type="button"
                  class="page-view-btn"
                  @mousedown.stop
                  @touchstart.stop
                  @pointerdown.stop
                  @click.stop="openLightbox(i)"
                >
                  {{ $t("certificates.viewMore") }}
                </button>

                <!-- Next Button -->
                <button
                  type="button"
                  class="page-nav-btn page-nav-btn--next"
                  :class="{
                    'opacity-40 pointer-events-none cursor-not-allowed':
                      i === CERTIFICATES.length - 1,
                  }"
                  :disabled="i === CERTIFICATES.length - 1"
                  aria-label="Next certificate"
                  @mousedown.stop
                  @touchstart.stop
                  @pointerdown.stop
                  @click.stop="flipNext"
                >
                  <svg
                    class="pointer-events-none"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Status Bar (Preserves exact Figma layout while dynamically showing active issuer) -->
    <div
      class="w-full h-12 sm:h-16 md:h-[80px] bg-primary-200 dark:bg-primary-800 transition-colors duration-500 flex items-center justify-between px-4 sm:px-8 md:px-[72px] shrink-0"
    >
      <div class="flex items-center gap-3 sm:gap-6">
        <span
          class="text-sm sm:text-lg md:text-h3 text-foreground dark:text-white font-bold tracking-tight transition-colors"
        >
          {{ $t("certificates.title") }}
        </span>
        <div
          class="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full bg-primary-600 dark:bg-primary-300"
        />
        <span
          class="font-tech text-sm sm:text-lg md:text-[24px] md:leading-[30px] text-foreground dark:text-white font-normal transition-colors"
          style="letter-spacing: -0.0075em"
        >
          {{ currentSpreadCert.issuer }}
        </span>
      </div>

      <span
        class="font-tech text-xs sm:text-sm text-foreground/70 dark:text-white/70 font-semibold tracking-wider"
      >
        {{ String(currentPageIndex + 1).padStart(2, "0") }} / {{ String(CERTIFICATES.length).padStart(2, "0") }}
      </span>
    </div>

    <!-- Lightbox Modal -->
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

const bookEl = ref<HTMLElement | null>(null);
const bookContainer = ref<HTMLElement | null>(null);

const { flipPrev, flipNext, currentOrientation, currentPageIndex } =
  usePageFlip(bookEl, bookContainer);

const currentSpreadCert = computed(() => {
  return CERTIFICATES[currentPageIndex.value] || CERTIFICATES[0]!;
});

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const activeCert = computed(() => {
  return (
    CERTIFICATES[lightboxIndex.value] || { src: "", alt: "", issuer: "BNSP" }
  );
});

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
}
</script>

<style scoped>
.book-wrapper {
  width: 100%;
  max-width: 960px;
  aspect-ratio: 8 / 5;
  position: relative;
}

.book-wrapper--portrait {
  max-width: 480px;
  aspect-ratio: 4 / 5;
}

.book-inner {
  width: 100%;
  height: 100%;
}

.book-page {
  background: #ffffff;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.book-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 2;
}

.book-page:nth-child(odd)::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 48px;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.04) 30%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;
  z-index: 4;
}

.book-page:nth-child(even)::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 48px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.04) 30%,
    rgba(0, 0, 0, 0) 100%
  );
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

.page-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #ffffff;
}

.page-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 16px 20px;
  gap: 12px;
  z-index: 5;
  pointer-events: none;
}

.book-wrapper--landscape .page-overlay--left,
:deep(.stf__wrapper.--landscape) .page-overlay--left {
  justify-content: flex-start !important;
  padding: 16px 20px !important;
  gap: 12px !important;
}

.book-wrapper--landscape .page-overlay--left .page-nav-btn--next,
:deep(.stf__wrapper.--landscape) .page-overlay--left .page-nav-btn--next {
  display: none !important;
}

.book-wrapper--landscape .page-overlay--right,
:deep(.stf__wrapper.--landscape) .page-overlay--right {
  justify-content: flex-end !important;
  padding: 16px 20px !important;
  gap: 12px !important;
}

.book-wrapper--landscape .page-overlay--right .page-nav-btn--prev,
:deep(.stf__wrapper.--landscape) .page-overlay--right .page-nav-btn--prev {
  display: none !important;
}

.book-wrapper--portrait .page-overlay,
:deep(.stf__wrapper.--portrait) .page-overlay {
  justify-content: space-between !important;
  padding: 14px 16px !important;
  gap: 8px !important;
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
  transition:
    background 0.2s,
    transform 0.1s,
    opacity 0.2s;
  flex-shrink: 0;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  user-select: none;
  -webkit-user-select: none;
}

.page-nav-btn svg {
  pointer-events: none;
}

.page-nav-btn:hover:not(:disabled) {
  background: var(--color-primary-600);
}

.page-nav-btn:active:not(:disabled) {
  transform: scale(0.95);
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
  transition:
    background 0.2s,
    transform 0.1s;
  white-space: nowrap;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  user-select: none;
  -webkit-user-select: none;
}

.page-view-btn:hover {
  background: var(--color-primary-600);
}

.page-view-btn:active {
  transform: scale(0.97);
}
</style>
