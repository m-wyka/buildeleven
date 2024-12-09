import pl from "./locales/pl.json";

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: "pl",
    fallbackLocale: "pl",
    messages: {
      pl,
    },
  };
});
