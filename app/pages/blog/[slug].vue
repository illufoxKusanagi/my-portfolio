<template>
  <div class="min-h-screen bg-primary-100 dark:bg-primary-950 transition-colors duration-500 font-sans pt-24 pb-24 px-6 sm:px-12 md:px-20 lg:px-32">
    <!-- Reading Progress Bar -->
    <div
      class="fixed top-0 left-0 h-1 bg-primary-700 z-[150] transition-all duration-150"
      :style="{ width: `${readingProgress}%` }"
    />

    <div v-if="post" class="max-w-4xl mx-auto space-y-10">
      <!-- Back Link -->
      <div>
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 font-tech text-xs text-primary-700 dark:text-primary-400 font-bold uppercase tracking-wider hover:underline"
        >
          {{ $t('blog.backToArchive') }}
        </NuxtLink>
      </div>

      <!-- Article Header Dossier Block -->
      <header class="space-y-4">
        <div class="flex items-start gap-4">
          <!-- Vertical Accent Bar -->
          <div class="w-2.5 h-16 sm:h-20 bg-tertiary-700 shrink-0 mt-1" />

          <div class="space-y-1">
            <div class="flex items-center gap-3">
              <span class="font-tech text-xs text-tertiary-700 dark:text-tertiary-400 font-extrabold uppercase tracking-widest">
                {{ post.category }}
              </span>
              <span class="text-xs font-tech text-foreground/40 dark:text-white/40">&bull;</span>
              <span class="text-xs font-tech text-foreground/60 dark:text-white/60">
                {{ post.publishedAt }}
              </span>
              <span class="text-xs font-tech text-foreground/40 dark:text-white/40">&bull;</span>
              <span class="text-xs font-tech text-foreground/60 dark:text-white/60">
                {{ post.readTime }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground dark:text-white transition-colors tracking-tight uppercase leading-tight">
              {{ post.title }}
            </h1>
          </div>
        </div>

        <p v-if="post.subtitle" class="font-tech text-sm sm:text-base text-tertiary-700 dark:text-tertiary-400 font-light uppercase tracking-wider">
          {{ post.subtitle }}
        </p>

        <!-- Tags Bar -->
        <div v-if="post.tags && post.tags.length" class="flex flex-wrap items-center gap-2 pt-4 border-t border-primary-300 dark:border-primary-800">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-3 py-1 rounded-full bg-primary-200 dark:bg-secondary-900 border border-primary-300 dark:border-primary-700 text-xs font-tech text-foreground/80 dark:text-white/80"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <!-- Article Content Body rendered via Nuxt Content -->
      <article class="p-8 sm:p-12 rounded-[16px] bg-primary-200/90 dark:bg-secondary-900 border border-primary-300 dark:border-primary-700 shadow-2xl space-y-6 text-foreground/90 dark:text-white/90 leading-relaxed text-base sm:text-lg prose-cyber">
        <ContentRenderer :value="post" />
      </article>

      <!-- Footer & Navigation Bar -->
      <footer class="pt-8 border-t border-primary-300 dark:border-primary-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <NuxtLink
          to="/blog"
          class="px-6 py-3 rounded-full bg-primary-200 dark:bg-secondary-900 border border-primary-400 dark:border-primary-700 font-tech text-xs font-bold uppercase tracking-wider text-foreground dark:text-white hover:bg-primary-700 hover:text-white transition-all shadow-md"
        >
          {{ $t('blog.backToArchive') }}
        </NuxtLink>

        <!-- Social Share / Action Buttons -->
        <div class="flex items-center gap-3">
          <button
            class="px-4 py-2.5 rounded-full border border-primary-300 dark:border-primary-700 bg-primary-100 dark:bg-secondary-950 font-tech text-xs uppercase tracking-wider text-foreground dark:text-white hover:border-primary-600 transition-colors"
            @click="copyArticleLink"
          >
            {{ copied ? 'LINK COPIED! ✓' : 'SHARE ARTICLE' }}
          </button>
        </div>
      </footer>
    </div>

    <!-- Article Not Found -->
    <div v-else class="max-w-2xl mx-auto text-center py-24 space-y-6 bg-primary-200/50 dark:bg-secondary-900/50 p-12 rounded-[16px] border border-dashed border-primary-400 dark:border-primary-700">
      <h2 class="text-3xl font-sans font-bold uppercase text-foreground dark:text-white">{{ $t('blog.articleNotFound') }}</h2>
      <p class="font-tech text-sm text-foreground/70 dark:text-white/70 uppercase tracking-wider">
        The requested case study or technical article does not exist.
      </p>
      <NuxtLink
        to="/blog"
        class="inline-block px-8 py-3 rounded-full bg-primary-700 text-white font-tech text-xs font-bold uppercase tracking-wider hover:bg-primary-600 transition-colors shadow-lg"
      >
        {{ $t('blog.backToArchive') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const slug = route.params.slug as string;
const { locale } = useI18n();

// Query the specific blog post from @nuxt/content in active language with fallback
const { data: post } = await useAsyncData(
  () => `blog-post-${slug}-${locale.value}`,
  async () => {
    try {
      const col = locale.value === "id" ? "blogId" : "blogEn";
      const target = await queryCollection(col as any)
        .path(`/blog/${locale.value}/${slug}`)
        .first();
      if (target) return target;

      // Fallback to opposite locale if article not yet present in active locale
      const fallbackCol = col === "blogId" ? "blogEn" : "blogId";
      const fallbackLocale = col === "blogId" ? "en" : "id";
      return await queryCollection(fallbackCol as any)
        .path(`/blog/${fallbackLocale}/${slug}`)
        .first();
    } catch {
      return null;
    }
  },
  { watch: [locale] }
);

// Set page title & SEO meta dynamically
if (post.value) {
  useHead({
    title: `${post.value.title} // Illufox Kusanagi`,
    meta: [
      {
        name: "description",
        content: post.value.summary || post.value.subtitle || "",
      },
    ],
  });
}

// Reading progress calculation
const readingProgress = ref(0);

const updateReadingProgress = () => {
  if (typeof window === "undefined") return;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight > 0) {
    readingProgress.value = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
  }
};

onMounted(() => {
  window.addEventListener("scroll", updateReadingProgress, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateReadingProgress);
});

// Share action
const copied = ref(false);
const copyArticleLink = async () => {
  if (typeof window === "undefined") return;
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2500);
  } catch {
    // Clipboard fallback
  }
};
</script>

<style scoped>
/* Prose typography enhancements for cyber portfolio aesthetic */
:deep(h2) {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: var(--color-foreground);
}

.dark :deep(h2) {
  color: #ffffff;
}

:deep(h3) {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--color-primary-700);
}

.dark :deep(h3) {
  color: var(--color-primary-400);
}

:deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.75;
}

:deep(pre) {
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid var(--color-primary-800);
  border-radius: 12px;
  padding: 1.25rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-family: var(--font-tech);
  font-size: 0.875rem;
  color: #f8fafc;
}

:deep(code) {
  font-family: var(--font-tech);
  font-size: 0.875em;
  background: rgba(56, 189, 248, 0.1);
  color: var(--color-primary-600);
  padding: 0.2em 0.4em;
  border-radius: 6px;
}

.dark :deep(code) {
  color: var(--color-primary-300);
  background: rgba(56, 189, 248, 0.15);
}

:deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}
</style>
