// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxt/ui",
    "shadcn-nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
  ],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],
  colorMode: {
    classSuffix: "",
  },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || "",
    contactRecipientEmail: process.env.CONTACT_RECIPIENT_EMAIL || "",
    public: {
      contactEmail:
        process.env.NUXT_PUBLIC_CONTACT_EMAIL ||
        process.env.CONTACT_EMAIL ||
        "",
    },
  },

  routeRules: {
    "/": { prerender: true },
  },

  sourcemap: {
    server: false,
    client: false,
  },

  nitro: {
    preset: "cloudflare-module",
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  experimental: {
    sharedPrerenderData: true,
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },

  compatibilityDate: "2026-06-30",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  i18n: {
    lazy: true,
    langDir: "../app/locales",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "id", name: "Bahasa Indonesia", file: "id.json" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: false,
      fallbackLocale: "en",
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
});
