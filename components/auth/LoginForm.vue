<script setup lang="ts">
import { useDataFetch } from "~/composables/useDataFetch";
import { API_LOGIN } from "~/constants/endpoints";
import Btn from "../Btn.vue";
import Input from "../form/Input.vue";
import HttpStatusCode from "~/enums/httpStatusCode";
import { useAuthStore } from "~/store/auth";
import type { UserResponse } from "~/server/types/user";

const { t } = useI18n();
const authStore = useAuthStore();
const formData = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  const { data, status } = await useDataFetch<UserResponse>(
    API_LOGIN,
    "auth_login",
    {
      method: "POST",
      body: JSON.stringify(formData, null, 2),
    }
  );

  if (status.value === HttpStatusCode.OK) {
    if (!data.value) {
      return;
    }

    const { token, user } = data.value;
    authStore.setToken(token);
    authStore.setUser(user);

    // Clear form
    formData.email = "";
    formData.password = "";

    navigateTo("/");
  }

  if (
    status.value === HttpStatusCode.BAD_REQUEST ||
    status.value === HttpStatusCode.UNAUTHORIZED
  ) {
    useNuxtApp().$toast.error(t("AUTH.MESSAGES.INVALID_EMAIL_OR_PASSWORD"));
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid gap-4 justify-items-end">
      <Input
        v-model:model-value="formData.email"
        type="email"
        id="email"
        :label="$t('FORM.EMAIL')"
      />

      <Input
        v-model:model-value="formData.password"
        type="password"
        id="password"
        :label="$t('FORM.PASSWORD')"
      />

      <Btn type="submit">
        {{ $t("AUTH.SIGN_IN") }}
      </Btn>
    </div>
  </form>
</template>
