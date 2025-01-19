<script setup lang="ts">

import { useRaceStore } from "~/stores/race";

const props = defineProps<{id: number}>()

const raceStore = useRaceStore()

const onSubmit = async () => {
  const result = await raceStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The race has been deleted!")
  } else {
    useSonner.error("Unable to delete the race... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>