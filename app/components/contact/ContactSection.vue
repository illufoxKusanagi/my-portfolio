<template>
  <section
    ref="sectionRef"
    id="contact"
    class="relative w-full min-h-screen bg-purple-100 dark:bg-purple-800 transition-colors duration-500 font-sans flex items-center justify-center py-24 px-6 md:px-12 lg:px-24"
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
      class="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
    >
      <!-- Left Column: Typography & Info -->
      <div ref="infoRef" class="flex flex-col">
        <div class="flex items-start gap-4">
          <!-- Left Tertiary Accent Bar -->
          <div class="w-2.5 h-16 sm:h-20 bg-tertiary-700 mt-1 shrink-0" />

          <div class="space-y-2">
            <h2
              class="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-foreground dark:text-white transition-colors tracking-tight uppercase leading-none"
            >
              {{ $t('contact.title') }}
            </h2>
            <p class="font-tech text-sm sm:text-base text-foreground/70 dark:text-white/70 font-light uppercase tracking-widest mt-1">
              {{ $t('contact.subtitle') }}
            </p>
          </div>
        </div>

        <div class="mt-12 space-y-6">
          <div>
            <p
              class="text-sm font-tech text-foreground/40 dark:text-white/40 transition-colors uppercase tracking-widest mb-2"
            >
              {{ $t('contact.directEmail') }}
            </p>
            <a
              href="mailto:ariefsatria2409@gmail.com"
              class="text-xl md:text-2xl font-bold text-foreground dark:text-white transition-colors hover:text-primary-400 transition-colors"
            >
              ariefsatria2409@gmail.com
            </a>
          </div>

          <div>
            <p
              class="text-sm font-tech text-foreground/40 dark:text-white/40 transition-colors uppercase tracking-widest mb-4"
            >
              {{ $t('contact.findMeOn') }}
            </p>
            <SocialLinks />
          </div>
        </div>
      </div>

      <!-- Right Column: Form -->
      <div
        ref="formRef"
        class="w-full bg-purple-200/80 dark:bg-purple-700/60 transition-colors duration-500 backdrop-blur-xl border border-foreground/10 dark:border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        <!-- Inner subtle glow for the card -->
        <div
          class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <h3 class="text-2xl font-bold text-foreground dark:text-white transition-colors mb-8">{{ $t('contact.title') }}</h3>
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
import SocialLinks from "./SocialLinks.vue";

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
