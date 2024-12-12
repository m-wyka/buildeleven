<script setup lang="ts">
import { useDataFetch } from "~/composables/useDataFetch";
import { API_LOGOUT } from "~/constants/endpoints";
import HttpStatusCode from "~/enums/httpStatusCode";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { useAuthStore } from "~/store/auth";
import { useUser } from "~/composables/useUser";
import BlankAvatar from "../profile/BlankAvatar.vue";

const route = useRoute();
const { t } = useI18n();
const authStore = useAuthStore();
const { getUser, getUserImage } = storeToRefs(authStore);
const { fetchUserData } = useUser();

const handleSignOut = async () => {
  const { status } = await useDataFetch(API_LOGOUT, "auth_logout", {
    method: "POST",
  });

  if (status.value === HttpStatusCode.NO_CONTENT) {
    authStore.setToken(undefined);
    authStore.setUser(null);
  }
};

const items = [
  { name: t("PROFILE.SETTINGS"), href: "/profile/settings", current: false },
];

const handleItems = computed(() => {
  return items.map((item) => ({
    ...item,
    current: route.path === item.href,
  }));
});

onMounted(async () => {
  if (!getUser.value) {
    await fetchUserData();
  }
});
</script>

<template>
  <Menu as="div" class="relative ml-3">
    <div v-if="getUser">
      <div class="flex items-center">
        <p class="mr-2 text-sm">{{ getUser.nickname }}</p>

        <MenuButton
          class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span class="absolute -inset-1.5" />
          <span class="sr-only">
            {{ $t("PROFILE.OPEN_USER_MENU") }}
          </span>

          <img
            v-if="getUserImage"
            class="size-10 rounded-full"
            :src="getUserImage.url"
            :alt="getUser.nickname"
          />

          <BlankAvatar v-else size="sm" />
        </MenuButton>
      </div>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <MenuItem
          v-for="(item, index) in handleItems"
          :key="index"
          v-slot="{ active }"
        >
          <a
            :href="item.href"
            :class="[
              active ? 'bg-gray-100 outline-none' : '',
              'block px-4 py-2 text-sm text-gray-700',
            ]"
          >
            {{ item.name }}</a
          >
        </MenuItem>

        <MenuItem v-slot="{ active }">
          <a
            href="#"
            :class="[
              active ? 'bg-gray-100 outline-none' : '',
              'block px-4 py-2 text-sm text-gray-700',
            ]"
            @click="handleSignOut"
          >
            {{ $t("AUTH.SIGN_OUT") }}
          </a>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
