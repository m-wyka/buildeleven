<script setup lang="ts">
import { object, string } from "yup";
import { useField, useForm } from "vee-validate";
import { useDataFetch } from "~/composables/useDataFetch";
import { API_REGISTER } from "~/constants/endpoints";
import { nicknameRegex, passwordRegex } from "~/constants/regex";
import HttpStatusCode from "~/enums/httpStatusCode";
import type { CreateUserBody } from "~/types/user";
import Btn from "../Btn.vue";
import Input from "../form/Input.vue";

const { t } = useI18n();
const loading = ref(false);

const { handleSubmit } = useForm<CreateUserBody>({
  validationSchema: object({
    nickname: string()
      .required()
      .matches(nicknameRegex, t("VALIDATION.NICKNAME")),
    email: string().email().required(),
    password: string()
      .required()
      .matches(passwordRegex, t("VALIDATION.PASSWORD")),
  }),
});

const { value: nickname, errorMessage: nicknameError } = useField("nickname");
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const submit = handleSubmit(async (values) => {
  loading.value = true;

  const { nickname, email, password } = values;
  const formData = {
    nickname,
    email,
    password,
  };

  const { error, status } = await useDataFetch(API_REGISTER, "auth_register", {
    method: "POST",
    body: JSON.stringify(formData, null, 2),
  });

  if (status.value === HttpStatusCode.OK) {
    useNuxtApp().$toast.success(t("AUTH.MESSAGES.REGISTER_SUCCESS"));
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
        v-model:model-value="nickname"
        type="text"
        id="name"
        name="nickname"
        :label="$t('FORM.NICKNAME')"
        :error="nicknameError"
      />

      <Input
        v-model:model-value="email"
        type="email"
        id="email"
        name="email"
        :label="$t('FORM.EMAIL')"
        :error="emailError"
      />

      <Input
        v-model:model-value="password"
        type="password"
        id="password"
        name="password"
        :label="$t('FORM.PASSWORD')"
        :error="passwordError"
      />

      <Btn type="submit" :loading="loading">
        {{ $t("AUTH.SIGN_UP") }}
      </Btn>
    </div>
  </form>
</template>
