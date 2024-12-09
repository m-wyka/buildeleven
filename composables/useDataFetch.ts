import HttpStatusCode from "~/enums/httpStatusCode";
import type { NitroFetchRequest } from "nitropack";
import type { BaererToken } from "~/types/auth";

export async function useDataFetch<T>(
  request: NitroFetchRequest,
  key: string,
  options?: any
) {
  const config = useRuntimeConfig();
  const token = useCookie<BaererToken>("BEARER-TOKEN");
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const pending = ref<boolean>(true);
  const status = ref<HttpStatusCode | undefined>(undefined);

  try {
    data.value = await $fetch<T>(request, {
      baseURL: config.public.baseURL,
      key,
      method: options?.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      ...options,
      onResponse({ response }) {
        status.value = response.status;
      },
    });
  } catch (err) {
    error.value = err as Error;
  } finally {
    pending.value = false;
  }

  return { data, error, pending, status };
}
