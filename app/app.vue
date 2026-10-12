<template>
  <UApp>
    <!-- Cyber Dual-Shutter Page Navigation Transition -->
    <CyberPageTransition />

    <!-- Global Scroll Progress Bar -->
    <ScrollProgressBar />

    <NavBar />
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <AppFooter />
  </UApp>
</template>

<script setup lang="ts">
import { watch } from "vue";
import NavBar from "@/components/navbar/NavBar.vue";
import AppFooter from "@/components/footer/AppFooter.vue";
import ScrollProgressBar from "@/components/common/ScrollProgressBar.vue";
import CyberPageTransition from "@/components/common/CyberPageTransition.vue";

const { $lenis } = useNuxtApp();
const route = useRoute();

watch(
  () => route.path,
  () => {
    if ($lenis) {
      ($lenis as any).scrollTo(0, { immediate: true });
    }
  },
);

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: { lang: "en" },
});

useSeoMeta({
  title: "Illufox Kusanagi",
  description:
    "Muhammad Arief Satria Wibawa - Junior Software Engineer & Full-stack Developer Portfolio",
  ogTitle: "Illufox Kusanagi | Arief Satria",
  ogDescription:
    "Creative Developer portfolio featuring 3D WebGL experiences and frontend engineering.",
  ogImage: "https://ariefsatria.my.id/og-image.png",
  ogImageType: "image/png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogUrl: "https://ariefsatria.my.id",
  twitterCard: "summary_large_image",
  twitterTitle: "Illufox Kusanagi | Arief Satria",
  twitterDescription:
    "Creative Developer portfolio featuring 3D WebGL experiences and frontend engineering.",
  twitterImage: "https://ariefsatria.my.id/og-image.png",
});
</script>
