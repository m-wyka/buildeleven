<script setup lang="ts">
import LoginForm from "~/components/auth/LoginForm.vue";

definePageMeta({
  middleware: "guest",
});
</script>

<template>
  <div class="container">
    <div class="wrapper bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h1 class="text-4xl mb-8 font-semibold">
        {{ $t("PAGES.LOGIN") }}
      </h1>

      <LoginForm />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  max-width: 500px;
  margin: 0 auto;
}
</style>
