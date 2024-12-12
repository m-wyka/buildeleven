<script setup lang="ts">
defineProps<{
  title?: string;
}>();

const titleClass = "text-3xl mb-8 font-medium";
</script>

<template>
  <div
    class="bg-gray-800 p-4 rounded-lg border border-gray-700 h-full flex flex-col"
  >
    <h1 v-if="title && !$slots.title" :class="titleClass">
      {{ title }}
    </h1>

    <div v-if="$slots.title" :class="titleClass">
      <slot name="title" />
    </div>

    <slot />
  </div>
</template>
