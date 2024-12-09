<script setup lang="ts">
import { useDataFetch } from "~/composables/useDataFetch";
import { API_LOGIN } from "~/constants/endpoints";
import Btn from "../Btn.vue";
import Input from "../form/Input.vue";
import HttpStatusCode from "~/enums/httpStatusCode";
import { useAuthStore } from "~/store/auth";
import type { UserResponse } from "~/server/types/user";

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

  if (!data.value) {
    return;
  }

  if (status.value === HttpStatusCode.OK) {
    const { token, user } = data.value;
    authStore.setToken(token);
    authStore.setUser(user);

    // Clear form
    formData.email = "";
    formData.password = "";

    navigateTo("/");
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
        label="Email"
      />

      <Input
        v-model:model-value="formData.password"
        type="password"
        id="password"
        label="Password"
      />

      <Btn type="submit">Submit</Btn>
    </div>
  </form>
</template>
