<template>
  <div class="flex items-center gap-6">
    <a
      v-for="link in SOCIAL_LINKS"
      :key="link.name"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex items-center justify-center w-12 h-12 rounded-full border border-foreground/10 dark:border-white/10 bg-foreground/5 dark:bg-white/5 transition-all duration-300 hover:bg-primary-700 hover:border-primary-700 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 focus:ring-offset-purple-100 dark:focus:ring-offset-purple-800"
      :aria-label="link.name"
    >
      <span class="sr-only">{{ link.name }}</span>
      <UIcon
        :name="link.icon"
        class="w-5 h-5 text-foreground/70 dark:text-white/70 transition-colors duration-300 group-hover:text-white"
        aria-hidden="true"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/illufoxKusanagi",
    icon: "i-lucide-github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/muhammad-arief-satria-wibawa",
    icon: "i-lucide-linkedin",
  },
  {
    name: "Email",
    url: "mailto:ariefsatria2409@gmail.com",
    icon: "i-lucide-mail",
  },
];
</script>
