<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div
        v-if="open"
        class="fixed inset-0 z-[200] flex"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation System"
        @keydown.esc="close"
      >
        <!-- Backdrop blur overlay -->
        <div
          class="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
          @click="close"
        />

        <!-- Main Drawer Container with Signature Multi-Panel Aesthetic -->
        <div
          class="relative w-full max-w-lg h-full bg-primary-100 dark:bg-primary-950 border-r border-primary-300 dark:border-primary-700 shadow-2xl z-10 flex flex-row overflow-hidden font-sans transition-colors duration-500"
        >
          <!-- 1. Left Side Accent Strip (Signature Figma Node style) -->
          <div
            class="w-12 h-full bg-primary-700 dark:bg-primary-700 flex flex-col items-center justify-between py-8 shrink-0 select-none"
          >
            <!-- Rotated Vertical Navigation Label -->
            <div
              class="writing-vertical font-sans font-bold text-[18px] leading-[24px] text-white tracking-wider uppercase rotate-180"
            >
              SYSTEM NAV // 2026
            </div>

            <!-- Decorative dot cluster -->
            <div class="flex flex-col items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-white"></div>
              <div class="w-1.5 h-1.5 rounded-full bg-white/70"></div>
              <div class="w-1 h-1 rounded-full bg-white/40"></div>
            </div>
          </div>

          <!-- 2. Main Content Body -->
          <div class="flex-1 h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto custom-scrollbar">
            <!-- Header Block -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <!-- Sub-description Tag Box with Accent Bar -->
                <div class="flex items-center gap-3">
                  <div class="w-1.5 h-12 bg-primary-700 rounded-full"></div>
                  <div>
                    <h2 class="font-sans font-bold text-xl sm:text-2xl text-foreground dark:text-white transition-colors tracking-tight uppercase leading-none">
                      Illufox Kusanagi
                    </h2>
                    <p class="font-tech text-xs text-primary-700 dark:text-primary-400 font-light mt-1 uppercase tracking-widest">
                      Personal Portfolio & System
                    </p>
                  </div>
                </div>

                <!-- Close (X) Button -->
                <button
                  class="w-9 h-9 rounded-lg border border-primary-400 dark:border-primary-700 bg-primary-200/50 dark:bg-primary-900/50 hover:bg-primary-700 hover:text-white text-foreground dark:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  aria-label="Close navigation"
                  @click="close"
                >
                  <UIcon name="i-lucide-x" class="w-4 h-4" />
                </button>
              </div>

              <div class="h-px bg-primary-300/80 dark:bg-primary-800/80 w-full" />
            </div>

            <!-- Navigation Links -->
            <div class="py-4 space-y-6">
              <!-- Primary Routes -->
              <div class="space-y-2">
                <span class="font-tech font-extrabold text-[12px] text-primary-600 dark:text-primary-400 uppercase tracking-widest block px-1">
                  // DIRECT ROUTES
                </span>

                <nav class="space-y-2">
                  <NuxtLink
                    v-for="item in PAGE_LINKS"
                    :key="item.path"
                    :to="item.path"
                    class="group flex items-center justify-between p-3.5 rounded-[12px] border transition-all duration-200 relative overflow-hidden"
                    :class="isCurrentRoute(item.path)
                      ? 'bg-primary-200 dark:bg-secondary-900 border-primary-500 dark:border-primary-500 shadow-md'
                      : 'bg-primary-200/40 dark:bg-secondary-900/40 border-primary-300/60 dark:border-primary-800/60 hover:border-primary-500 hover:bg-primary-200/90 dark:hover:bg-secondary-900/80'"
                    @click="close"
                  >
                    <!-- Left index & title -->
                    <div class="flex items-center gap-3.5 relative z-10">
                      <span class="font-tech font-extrabold text-sm text-primary-600 dark:text-primary-400">
                        {{ item.num }}
                      </span>
                      <div class="w-0.5 h-6 bg-primary-400/40 dark:bg-primary-700/60" />
                      <div>
                        <span class="font-sans font-bold text-base text-foreground dark:text-white transition-colors uppercase tracking-tight block leading-snug">
                          {{ item.title }}
                        </span>
                        <span class="font-tech text-xs text-foreground/60 dark:text-white/60 line-clamp-1">
                          {{ item.subtitle }}
                        </span>
                      </div>
                    </div>

                    <!-- Right Indicator -->
                    <span class="font-tech text-xs text-primary-600 dark:text-primary-400 font-bold group-hover:translate-x-1 transition-transform relative z-10">
                      &rarr;
                    </span>
                  </NuxtLink>
                </nav>
              </div>

              <!-- On-Page Section Jumps (when on Home Showcase) -->
              <div v-if="isHomePage" class="space-y-2 pt-2">
                <span class="font-tech font-extrabold text-[12px] text-primary-600 dark:text-primary-400 uppercase tracking-widest block px-1">
                  // TELEMETRY JUMP
                </span>

                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="(sec, sIdx) in SHOWCASE_SECTIONS"
                    :key="sec.target"
                    class="p-2.5 rounded-lg border border-primary-300/80 dark:border-primary-800/80 bg-primary-200/30 dark:bg-secondary-900/30 hover:bg-primary-700 hover:border-primary-700 hover:text-white text-foreground/85 dark:text-white/85 transition-all text-xs font-tech flex items-center justify-between group cursor-pointer text-left"
                    @click="scrollToSection(sec.target)"
                  >
                    <div class="flex items-center gap-2">
                      <span class="text-primary-600 dark:text-primary-400 group-hover:text-white font-bold">0{{ sIdx + 1 }}</span>
                      <span class="font-medium truncate uppercase">{{ sec.label }}</span>
                    </div>
                    <span class="text-[10px] opacity-40 group-hover:opacity-100">&darr;</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Footer Section -->
            <div class="space-y-4 pt-4 border-t border-primary-300/80 dark:border-primary-800/80">
              <!-- Telemetry Status Line -->
              <div class="flex items-center justify-between font-tech text-xs text-foreground/70 dark:text-white/70">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span class="font-semibold uppercase tracking-wider">AVAILABLE FOR HIRE</span>
                </div>
                <span class="tracking-wider">GMT+7 INDONESIA</span>
              </div>

              <!-- Pill Buttons for Socials (Matching TechCard pill badge style) -->
              <div class="flex items-center gap-2">
                <a
                  href="https://github.com/illufoxKusanagi"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 py-2 px-3 rounded-full border border-primary-400 dark:border-primary-700 bg-primary-200/80 dark:bg-secondary-900/80 hover:bg-primary-700 hover:text-white text-center font-tech text-xs text-foreground dark:text-white transition-all font-semibold"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/muhammad-arief-satria-wibawa"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 py-2 px-3 rounded-full border border-primary-400 dark:border-primary-700 bg-primary-200/80 dark:bg-secondary-900/80 hover:bg-primary-700 hover:text-white text-center font-tech text-xs text-foreground dark:text-white transition-all font-semibold"
                >
                  LinkedIn
                </a>
                <a
                  v-if="publicEmail"
                  :href="`mailto:${publicEmail}`"
                  class="flex-1 py-2 px-3 rounded-full bg-primary-700 hover:bg-primary-600 text-white text-center font-tech text-xs font-bold transition-all shadow-md"
                >
                  Email &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { UIcon } from "#components";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();

const route = useRoute();
const { t } = useI18n();
const config = useRuntimeConfig();
const publicEmail = config.public.contactEmail as string;
const isHomePage = computed(() => route.path === "/");

const PAGE_LINKS = computed(() => [
  { num: "01", title: t("nav.home"), subtitle: "3D interactive vehicle & core highlights", path: "/" },
  { num: "02", title: t("nav.projects"), subtitle: "Full catalog of software & tools", path: "/projects" },
  { num: "03", title: t("nav.blog"), subtitle: "Technical write-ups & deep-dives", path: "/blog" },
  { num: "04", title: t("nav.about"), subtitle: "Experience timeline & skill dossier", path: "/about" },
]);

const SHOWCASE_SECTIONS = computed(() => [
  { label: t("nav.sections.hero"), target: "#hero" },
  { label: t("nav.sections.frameworks"), target: "#tech-category-frameworks" },
  { label: t("nav.sections.tools"), target: "#tech-category-tools" },
  { label: t("nav.sections.languages"), target: "#tech-category-languages" },
  { label: t("nav.sections.projects"), target: "#projects" },
  { label: t("nav.sections.experience"), target: "#experience" },
  { label: t("nav.sections.certificates"), target: "#certificates" },
  { label: t("nav.sections.contact"), target: "#contact" },
]);

const close = () => {
  emit("update:open", false);
};

const isCurrentRoute = (path: string) => {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
};

const scrollToSection = (target: string) => {
  close();
  const nuxtApp = useNuxtApp();
  const lenis = nuxtApp.$lenis as any;

  setTimeout(() => {
    if (lenis && target) {
      lenis.scrollTo(target, { offset: 0, duration: 1.0 });
    } else {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, 250);
};

// Lock body scrolling when drawer is open
watch(
  () => props.open,
  (isOpen) => {
    if (import.meta.server) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

onBeforeUnmount(() => {
  if (!import.meta.server) {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
.writing-vertical {
  writing-mode: vertical-rl;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-active > div:last-child,
.drawer-leave-active > div:last-child {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from > div:last-child {
  transform: translateX(-100%);
}

.drawer-leave-to > div:last-child {
  transform: translateX(-100%);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-primary-400);
  border-radius: 4px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-primary-700);
}
</style>
