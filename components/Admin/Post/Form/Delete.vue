<script setup lang="ts">

import { usePostStore } from "~/stores/post";

const props = defineProps<{id: number}>()

const postStore = usePostStore()

const onSubmit = async () => {
  const result = await postStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The post has been deleted!")
  } else {
    useSonner.error("Unable to delete the post... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>