<template>
  <UApp>
    <!-- Cyber Dual-Shutter Page Navigation Transition -->
    <CyberPageTransition />

    <!-- Global Scroll Progress Bar -->
    <ScrollProgressBar v-if="!isStandalonePage" />

    <!-- Top Navigation Bar -->
    <NavBar v-if="!isStandalonePage" />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <!-- System Footer -->
    <AppFooter v-if="!isStandalonePage" />
  </UApp>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import NavBar from "@/components/navbar/NavBar.vue";
import AppFooter from "@/components/footer/AppFooter.vue";
import ScrollProgressBar from "@/components/common/ScrollProgressBar.vue";
import CyberPageTransition from "@/components/common/CyberPageTransition.vue";

const { $lenis } = useNuxtApp();
const route = useRoute();
const { locale } = useI18n();

const isStandalonePage = computed(() => route.path === "/font-showcase");

watch(
  () => route.path,
  () => {
    if ($lenis) {
      ($lenis as any).scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  },
);

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: computed(() => locale.value || "en"),
  },
});

useSeoMeta({
  title: "Illufox Kusanagi // Muhammad Arief Satria Wibawa",
  description:
    "Interactive 3D portfolio of Muhammad Arief Satria Wibawa (Illufox Kusanagi) — Software Engineer specializing in 3D WebGL, C++ Systems, and Modern Web Architecture.",
  ogTitle: "Illufox Kusanagi | Software Engineer & 3D WebGL Developer",
  ogDescription:
    "Explore interactive 3D web experiences, high-performance C++ desktop apps, and full-stack software engineering case studies.",
  ogImage: "https://ariefsatria.my.id/og-image.png",
  ogImageType: "image/png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogUrl: "https://ariefsatria.my.id",
  twitterCard: "summary_large_image",
  twitterTitle: "Illufox Kusanagi | Software Engineer & 3D WebGL Developer",
  twitterDescription:
    "Interactive 3D portfolio and technical blog by Muhammad Arief Satria Wibawa.",
  twitterImage: "https://ariefsatria.my.id/og-image.png",
});
</script>
