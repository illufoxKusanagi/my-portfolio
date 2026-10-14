<template>
  <section
    id="contact"
    ref="sectionRef"
    class="relative w-full min-h-screen bg-purple-100 dark:bg-purple-800 transition-colors duration-500 font-sans flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-8 md:px-12 lg:px-24"
  >
    <!-- Optional Background Glow -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-primary-700/20 rounded-full blur-[120px] opacity-50"
      />
      <div
        class="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-secondary-700/20 rounded-full blur-[100px] opacity-50"
      />
    </div>

    <div
      class="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-24 items-center"
    >
      <!-- Left Column: Typography & Engineering Pitch -->
      <div ref="infoRef" class="flex flex-col space-y-6 sm:space-y-8">
        <div class="flex items-start gap-3 sm:gap-4">
          <!-- Left Tertiary Accent Bar -->
          <div
            class="w-2 sm:w-2.5 h-12 sm:h-16 md:h-20 bg-tertiary-700 mt-1 shrink-0"
          />

          <div class="space-y-1 sm:space-y-2">
            <h2
              class="font-sans font-bold text-3xl sm:text-5xl md:text-6xl text-foreground dark:text-white transition-colors tracking-tight uppercase leading-none"
            >
              {{ $t("contact.title") }}
            </h2>
            <p
              class="font-tech text-xs sm:text-sm md:text-base text-foreground/70 dark:text-white/70 font-light uppercase tracking-widest mt-1"
            >
              {{ $t("contact.subtitle") }}
            </p>
          </div>
        </div>

        <div class="space-y-4 max-w-xl">
          <h3
            class="font-sans font-bold text-lg sm:text-xl md:text-2xl text-foreground dark:text-white uppercase tracking-tight"
          >
            {{ $t("contact.pitchTitle") }}
          </h3>
          <p
            class="font-sans text-sm sm:text-base text-foreground/80 dark:text-white/80 leading-relaxed"
          >
            {{ $t("contact.pitchDesc") }}
          </p>
        </div>

        <!-- Telemetry & Response Guarantee -->
        <div class="flex items-center gap-3 pt-2">
          <div
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[6px] bg-purple-200/90 dark:bg-purple-700/80 border border-primary-400 dark:border-primary-600 text-xs font-tech text-foreground dark:text-white"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span class="font-semibold tracking-wider uppercase">
              {{ $t("contact.responseRate") }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right Column: Form -->
      <div
        ref="formRef"
        class="w-full bg-purple-200/80 dark:bg-purple-700/60 transition-colors duration-500 backdrop-blur-xl border border-foreground/10 dark:border-white/5 rounded-2xl p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        <!-- Inner subtle glow for the card -->
        <div
          class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <h3
          class="text-2xl font-bold text-foreground dark:text-white transition-colors mb-8"
        >
          {{ $t("contact.sendButton") }}
        </h3>
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "./ContactForm.vue";

const sectionRef = ref<HTMLElement | null>(null);
const infoRef = ref<HTMLElement | null>(null);
const formRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
  if (import.meta.server || !sectionRef.value) return;

  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    if (infoRef.value) {
      gsap.from(infoRef.value, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 75%",
        },
      });
    }

    if (formRef.value) {
      gsap.from(formRef.value, {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 75%",
        },
      });
    }
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>
