// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n"],
  hooks: {
    "build:before": () => {
      require("./server/app.ts"); // Run backend before Nuxt
    },
  },
  css: ["~/assets/scss/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern", // For remove warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  i18n: {
    strategy: "no_prefix",
    locales: ["pl"],
    defaultLocale: "pl",
    lazy: true,
    vueI18n: "./i18n/i18n.config.ts",
    detectBrowserLanguage: false,
    experimental: {
      localeDetector: "locale-detector.ts",
    },
  },
  // serverHandlers: [
  //   {
  //     route: "/uploads/(.*)",
  //     handler: "~/server/api/user/image.get.ts",
  //   },
  // ],
});
