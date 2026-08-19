<template>
  <header class="navbar">
    <!-- Left: Menu button -->
    <button
      class="menu-btn"
      aria-label="Open navigation menu"
      :aria-expanded="isMenuOpen"
      @click="isMenuOpen = true"
    >
      <UIcon
        name="i-lucide-menu"
        class="w-6 h-6 text-foreground dark:text-white transition-colors"
        aria-hidden="true"
      />
      <span class="menu-label text-foreground dark:text-white transition-colors">
        {{ $t('nav.menu') }}
      </span>
    </button>

    <!-- Center: Name (clickable link to home) -->
    <NuxtLink
      to="/"
      class="nav-name text-foreground dark:text-white transition-colors hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer"
      @click="handleLogoClick"
    >
      Illufox Kusanagi
    </NuxtLink>

    <!-- Right: Controls cluster -->
    <div class="nav-controls">
      <NavLangSwitcher />
      <NavModelSwitcher v-model="renderMode" />
      <!-- Theme Switcher (Figma #22:31) -->
      <ThemeSwitcher />
    </div>

    <!-- Slide-in Navigation Drawer -->
    <NavMenuDrawer v-model:open="isMenuOpen" />
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { UIcon } from "#components";
import { useRenderMode } from "@/composables/useRenderMode";
import NavLangSwitcher from "./NavLangSwitcher.vue";
import NavModelSwitcher from "./NavModelSwitcher.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import NavMenuDrawer from "./NavMenuDrawer.vue";

const renderMode = useRenderMode();
const isMenuOpen = ref(false);
const route = useRoute();

function handleLogoClick(e: MouseEvent) {
  if (route.path === "/" || route.path === "") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
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
  padding: 0 24px;
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
  gap: 24px;
}

.nav-icon-btn {
  width: 32px;
  height: 32px;
  border: 1px solid currentColor;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.nav-icon-btn:hover {
  background: rgba(128, 128, 128, 0.15);
}
</style>
