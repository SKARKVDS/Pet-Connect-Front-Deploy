<script setup lang="ts">

import { useBadgeStore } from "~/stores/badge";

const props = defineProps<{id: number}>()

const badgeStore = useBadgeStore()

const onSubmit = async () => {
  const result = await badgeStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The badge has been deleted!")
  } else {
    useSonner.error("Unable to delete the badge... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>