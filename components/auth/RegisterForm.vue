<script setup lang="ts">
import { API_REGISTER } from "~/constants/endpoints";
import Btn from "../Btn.vue";
import Input from "../form/Input.vue";

const formData = reactive({
  name: "",
  email: "",
  password: "",
});

const handleSubmit = async () => {
  await useDataFetch(API_REGISTER, "auth_register", {
    method: "POST",
    body: JSON.stringify(formData, null, 2),
  });
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid gap-4 justify-items-end">
      <Input
        v-model:model-value="formData.name"
        type="text"
        id="name"
        label="Name"
      />

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
