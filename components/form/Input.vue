<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";

defineProps<{
  id: string;
  label: string;
  type?: InputTypeHTMLAttribute;
  name?: string;
  error?: string;
  readonly?: boolean;
}>();

const model = defineModel();
</script>

<template>
  <div class="w-full">
    <label :for="id" class="block mb-1">
      {{ label }}
    </label>

    <input
      v-model="model"
      :type="type || 'text'"
      :id="id"
      :name="name"
      :readonly="readonly"
      class="input w-full rounded border-none bg-white/10 py-1.5 px-3 text-sm/6 text-white focus:outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-white/25"
    />

    <p v-if="error" class="mt-1 text-red-500 text-xs">
      {{ error }}
    </p>
  </div>
</template>

<style>
.input {
  &:read-only {
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
