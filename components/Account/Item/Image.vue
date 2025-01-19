<script setup lang="ts">
  import {useNotificationStore} from "~/stores/notification";
  import type { Account } from "~/services/user/types";
  import { useAccountStore } from "~/stores/account";

  const emits = defineEmits(['close'])

  defineProps<{user: Account}>()

  const userStore = useAccountStore()

  const onSubmit = async (values: any) => {
    const result = await userStore.dispatchUpdateUserImage(values.avatar)
    if (result.success) {
      useSonner.success("Your image has been updated!")
      emits('close')
    } else {
      useSonner.error("Unable to update your image... please try again later.")
    }
  }


</script>

<template>
  <div class="flex flex-col w-full gap-4 items-center">
    <UiAvatar class="w-72 h-72 border border-black">
      <UiAvatarImage :src="user.url" alt="https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg" />
      <UiAvatarFallback>Loading</UiAvatarFallback>
    </UiAvatar>

    <AccountBaseFormImage :userUrl="user.url" @onSubmit="onSubmit"/>
  </div>
</template>

<style scoped>

</style>