<script setup lang="ts">

import { useNotificationStore } from "~/stores/notification";

const props = defineProps<{id: number}>()

const notificationStore = useNotificationStore()

const onSubmit = async () => {
  const result = await notificationStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The notification has been deleted!")
  } else {
    useSonner.error("Unable to delete the notification... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>