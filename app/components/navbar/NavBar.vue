<template>
  <header
    class="navbar px-3 sm:px-6 transition-colors duration-300"
    :class="
      isScrolled
        ? 'bg-background/75 dark:bg-primary-950/75 backdrop-blur-md'
        : 'bg-transparent'
    "
  >
    <!-- Left: Menu button -->
    <button
      type="button"
      class="menu-btn"
      aria-label="Open navigation menu"
      :aria-expanded="isMenuOpen"
      @click="isMenuOpen = true"
    >
      <UIcon
        name="i-lucide-menu"
        class="w-5 h-5 sm:w-6 sm:h-6 transition-colors"
        :class="
          isHomeHero
            ? 'text-white'
            : 'text-foreground dark:text-white'
        "
        aria-hidden="true"
      />
      <span
        class="menu-label hidden sm:inline transition-colors"
        :class="
          isHomeHero
            ? 'text-white'
            : 'text-foreground dark:text-white'
        "
      >
        {{ $t("nav.menu") }}
      </span>
    </button>

    <!-- Center: Name (clickable link to home) -->
    <NuxtLink
      to="/"
      class="nav-name hidden md:block transition-colors hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer"
      :class="
        isHomeHero
          ? 'text-white'
          : 'text-foreground dark:text-white'
      "
      @click="handleLogoClick"
    >
      Illufox Kusanagi
    </NuxtLink>

    <!-- Right: Controls cluster -->
    <div class="nav-controls gap-2 sm:gap-4 md:gap-6">
      <NavLangSwitcher />
      <NavModelSwitcher v-if="isHomePage" v-model="renderMode" />
      <ThemeSwitcher />
    </div>

    <!-- Slide-in Navigation Sidebar -->
    <NavSidebar v-model:open="isMenuOpen" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { UIcon } from "#components";
import { useRenderMode } from "@/composables/useRenderMode";
import NavLangSwitcher from "./NavLangSwitcher.vue";
import NavModelSwitcher from "./NavModelSwitcher.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import NavSidebar from "./NavSidebar.vue";

const renderMode = useRenderMode();
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const route = useRoute();
const { $lenis } = useNuxtApp();

const isHomePage = computed(() => route.path === "/" || route.path === "");
const isHomeHero = computed(() => isHomePage.value && !isScrolled.value);

function handleLogoClick(e: MouseEvent) {
  if (isHomePage.value) {
    e.preventDefault();
    if ($lenis) {
      ($lenis as any).scrollTo(0, { duration: 1.0 });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}

function updateScroll() {
  if (typeof window === "undefined") return;
  isScrolled.value = window.scrollY > 48;
}

onMounted(() => {
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("scroll", updateScroll);
  }
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
}

.menu-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
}

.menu-label {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.0075em;
  line-height: 1;
}

.nav-name {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-tech);
  font-size: 16px;
  font-weight: 300;
  letter-spacing: -0.0075em;
  white-space: nowrap;
  pointer-events: auto;
  z-index: 10;
}

.nav-controls {
  display: flex;
  align-items: center;
}
</style>
