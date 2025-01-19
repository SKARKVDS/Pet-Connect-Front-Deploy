<script setup lang="ts">

import { useTypeNotificationStore } from "~/stores/typeNotification";

const props = defineProps<{id: number}>()

const typeStore = useTypeNotificationStore()

const onSubmit = async () => {
  const result = await typeStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The notification type has been deleted!")
  } else {
    useSonner.error("Unable to delete the notification type... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>