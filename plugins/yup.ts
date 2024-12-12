import { setLocale } from "yup";

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-ignore
  const { t } = nuxtApp.$i18n;

  setLocale({
    mixed: {
      required: t("VALIDATION.FIELD_REQUIRED"),
    },
    string: {
      email: t("VALIDATION.EMAIL"),
    },
  });
});
