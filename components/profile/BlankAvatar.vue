<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const props = defineProps<{
  size?: "sm" | "xl";
}>();

const authStore = useAuthStore();
const { getUser } = storeToRefs(authStore);

const handleClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "size-10 text-xl";
    case "xl":
      return "size-48 text-6xl";
    default:
      return "size-10 text-xl";
  }
});
</script>

<template>
  <div
    class="flex items-center justify-center bg-gray-700 rounded-full font-medium select-none"
    :class="handleClass"
  >
    {{ getUser?.nickname.charAt(0).toUpperCase() }}
  </div>
</template>
