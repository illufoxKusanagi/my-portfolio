<template>
  <div class="flex items-center" role="group" aria-label="Language Selector">
    <button
      class="lang-btn"
      :class="{ 'lang-btn--active': locale === 'en' }"
      aria-label="Switch to English"
      :aria-pressed="locale === 'en'"
      @click="setLanguage('en')"
    >
      <span>En</span>
      <img
        src="/images/flag_en.png"
        alt=""
        aria-hidden="true"
        class="flag-icon"
      >
    </button>

    <button
      class="lang-btn"
      :class="{ 'lang-btn--active': locale === 'id' }"
      aria-label="Switch to Bahasa Indonesia"
      :aria-pressed="locale === 'id'"
      @click="setLanguage('id')"
    >
      <span>Id</span>
      <div class="flag-icon flag-id" aria-hidden="true">
        <div class="flag-id-red" />
        <div class="flag-id-white" />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n({ useScope: 'global' });

const setLanguage = async (lang: "en" | "id") => {
  if (locale.value === lang) return;
  await setLocale(lang);
};
</script>

<style scoped>
.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  font-family: var(--font-tech);
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.0075em;
  color: var(--color-foreground);
  background: var(--color-muted);
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  user-select: none;
}

.lang-btn:first-child {
  border-radius: 6px 0 0 6px;
}

.lang-btn:last-child {
  border-radius: 0 6px 6px 0;
}

.lang-btn:hover:not(.lang-btn--active) {
  opacity: 0.8;
}

.lang-btn--active {
  background: var(--color-primary-700);
  color: white;
}

.flag-icon {
  width: 18px;
  height: 11px;
  border-radius: 2px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
}

.flag-id {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.flag-id-red {
  width: 100%;
  height: 50%;
  background: #e11d48;
}

.flag-id-white {
  width: 100%;
  height: 50%;
  background: #ffffff;
}
</style>
