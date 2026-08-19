<template>
  <div
    class="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 max-w-sm w-[calc(100vw-3rem)] pointer-events-none"
    aria-live="polite"
    aria-label="Notification alerts"
  >
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-card pointer-events-auto"
        role="alert"
      >
        <!-- 1. Left Color Accent Strip -->
        <div
          class="w-2 self-stretch shrink-0"
          :class="{
            'bg-emerald-500': toast.type === 'success',
            'bg-rose-500': toast.type === 'error',
            'bg-amber-500': toast.type === 'warning',
            'bg-primary-500': toast.type === 'info',
          }"
        />

        <!-- 2. Content Body -->
        <div class="flex-1 p-3.5 flex flex-col justify-between overflow-hidden">
          <div class="flex items-start justify-between gap-2">
            <div>
              <!-- Telemetry Header -->
              <span class="font-tech font-extrabold text-[10px] text-primary-600 dark:text-primary-400 uppercase tracking-widest block">
                // {{ toast.telemetryTag }}
              </span>
              <!-- Title -->
              <h4 class="font-sans font-bold text-sm text-foreground dark:text-white leading-snug mt-0.5">
                {{ toast.title }}
              </h4>
            </div>

            <!-- Close (X) Button -->
            <button
              class="w-6 h-6 rounded-md hover:bg-foreground/10 dark:hover:bg-white/10 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white flex items-center justify-center transition-colors shrink-0"
              aria-label="Dismiss notification"
              @click="removeToast(toast.id)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- Message Text -->
          <p class="font-sans text-xs text-foreground/80 dark:text-white/80 leading-relaxed mt-1">
            {{ toast.message }}
          </p>

          <!-- Animated Countdown Progress Bar -->
          <div
            v-if="toast.duration && toast.duration > 0"
            class="h-0.5 w-full bg-foreground/10 dark:bg-white/10 rounded-full mt-2.5 overflow-hidden"
          >
            <div
              class="h-full toast-progress"
              :class="{
                'bg-emerald-500': toast.type === 'success',
                'bg-rose-500': toast.type === 'error',
                'bg-amber-500': toast.type === 'warning',
                'bg-primary-500': toast.type === 'info',
              }"
              :style="{ animationDuration: `${toast.duration}ms` }"
            />
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useCyberToast } from "~/composables/useCyberToast";

const { toasts, removeToast } = useCyberToast();
</script>

<style scoped>
.toast-card {
  display: flex;
  background: var(--color-primary-200, #e0f2fe);
  border: 1px solid var(--color-primary-400, #38bdf8);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  backdrop-filter: blur(16px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

:global(.dark) .toast-card {
  background: rgba(10, 15, 30, 0.92);
  border-color: rgba(56, 189, 248, 0.3);
}

.toast-progress {
  animation: countdown linear forwards;
  transform-origin: left;
}

@keyframes countdown {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.toast-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-leave-active {
  transition: all 0.25s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(60px) scale(0.9);
}
</style>
