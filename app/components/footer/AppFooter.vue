<template>
  <footer
    class="relative w-full bg-primary-200 dark:bg-secondary-950 transition-colors duration-500 font-sans border-t border-primary-300 dark:border-primary-800/80 overflow-hidden select-none z-30"
  >
    <!-- Background cyber grid accent -->
    <div
      class="absolute inset-0 bg-[radial-gradient(#1a85ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"
    />

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-24 pt-12 sm:pt-16 pb-8"
    >
      <!-- Main 3-Column Footer Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-primary-300/80 dark:border-primary-800/80"
      >
        <!-- 1. Left Column: Brand & System Bio (5 cols) -->
        <div class="lg:col-span-5 space-y-4">
          <div class="flex items-start gap-3">
            <div
              class="w-1.5 h-10 bg-primary-700 dark:bg-primary-500 rounded-[2px] mt-0.5 shrink-0"
            />
            <div>
              <h3
                class="font-sans font-bold text-xl sm:text-2xl text-foreground dark:text-white tracking-tight uppercase leading-none"
              >
                {{ $t("footer.title") }}
              </h3>
              <p
                class="font-tech text-xs text-primary-700 dark:text-primary-400 font-light mt-1 uppercase tracking-widest"
              >
                {{ $t("footer.subtitle") }}
              </p>
            </div>
          </div>

          <!-- Availability & Telemetry Badge -->
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-primary-100 dark:bg-secondary-900 border border-primary-300 dark:border-primary-800 text-xs font-tech text-foreground dark:text-white"
            >
              <span class="font-semibold tracking-wider uppercase">{{
                $t("footer.status")
              }}</span>
            </div>
            <span
              class="font-tech text-xs text-foreground/60 dark:text-white/60 tracking-wider"
            >
              {{ $t("footer.timezone") }}
            </span>
          </div>

          <!-- Solaris Font Showcase -->
          <p
            class="font-solaris text-sm sm:text-base text-primary-700 dark:text-primary-300 tracking-wide pt-1"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <!-- 2. Middle Column: Quick Directory (3 cols) -->
        <div class="lg:col-span-3 space-y-3">
          <span
            class="font-tech font-extrabold text-xs text-primary-600 dark:text-primary-400 uppercase tracking-widest block"
          >
            // {{ $t("footer.quickLinks") }}
          </span>

          <nav
            class="flex flex-col space-y-2 font-tech text-xs uppercase tracking-wider"
          >
            <NuxtLink
              to="/"
              class="text-foreground/80 dark:text-white/80 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group"
            >
              <span class="text-primary-500 opacity-60 group-hover:opacity-100"
                >&gt;</span
              >
              {{ $t("nav.home") }}
            </NuxtLink>
            <NuxtLink
              to="/projects"
              class="text-foreground/80 dark:text-white/80 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group"
            >
              <span class="text-primary-500 opacity-60 group-hover:opacity-100"
                >&gt;</span
              >
              {{ $t("nav.projects") }}
            </NuxtLink>
            <NuxtLink
              to="/blog"
              class="text-foreground/80 dark:text-white/80 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group"
            >
              <span class="text-primary-500 opacity-60 group-hover:opacity-100"
                >&gt;</span
              >
              {{ $t("nav.blog") }}
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-foreground/80 dark:text-white/80 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group"
            >
              <span class="text-primary-500 opacity-60 group-hover:opacity-100"
                >&gt;</span
              >
              {{ $t("nav.about") }}
            </NuxtLink>
          </nav>
        </div>

        <!-- 3. Right Column: Direct Email & Social Icons (4 cols) -->
        <div class="lg:col-span-4 space-y-4">
          <span
            class="font-tech font-extrabold text-xs text-primary-600 dark:text-primary-400 uppercase tracking-widest block"
          >
            // {{ $t("footer.connect") }}
          </span>

          <div v-if="publicEmail" class="space-y-1">
            <p
              class="font-tech text-xs text-foreground/50 dark:text-white/50 uppercase tracking-widest"
            >
              {{ $t("footer.directEmail") }}
            </p>
            <a
              :href="`mailto:${publicEmail}`"
              class="font-sans font-bold text-sm sm:text-base text-foreground dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors break-all block"
            >
              {{ publicEmail }}
            </a>
          </div>

          <div class="pt-1">
            <SocialLinks />
          </div>
        </div>
      </div>

      <!-- Bottom Sub-Bar: Copyright, Decorative Icon & Back-to-Top -->
      <div
        class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-xs text-foreground/60 dark:text-white/60"
      >
        <div class="flex items-center gap-3">
          <span
            >&copy; {{ currentYear }} {{ $t("footer.title") }}.
            {{ $t("footer.rights") }}</span
          >
        </div>
        <p class="flex items-center gap-1">Made with ❤️ by Illufox Kusanagi</p>

        <button
          @click="scrollToTop"
          class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold uppercase tracking-wider group"
          aria-label="Scroll back to top"
        >
          <span>{{ $t("footer.backToTop") }}</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SocialLinks from "@/components/contact/SocialLinks.vue";

const config = useRuntimeConfig();
const publicEmail = config.public.contactEmail as string;

const currentYear = computed(() => new Date().getFullYear());

const { $lenis } = useNuxtApp();

function scrollToTop() {
  if ($lenis) {
    ($lenis as any).scrollTo(0, { duration: 1.2 });
  } else if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
</script>
