<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";

defineProps<{
  id: string;
  label: string;
  type: InputTypeHTMLAttribute;
}>();

const model = defineModel();
</script>

<template>
  <div class="w-full">
    <label :for="id">
      {{ label }}
    </label>

    <input
      v-model="model"
      :type="type"
      :id="id"
      class="w-full mt-1 rounded border-none bg-white/10 py-1.5 px-3 text-sm/6 text-white focus:outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-white/25"
    />
  </div>
</template>

<style></style>
