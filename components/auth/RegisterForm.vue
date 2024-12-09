<script setup lang="ts">
import { useDataFetch } from "~/composables/useDataFetch";
import { API_REGISTER } from "~/constants/endpoints";
import Btn from "../Btn.vue";
import Input from "../form/Input.vue";
import HttpStatusCode from "~/enums/httpStatusCode";

const { t } = useI18n();
const formData = reactive({
  nickname: "",
  email: "",
  password: "",
});

const handleSubmit = async () => {
  const { status } = await useDataFetch(API_REGISTER, "auth_register", {
    method: "POST",
    body: JSON.stringify(formData, null, 2),
  });

  switch (status.value) {
    case HttpStatusCode.OK:
      useNuxtApp().$toast.error(t("AUTH.MESSAGES.REGISTER_SUCCESS"));
      break;
    case HttpStatusCode.BAD_REQUEST:
      useNuxtApp().$toast.error(t("AUTH.MESSAGES.ALL_FIELDS_REQUIRED"));
      break;
    case HttpStatusCode.CONFLICT:
      useNuxtApp().$toast.error(t("AUTH.MESSAGES.USER_EXIST"));
      break;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid gap-4 justify-items-end">
      <Input
        v-model:model-value="formData.nickname"
        type="text"
        id="nickname"
        :label="$t('FORM.NICKNAME')"
      />

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
        {{ $t("AUTH.SIGN_UP") }}
      </Btn>
    </div>
  </form>
</template>
