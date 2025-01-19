<script setup lang="ts">

import { useTopicStore } from "~/stores/topic";

const props = defineProps<{id: number}>()

const topicStore = useTopicStore()

const onSubmit = async () => {
  const result = await topicStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The topic has been deleted!")
  } else {
    useSonner.error("Unable to delete the topic... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>