import HttpStatusCode from "~/enums/httpStatusCode";
import type { NitroFetchRequest } from "nitropack";
import type { ErrorHandler } from "~/types/api";
import { useAuthStore } from "~/store/auth";

export async function useDataFetch<T>(
  request: NitroFetchRequest,
  key: string,
  options?: any
) {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const { getToken } = storeToRefs(authStore);
  const data = ref<T | null>(null);
  const error = ref<ErrorHandler | null>(null);
  const pending = ref<boolean>(true);
  const status = ref<HttpStatusCode | undefined>(undefined);

  try {
    data.value = await $fetch<T>(request, {
      baseURL: config.public.baseURL,
      key,
      method: options?.method || "GET",
      headers: {
        // "Content-Type": "application/json",
        Accept: "application/json",
        ...(getToken.value !== undefined && {
          Authorization: `Bearer ${getToken.value}`,
        }),
      },
      ...options,
      onResponse({ response }) {
        status.value = response.status;
      },
      onResponseError({ response }) {
        error.value = response._data as ErrorHandler;
      },
    });
  } catch (err) {
    //
  } finally {
    pending.value = false;
  }

  return { data, error, pending, status };
}
