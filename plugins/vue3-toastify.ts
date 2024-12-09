import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "@/assets/scss/vue3-toastify.scss";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    theme: "colored",
    position: "bottom-right",
    hideProgressBar: true,
    dangerouslyHTMLString: true,
    autoClose: 5000,
  });

  return {
    provide: { toast },
  };
});
