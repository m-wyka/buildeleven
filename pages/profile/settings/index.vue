<script setup lang="ts">
import BasicData from "~/components/profile/settings/BasicData.vue";
import PasswordChangeForm from "~/components/profile/settings/PasswordChangeForm.vue";
</script>

<template>
  <div class="container">
    <div class="text-3xl mb-8 font-medium">
      {{ $t("PROFILE.PROFILE_SETTINGS") }}
    </div>

    <div class="grid gap-4 grid-cols-2">
      <BasicData />
      <PasswordChangeForm />
    </div>
  </div>
</template>

<style></style>
