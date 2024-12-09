import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const { isAuth } = storeToRefs(authStore);

  if (!isAuth.value) {
    return navigateTo("/login");
  }
});
