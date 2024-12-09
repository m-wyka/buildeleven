// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  hooks: {
    "build:before": () => {
      require("./server/app.js"); // Run backend before Nuxt
    },
  },
  css: ["~/assets/css/main.css"],
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
});
