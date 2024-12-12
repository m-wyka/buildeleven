<script setup lang="ts">
import { object, string } from "yup";
import { useField, useForm } from "vee-validate";
import { useDataFetch } from "~/composables/useDataFetch";
import { API_LOGIN } from "~/constants/endpoints";
import { useAuthStore } from "~/store/auth";
import HttpStatusCode from "~/enums/httpStatusCode";
import type { LoginUserBody, UserResponse } from "~/types/user";
import Btn from "../Btn.vue";
import Input from "../form/Input.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const loading = ref(false);

const { handleSubmit } = useForm<LoginUserBody>({
  validationSchema: object({
    email: string().email().required(),
    password: string().required(),
  }),
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const submit = handleSubmit(async (values) => {
  loading.value = true;

  const { email, password } = values;
  const formData = {
    email,
    password,
  };

  const { data, error, status } = await useDataFetch<UserResponse>(
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

  if (error.value) {
    const { message } = error.value;
    useNuxtApp().$toast.error(message);
  }

  loading.value = false;
});
</script>

<template>
  <form @submit.prevent="submit">
    <div class="grid gap-4 justify-items-end">
      <Input
        v-model="email"
        type="email"
        id="email"
        name="email"
        :label="$t('FORM.EMAIL')"
        :error="emailError"
      />

      <Input
        v-model="password"
        type="password"
        id="password"
        name="password"
        :label="$t('FORM.PASSWORD')"
        :error="passwordError"
      />

      <Btn type="submit" :loading="loading">
        {{ $t("AUTH.SIGN_IN") }}
      </Btn>
    </div>
  </form>
</template>
