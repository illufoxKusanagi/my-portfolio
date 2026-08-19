<template>
  <div class="min-h-screen bg-primary-100 dark:bg-primary-950 transition-colors duration-500 font-sans pt-24 pb-24 px-6 sm:px-12 md:px-20 lg:px-32">
    <div class="max-w-6xl mx-auto space-y-16">
      <!-- Header Block -->
      <section>
        <div class="flex items-start gap-4 mb-4">
          <!-- Vertical Accent Bar -->
          <div class="w-2.5 h-16 sm:h-20 bg-tertiary-700 shrink-0 mt-1" />

          <div class="space-y-1">
            <h1 class="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-foreground dark:text-white transition-colors tracking-tight uppercase leading-none">
              {{ $t('about.title') }}
            </h1>
            <p class="font-tech text-sm sm:text-base text-tertiary-700 dark:text-tertiary-400 uppercase tracking-widest font-light">
              {{ $t('about.subtitle') }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4 pt-4 border-t border-primary-300 dark:border-primary-800">
          <a
            href="mailto:ariefsatria2409@gmail.com"
            class="px-6 py-2.5 rounded-full bg-secondary-700 hover:bg-secondary-600 text-white font-tech font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            {{ $t('about.directEmail') }}
          </a>
          <NuxtLink
            to="/projects"
            class="px-6 py-2.5 rounded-full border border-secondary-600 text-foreground dark:text-white hover:bg-secondary-200 dark:hover:bg-secondary-900 font-tech font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            {{ $t('about.viewProjects') }}
          </NuxtLink>
        </div>
      </section>

      <!-- Biography & Telemetry Grid -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left 2 Cols: Detailed Dossier -->
        <div class="lg:col-span-2 p-8 sm:p-10 rounded-[16px] bg-primary-200 dark:bg-secondary-900 border border-primary-300 dark:border-primary-700 shadow-xl space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-8 bg-secondary-700 rounded-full" />
            <h2 class="text-xl sm:text-2xl font-bold font-sans uppercase tracking-tight text-foreground dark:text-white">
              {{ $t('about.backgroundTitle') }}
            </h2>
          </div>

          <div class="space-y-4 text-foreground/85 dark:text-white/85 text-sm sm:text-base leading-relaxed">
            <p>
              {{ $t('about.bioP1') }}
            </p>
            <p>
              {{ $t('about.bioP2') }}
            </p>
            <p>
              {{ $t('about.bioP3') }}
            </p>
          </div>

          <!-- Key Metrics -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-primary-300/80 dark:border-primary-800/80">
            <div class="p-4 rounded-xl bg-primary-100/70 dark:bg-secondary-950/70 border border-primary-300/60 dark:border-primary-800/60">
              <span class="font-tech text-2xl sm:text-3xl font-extrabold text-secondary-700 dark:text-secondary-400 block">10+</span>
              <span class="font-tech text-xs text-foreground/60 dark:text-white/60 uppercase tracking-wider">{{ $t('about.metricProjects') }}</span>
            </div>
            <div class="p-4 rounded-xl bg-primary-100/70 dark:bg-secondary-950/70 border border-primary-300/60 dark:border-primary-800/60">
              <span class="font-tech text-2xl sm:text-3xl font-extrabold text-secondary-700 dark:text-secondary-400 block">60 FPS</span>
              <span class="font-tech text-xs text-foreground/60 dark:text-white/60 uppercase tracking-wider">{{ $t('about.metricFps') }}</span>
            </div>
            <div class="p-4 rounded-xl bg-primary-100/70 dark:bg-secondary-950/70 border border-primary-300/60 dark:border-primary-800/60 col-span-2 sm:col-span-1">
              <span class="font-tech text-2xl sm:text-3xl font-extrabold text-secondary-700 dark:text-secondary-400 block">100%</span>
              <span class="font-tech text-xs text-foreground/60 dark:text-white/60 uppercase tracking-wider">{{ $t('about.metricTypesafe') }}</span>
            </div>
          </div>
        </div>

        <!-- Right Col: Telemetry Quick Facts -->
        <div class="p-8 sm:p-10 rounded-[16px] bg-primary-200 dark:bg-secondary-900 border border-primary-300 dark:border-primary-700 shadow-xl flex flex-col justify-between">
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-8 bg-secondary-700 rounded-full" />
              <h2 class="text-xl font-bold font-sans uppercase tracking-tight text-foreground dark:text-white">
                {{ $t('about.telemetryTitle') }}
              </h2>
            </div>

            <div class="space-y-3 font-tech text-xs">
              <div class="flex justify-between py-2 border-b border-primary-300/60 dark:border-primary-800/60">
                <span class="text-foreground/60 dark:text-white/60 uppercase">{{ $t('about.location') }}</span>
                <span class="font-bold text-foreground dark:text-white">{{ $t('about.locationVal') }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-primary-300/60 dark:border-primary-800/60">
                <span class="text-foreground/60 dark:text-white/60 uppercase">{{ $t('about.status') }}</span>
                <span class="font-bold text-emerald-500 uppercase">{{ $t('about.statusVal') }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-primary-300/60 dark:border-primary-800/60">
                <span class="text-foreground/60 dark:text-white/60 uppercase">{{ $t('about.focus') }}</span>
                <span class="font-bold text-foreground dark:text-white uppercase">{{ $t('about.focusVal') }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-primary-300/60 dark:border-primary-800/60">
                <span class="text-foreground/60 dark:text-white/60 uppercase">LANGUAGES</span>
                <span class="font-bold text-foreground dark:text-white uppercase">EN / ID</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-6">
            <a
              href="https://github.com/illufoxKusanagi"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-2 px-3 rounded-full border border-primary-400 dark:border-primary-700 bg-primary-100/80 dark:bg-secondary-950/80 text-center font-tech text-xs uppercase tracking-wider font-semibold hover:bg-secondary-700 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/muhammad-arief-satria-wibawa"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-2 px-3 rounded-full border border-primary-400 dark:border-primary-700 bg-primary-100/80 dark:bg-secondary-950/80 text-center font-tech text-xs uppercase tracking-wider font-semibold hover:bg-secondary-700 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <!-- Experience Timeline Section -->
      <section class="space-y-8">
        <div class="flex items-start gap-4">
          <div class="w-2.5 h-12 bg-tertiary-700 shrink-0 mt-1" />
          <div>
            <h2 class="font-sans font-bold text-2xl sm:text-3xl text-foreground dark:text-white tracking-tight uppercase leading-none">
              {{ $t('about.timelineTitle') }}
            </h2>
            <p class="font-tech text-xs text-tertiary-700 dark:text-tertiary-400 uppercase tracking-widest mt-1 font-light">
              {{ $t('about.timelineSubtitle') }}
            </p>
          </div>
        </div>

        <div class="space-y-6">
          <div
            v-for="(exp, index) in EXPERIENCE_DATA"
            :key="exp.id"
            class="p-8 rounded-[16px] bg-primary-200 dark:bg-secondary-900 border border-primary-300 dark:border-primary-700 shadow-xl transition-all duration-300"
          >
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-4 border-b border-primary-300/80 dark:border-primary-800/80">
              <div>
                <span class="font-tech text-xs text-tertiary-700 dark:text-tertiary-400 font-extrabold uppercase tracking-widest block">
                  0{{ index + 1 }} // {{ $te(`experience.items.${exp.id}.type`) ? $t(`experience.items.${exp.id}.type`) : exp.type }}
                </span>
                <h3 class="text-xl sm:text-2xl font-bold font-sans uppercase text-foreground dark:text-white mt-1">
                  {{ $te(`experience.items.${exp.id}.role`) ? $t(`experience.items.${exp.id}.role`) : exp.role }} &bull; {{ exp.company }}
                </h3>
              </div>

              <div class="px-4 py-1.5 rounded-full border border-secondary-600 bg-primary-100/80 dark:bg-secondary-950/80 font-tech text-xs font-semibold text-foreground dark:text-white self-start md:self-auto shrink-0">
                {{ $te(`experience.items.${exp.id}.period`) ? $t(`experience.items.${exp.id}.period`) : exp.period }}
              </div>
            </div>

            <ul class="space-y-2.5">
              <li
                v-for="(bullet, bIdx) in getExpBullets(exp)"
                :key="bIdx"
                class="flex items-start gap-3 text-sm sm:text-base text-foreground/80 dark:text-white/80 leading-relaxed font-sans"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-secondary-600 shrink-0 mt-2" />
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Technical Stack Matrix -->
      <section class="space-y-8">
        <div class="flex items-start gap-4">
          <div class="w-2.5 h-12 bg-tertiary-700 shrink-0 mt-1" />
          <div>
            <h2 class="font-sans font-bold text-2xl sm:text-3xl text-foreground dark:text-white tracking-tight uppercase leading-none">
              {{ $t('about.matrixTitle') }}
            </h2>
            <p class="font-tech text-xs text-tertiary-700 dark:text-tertiary-400 uppercase tracking-widest mt-1 font-light">
              {{ $t('about.matrixSubtitle') }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="group in SKILL_GROUPS"
            :key="group.title"
            class="p-6 rounded-[16px] bg-primary-200 dark:bg-secondary-900 border border-primary-300 dark:border-primary-700 shadow-lg flex flex-col justify-between space-y-4"
          >
            <div>
              <span class="font-tech text-xs text-secondary-700 dark:text-secondary-400 font-extrabold uppercase tracking-widest block mb-2">
                {{ group.category }}
              </span>
              <h3 class="text-base font-bold font-sans uppercase text-foreground dark:text-white mb-4">
                {{ group.title }}
              </h3>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in group.skills"
                  :key="skill"
                  class="px-2.5 py-1 rounded-full bg-primary-100 dark:bg-secondary-950 border border-primary-300/80 dark:border-primary-800/80 text-xs font-tech text-foreground/80 dark:text-white/80"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { EXPERIENCE_DATA, type ExperienceItem } from "@/components/experience/experienceData";

const { t, te } = useI18n();

const getExpBullets = (exp: ExperienceItem) => {
  const bullets = exp.bullets || [];
  return bullets.map((fallback, i) => {
    const key = `experience.items.${exp.id}.bullets.${i}`;
    return te(key) ? t(key) : fallback;
  });
};

useHead({
  title: "About & Resume // Illufox Kusanagi",
  meta: [
    {
      name: "description",
      content: "Software engineer dossier, career history, technical stack, and engineering philosophy.",
    },
  ],
});

const SKILL_GROUPS = [
  {
    category: "FRONTEND",
    title: "Web & UI Systems",
    skills: ["Vue 3", "Nuxt 4", "React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    category: "GRAPHICS & 3D",
    title: "Interactive WebGL",
    skills: ["Three.js", "WebGL", "GLTF / Draco", "GLSL Shaders", "Physics"],
  },
  {
    category: "SYSTEMS",
    title: "Desktop & C++",
    skills: ["C++", "Qt Framework", "OpenCL", "Memory Safety"],
  },
  {
    category: "BACKEND & DATA",
    title: "Services & Databases",
    skills: ["Node.js", "Drizzle ORM", "SQLite", "MySQL", "Next Auth", "REST APIs"],
  },
];
</script>
