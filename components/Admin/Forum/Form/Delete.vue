<script setup lang="ts">

import { useForumStore } from "~/stores/forum";

const props = defineProps<{id: number}>()

const forumStore = useForumStore()

const onSubmit = async () => {
  const result = await forumStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The forum has been deleted!")
  } else {
    useSonner.error("Unable to delete the forum... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>