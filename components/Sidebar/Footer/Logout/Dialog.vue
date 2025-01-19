<script setup lang="ts">

import {useAuthStore} from "~/stores/auth";

const open = defineModel('open')

const router = useRouter()
const authStore = useAuthStore()

function onLogout() {
  authStore.logout()
  router.push("/login")
}

</script>

<template>
  <UiAlertDialog v-model:open="open">
    <UiAlertDialogContent>
      <div class="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
        <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
        >
          <Icon name="lucide:circle-alert" class="size-4 opacity-80" />
        </div>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle>Log out</UiAlertDialogTitle>
          <UiAlertDialogDescription>
            Are you sure you want to log out of your account?
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
      </div>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
        <UiAlertDialogAction @click="onLogout">Confirm</UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>