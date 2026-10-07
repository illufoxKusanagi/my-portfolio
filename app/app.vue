<template>
  <UApp>
    <!-- Global 3D & Asset Preloader Curtain -->
    <CyberPreloader />

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
import CyberPreloader from "@/components/three/CyberPreloader.vue";


const { $lenis } = useNuxtApp();
const route = useRoute();

watch(
  () => route.path,
  () => {
    if ($lenis) {
      ($lenis as any).scrollTo(0, { immediate: true });
    }
  }
);

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: { lang: "en" },
});

useSeoMeta({
  title: "Illufox Kusanagi",
  description: "Arief Satria's Portfolio website",
  ogTitle: "Illufox Kusanagi",
  ogDescription: "Arief Satria's Portfolio website",
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterCard: "summary_large_image",
});
</script>
