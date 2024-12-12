import { useDataFetch } from "~/composables/useDataFetch";
import { API_USER, API_IMAGE } from "~/constants/endpoints";
import { useAuthStore } from "~/store/auth";
import type { UserImage } from "~/types/auth";
import type { UserAttributes } from "~/types/user";

export function useUser() {
  const authStore = useAuthStore();
  const { getUser } = storeToRefs(authStore);

  const fetchUserImage = async () => {
    if (!getUser.value) {
      return;
    }

    const { data } = await useDataFetch<UserImage | null>(
      `${API_IMAGE}/${getUser.value.id}`,
      "fetch_user_image"
    );

    if (data.value) {
      authStore.setUserImage(data.value);
    }
  };

  const fetchUserData = async () => {
    const { data } = await useDataFetch<UserAttributes>(API_USER, "fetch_user");

    if (data.value) {
      authStore.setUser(data.value);
      await fetchUserImage();
    }
  };

  return { fetchUserData, fetchUserImage };
}
