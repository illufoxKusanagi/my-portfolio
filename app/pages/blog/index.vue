<template>
  <div class="min-h-screen bg-primary-100 dark:bg-primary-950 transition-colors duration-500 font-sans pt-24 pb-24 px-6 sm:px-12 md:px-20 lg:px-32">
    <!-- Header Block -->
    <div class="max-w-6xl mx-auto mb-12">
      <div class="flex items-start gap-4 mb-4">
        <!-- Vertical Accent Bar -->
        <div class="w-2.5 h-16 sm:h-20 bg-tertiary-700 shrink-0 mt-1" />

        <div class="space-y-1">
          <h1 class="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-foreground dark:text-white transition-colors tracking-tight uppercase leading-none">
            {{ $t('blog.title') }}
          </h1>
          <p class="font-tech text-sm sm:text-base text-tertiary-700 dark:text-tertiary-400 uppercase tracking-widest font-light">
            {{ $t('blog.subtitle') }}
          </p>
        </div>
      </div>

      <!-- Search & Pill Filter Bar -->
      <div class="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-[16px] bg-primary-200/80 dark:bg-secondary-900/90 border border-primary-300 dark:border-primary-700 shadow-xl backdrop-blur-md">
        <!-- Search Input -->
        <div class="relative flex-1">
          <div class="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-primary-700 dark:text-primary-400 pointer-events-none">
            <span class="font-tech font-extrabold text-xs">&gt;</span>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('blog.searchPlaceholder')"
            class="w-full pl-8 pr-4 py-2.5 rounded-full bg-primary-100/90 dark:bg-secondary-950/90 border border-primary-300 dark:border-primary-700 text-foreground dark:text-white text-xs font-tech tracking-wider focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all placeholder:text-foreground/40 dark:placeholder:text-white/40"
          >
        </div>

        <!-- Filter Pill Badges -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
          <button
            v-for="cat in CATEGORY_KEYS"
            :key="cat.key"
            class="px-4 py-2 rounded-full text-xs font-tech font-bold transition-all duration-200 whitespace-nowrap cursor-pointer uppercase tracking-wider"
            :class="selectedCategory === cat.key
              ? 'bg-primary-700 text-white shadow-md'
              : 'bg-primary-100 dark:bg-secondary-950 border border-primary-300 dark:border-primary-700 text-foreground/75 dark:text-white/75 hover:bg-primary-200 dark:hover:bg-secondary-800'"
            @click="selectedCategory = cat.key"
          >
            {{ $te(cat.labelKey) ? $t(cat.labelKey) : cat.key }}
          </button>
        </div>
      </div>
    </div>

    <!-- Article List (Signature Multi-Panel Structure) -->
    <div class="max-w-6xl mx-auto space-y-8">
      <div v-if="filteredPosts.length > 0" class="space-y-6">
        <NuxtLink
          v-for="(post, index) in filteredPosts"
          :key="getPostSlug(post)"
          :to="`/blog/${getPostSlug(post)}`"
          class="group block w-full bg-primary-200 dark:bg-secondary-900 border border-primary-300 dark:border-primary-700 rounded-[16px] overflow-hidden shadow-xl hover:shadow-2xl hover:border-primary-500 transition-all duration-300 relative"
        >
          <div class="flex flex-col lg:flex-row justify-between">
            <!-- Left Info Panel -->
            <div class="flex-1 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <!-- Index + Category Header -->
                <div class="flex items-center justify-between gap-4 mb-3">
                  <div class="flex items-center gap-3">
                    <span class="font-tech font-extrabold text-sm text-primary-600 dark:text-primary-400">
                      0{{ index + 1 }} // {{ post.category }}
                    </span>
                    <span class="text-xs font-tech text-foreground/40 dark:text-white/40">&bull;</span>
                    <span class="text-xs font-tech text-foreground/60 dark:text-white/60">
                      {{ post.publishedAt }}
                    </span>
                  </div>

                  <!-- Read time badge -->
                  <div class="px-3 py-1 rounded-full border border-primary-400 dark:border-primary-700 bg-primary-100/90 dark:bg-secondary-950/90 font-tech text-[11px] font-semibold text-foreground dark:text-white">
                    {{ post.readTime }}
                  </div>
                </div>

                <!-- Title & Subtitle with Accent Bar -->
                <div class="space-y-2">
                  <h2 class="text-2xl sm:text-3xl font-sans font-bold text-foreground dark:text-white transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-300 uppercase tracking-tight leading-snug">
                    {{ post.title }}
                  </h2>

                  <div v-if="post.subtitle" class="flex items-center gap-2.5">
                    <div class="w-1 h-5 bg-primary-700 rounded-full shrink-0" />
                    <p class="font-tech text-xs text-primary-700 dark:text-primary-400 font-light uppercase tracking-wider">
                      {{ post.subtitle }}
                    </p>
                  </div>
                </div>

                <!-- Summary Body -->
                <p class="font-sans font-medium text-sm sm:text-base leading-relaxed text-foreground/80 dark:text-white/80 mt-4 line-clamp-2">
                  {{ post.summary }}
                </p>
              </div>

              <!-- Tags & CTA -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-primary-300/80 dark:border-primary-800/80">
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="px-2.5 py-1 rounded-full bg-primary-100 dark:bg-secondary-950 border border-primary-300 dark:border-primary-700 text-xs font-tech text-foreground/80 dark:text-white/80"
                  >
                    #{{ tag }}
                  </span>
                </div>

                <span class="font-tech text-xs font-bold text-primary-700 dark:text-primary-400 uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 self-end sm:self-auto">
                  {{ $t('blog.readCaseStudy') }}
                </span>
              </div>
            </div>

            <!-- Right Side Accent Strip -->
            <div
              class="hidden lg:flex w-12 bg-primary-700 dark:bg-primary-700 transition-colors duration-500 flex-col items-center justify-between py-8 shrink-0 select-none"
            >
              <div
                class="writing-vertical font-sans font-bold text-[16px] leading-[22px] text-white tracking-wider uppercase rotate-180"
              >
                ARTICLE // 0{{ index + 1 }}
              </div>

              <div class="flex flex-col items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-white"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-white/70"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-20 bg-primary-200/50 dark:bg-secondary-900/50 rounded-[16px] border border-dashed border-primary-400 dark:border-primary-700 p-8">
        <h3 class="text-xl font-bold font-sans uppercase text-foreground dark:text-white mb-2">{{ $t('blog.articleNotFound') }}</h3>
        <p class="font-tech text-xs text-foreground/60 dark:text-white/60 mb-6 uppercase tracking-wider">Try searching for other terms or resetting the category filter.</p>
        <button
          class="px-6 py-2.5 rounded-full bg-primary-700 text-white font-tech text-xs font-bold uppercase tracking-wider hover:bg-primary-600 transition-colors"
          @click="resetFilters"
        >
          {{ $t('blog.all') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

useHead({
  title: "Engineering Blog // Illufox Kusanagi",
  meta: [
    {
      name: "description",
      content: "Technical articles on 3D graphics, WebGL, C++ reverse engineering, and web architecture by Arief Satria.",
    },
  ],
});

// Query collection dynamically based on active locale
const { data: posts } = await useAsyncData(
  () => `blog-posts-${locale.value}`,
  async () => {
    try {
      const col = locale.value === "id" ? "blogId" : "blogEn";
      const result = await queryCollection(col as any).all();
      if (result && result.length > 0) {
        return result;
      }
      return await queryCollection("blogEn" as any).all();
    } catch {
      return [];
    }
  },
  { watch: [locale] }
);

const searchQuery = ref("");
const selectedCategory = ref("ALL");

const CATEGORY_KEYS = [
  { key: "ALL", labelKey: "blog.categories.ALL" },
  { key: "GRAPHICS & 3D", labelKey: "blog.categories.GRAPHICS & 3D" },
  { key: "SYSTEMS & C++", labelKey: "blog.categories.SYSTEMS & C++" },
  { key: "WEB ARCHITECTURE", labelKey: "blog.categories.WEB ARCHITECTURE" },
  { key: "ENGINEERING STRATEGY", labelKey: "blog.categories.ENGINEERING STRATEGY" },
];

const getPostSlug = (post: any) => {
  if (post.path) {
    return post.path.split("/").filter(Boolean).pop();
  }
  if (post.stem) {
    return post.stem.split("/").filter(Boolean).pop();
  }
  return "";
};

const filteredPosts = computed(() => {
  const list = posts.value || [];
  return list.filter((post: any) => {
    const q = searchQuery.value.toLowerCase().trim();
    const matchesSearch =
      !q ||
      post.title?.toLowerCase().includes(q) ||
      post.subtitle?.toLowerCase().includes(q) ||
      post.summary?.toLowerCase().includes(q) ||
      post.tags?.some((t: string) => t.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory.value === "ALL" ||
      post.category?.toUpperCase() === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "ALL";
};
</script>

<style scoped>
.writing-vertical {
  writing-mode: vertical-rl;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
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
