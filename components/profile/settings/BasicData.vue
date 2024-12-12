<script setup lang="ts">
import HttpStatusCode from "~/enums/httpStatusCode";
import { useDataFetch } from "~/composables/useDataFetch";
import { API_IMAGE_UPLOAD } from "~/constants/endpoints";
import { useAuthStore } from "~/store/auth";
import { useUser } from "~/composables/useUser";
import type { UserResponse } from "~/types/user";
import Input from "~/components/form/Input.vue";
import Card from "~/components/Card.vue";
import FileInput from "~/components/form/FileInput.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const { getUser, getUserImage } = storeToRefs(authStore);
const { fetchUserImage } = useUser();
const profileImage = ref<File | null>(null);

const handleProfileImageSave = async (value: File | null) => {
  const formData = new FormData();
  formData.append("file", value!);

  const { status } = await useDataFetch<UserResponse>(
    API_IMAGE_UPLOAD,
    "image_upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (status.value === HttpStatusCode.OK) {
    await fetchUserImage();
  }
};
</script>

<template>
  <Card :title="$t('PROFILE.BASIC_DATA')">
    <div class="flex-1">
      <div class="grid gap-4 content-between place-items-end h-full">
        <div class="grid gap-4 w-full">
          <Input
            v-if="getUser"
            v-model="getUser.nickname"
            id="currentPassword"
            :label="$t('FORM.NICKNAME')"
            readonly
          />

          <FileInput
            v-model="profileImage"
            id="profileImage"
            :label="$t('FORM.PROFILE_IMAGE')"
            accept="image/png, image/jpeg"
            :imagePreviewUrl="getUserImage?.url || null"
            @update:model-value="handleProfileImageSave"
          />
        </div>
      </div>
    </div>
  </Card>
</template>

<style></style>
