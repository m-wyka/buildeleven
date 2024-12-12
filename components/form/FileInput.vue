<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { TrashIcon } from "@heroicons/vue/24/solid";
import Btn from "../Btn.vue";
import BlankAvatar from "../profile/BlankAvatar.vue";

const props = defineProps<{
  modelValue: File | null;
  id?: string;
  label?: string;
  accept: string;
  imagePreviewUrl: string | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: File | null): void;
  (e: "on:save", value: HTMLInputElement | null): void;
}>();

const authStore = useAuthStore();
const { getUser } = storeToRefs(authStore);
const inputElement = ref<HTMLInputElement | null>(null);

const handleClearImage = () => {
  inputElement.value = null;
  emit("update:modelValue", null);
};

const handleInputChange = (event: Event) => {
  const inputTarget = event.target as HTMLInputElement;
  const { files } = inputTarget;

  if (!files) {
    inputElement.value = null;
    emit("update:modelValue", null);
    return;
  }

  emit("update:modelValue", files[0]);
};

const imagePreview = computed(() => {
  return props.modelValue ? URL.createObjectURL(props.modelValue) : "";
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      URL.revokeObjectURL(imagePreview.value);
    }
  }
);

const handleImagePreviewUrl = computed(() => props.imagePreviewUrl || "");
</script>

<template>
  <div>
    <p v-if="label" class="mb-2">{{ label }}</p>

    <div class="flex flex-row items-center gap-4">
      <div
        v-if="imagePreview || handleImagePreviewUrl"
        class="flex-initial relative"
      >
        <button
          @click="handleInputChange"
          class="absolute top-0 right-0 bg-red-500 p-2 rounded-full text-center"
        >
          <TrashIcon class="block size-6" />
        </button>

        <img
          :src="imagePreview || handleImagePreviewUrl"
          alt="Profile Image"
          class="size-48 object-cover rounded-full"
        />
      </div>

      <BlankAvatar v-else size="xl" />

      <div class="flex flex-auto items-center">
        <div class="flex flex-col gap-2 items-start">
          <Btn v-if="inputElement" @click="inputElement.click()">
            Wgraj zdjęcie
          </Btn>

          <p class="text-xs text-gray-400">JPG or PNG</p>
        </div>

        <input
          ref="inputElement"
          :id="id || undefined"
          type="file"
          class="hidden"
          :accept="accept"
          @change="handleInputChange"
        />
      </div>
    </div>
  </div>
</template>
