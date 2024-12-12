<script setup lang="ts">
import { object, string } from "yup";
import { useField, useForm } from "vee-validate";
import { useDataFetch } from "~/composables/useDataFetch";
import { API_CHANGE_PASSWORD } from "~/constants/endpoints";
import HttpStatusCode from "~/enums/httpStatusCode";
import { passwordRegex } from "~/constants/regex";
import type { ChangePasswordBody, UserResponse } from "~/types/user";
import Btn from "~/components/Btn.vue";
import Input from "~/components/form/Input.vue";
import Card from "~/components/Card.vue";

const { t } = useI18n();
const loading = ref(false);

const { handleSubmit, resetForm } = useForm<ChangePasswordBody>({
  validationSchema: object({
    currentPassword: string().required(),
    newPassword: string()
      .required()
      .matches(passwordRegex, t("VALIDATION.PASSWORD")),
  }),
});

const { value: currentPassword, errorMessage: currentPasswordError } =
  useField("currentPassword");
const { value: newPassword, errorMessage: newPasswordError } =
  useField("newPassword");

const submit = handleSubmit(async (values) => {
  loading.value = true;

  const { currentPassword, newPassword } = values;
  const formData = {
    currentPassword,
    newPassword,
  };

  const { error, status } = await useDataFetch<UserResponse>(
    API_CHANGE_PASSWORD,
    "profile_settings_change_password",
    {
      method: "POST",
      body: JSON.stringify(formData, null, 2),
    }
  );

  if (status.value === HttpStatusCode.OK) {
    resetForm();
  }

  if (error.value) {
    const { message } = error.value;
    useNuxtApp().$toast.error(message);
  }

  loading.value = false;
});
</script>

<template>
  <Card :title="$t('PROFILE.PASSWORD_CHANGE')">
    <form @submit.prevent="submit" class="flex-1">
      <div class="grid gap-4 content-between place-items-end h-full">
        <div class="grid gap-4 w-full">
          <Input
            v-model="currentPassword"
            type="password"
            id="currentPassword"
            name="currentPassword"
            :label="$t('FORM.CURRENT_PASSWORD')"
            :error="currentPasswordError"
          />

          <Input
            v-model="newPassword"
            type="password"
            id="newPassword"
            name="newPassword"
            :label="$t('FORM.NEW_PASSWORD')"
            :error="newPasswordError"
          />
        </div>

        <Btn type="submit" :loading="loading">
          {{ $t("FORM.SAVE") }}
        </Btn>
      </div>
    </form>
  </Card>
</template>

<style></style>
