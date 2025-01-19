<script setup lang="ts">
  import { useRequestStore } from "~/stores/request";

const props = defineProps<{id: number}>()

const requestStore = useRequestStore()

const onSubmit = async () => {
  const result = await requestStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The request has been deleted!")
  } else {
    useSonner.error("Unable to delete the request... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>