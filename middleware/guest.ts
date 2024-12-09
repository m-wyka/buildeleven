import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const { isAuth } = storeToRefs(authStore);

  if (!isAuth.value) {
    return;
  }

  if (to.path === "/login" || to.path === "/register") {
    return navigateTo("/");
  }
});
