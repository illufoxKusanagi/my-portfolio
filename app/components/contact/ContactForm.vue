<template>
  <form
    class="flex flex-col gap-6"
    novalidate
    @submit.prevent="submitForm"
  >
    <!-- Invisible Spam Honeypot Field (Silently traps automated bot submissions) -->
    <div class="hidden" aria-hidden="true">
      <label for="company_url">Company URL</label>
      <input
        id="company_url"
        v-model="companyUrl"
        type="text"
        tabindex="-1"
        autocomplete="off"
      >
    </div>

    <!-- Name Field -->
    <div class="flex flex-col gap-2">
      <label for="name" class="text-sm font-medium text-foreground/80 dark:text-white/80">
        {{ $t('contact.nameLabel') }}
      </label>
      <input
        id="name"
        v-model="name"
        type="text"
        required
        class="w-full px-4 py-3 bg-foreground/5 dark:bg-white/5 border rounded-lg text-foreground dark:text-white transition-all placeholder-foreground/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-700"
        :class="fieldErrors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-foreground/10 dark:border-white/10 focus:border-transparent'"
        :placeholder="$t('contact.namePlaceholder')"
      >
      <span v-if="fieldErrors.name" class="text-rose-500 text-xs font-tech">
        {{ fieldErrors.name }}
      </span>
    </div>

    <!-- Email Field -->
    <div class="flex flex-col gap-2">
      <label for="email" class="text-sm font-medium text-foreground/80 dark:text-white/80">
        {{ $t('contact.emailLabel') }}
      </label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        class="w-full px-4 py-3 bg-foreground/5 dark:bg-white/5 border rounded-lg text-foreground dark:text-white transition-all placeholder-foreground/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-700"
        :class="fieldErrors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-foreground/10 dark:border-white/10 focus:border-transparent'"
        :placeholder="$t('contact.emailPlaceholder')"
      >
      <span v-if="fieldErrors.email" class="text-rose-500 text-xs font-tech">
        {{ fieldErrors.email }}
      </span>
    </div>

    <!-- Message Field -->
    <div class="flex flex-col gap-2">
      <label for="message" class="text-sm font-medium text-foreground/80 dark:text-white/80">
        {{ $t('contact.messageLabel') }}
      </label>
      <textarea
        id="message"
        v-model="message"
        required
        rows="5"
        class="w-full px-4 py-3 bg-foreground/5 dark:bg-white/5 border rounded-lg text-foreground dark:text-white transition-all placeholder-foreground/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-700 resize-y min-h-[120px]"
        :class="fieldErrors.message ? 'border-rose-500 ring-1 ring-rose-500' : 'border-foreground/10 dark:border-white/10 focus:border-transparent'"
        :placeholder="$t('contact.messagePlaceholder')"
      />
      <span v-if="fieldErrors.message" class="text-rose-500 text-xs font-tech">
        {{ fieldErrors.message }}
      </span>
    </div>

    <!-- General Error Banner -->
    <div v-if="status === 'error' && errorMessage" class="text-rose-400 text-xs bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 font-tech" role="alert">
      {{ errorMessage }}
    </div>

    <!-- General Success Banner -->
    <div v-if="status === 'success'" class="text-emerald-400 text-xs bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20 font-tech" role="status">
      {{ $t('contact.successMessage') }}
    </div>

    <button
      type="submit"
      :disabled="!isFormValid || status === 'submitting' || status === 'success'"
      class="mt-2 relative w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white font-bold rounded-lg transition-all hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-purple-100 dark:focus:ring-offset-purple-800 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-lg cursor-pointer"
    >
      <span :class="{ 'opacity-0': status === 'submitting' }">
        {{ status === 'success' ? 'Transmission Complete' : (status === 'submitting' ? $t('contact.sendingButton') : $t('contact.sendButton')) }}
      </span>

      <!-- Loading Spinner -->
      <svg
        v-if="status === 'submitting'"
        class="absolute inset-0 m-auto animate-spin h-6 w-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </button>
  </form>
</template>

<script setup lang="ts">
import { useContactForm } from "./useContactForm";

const {
  name,
  email,
  message,
  companyUrl,
  status,
  errorMessage,
  fieldErrors,
  isFormValid,
  submitForm,
} = useContactForm();
</script>
