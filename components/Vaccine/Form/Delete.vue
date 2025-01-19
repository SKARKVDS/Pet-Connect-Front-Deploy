<script setup lang="ts">

import { useVaccinationStore } from "~/stores/vaccination";

const props = defineProps<{id: number}>()

const vaccinationStore = useVaccinationStore()

const onSubmit = async () => {
  const result = await vaccinationStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The vaccination has been deleted!")
  } else {
    useSonner.error("Unable to delete the vaccination... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>