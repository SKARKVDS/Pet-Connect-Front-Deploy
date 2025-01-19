<script setup lang="ts">

import { useSpecieStore } from "~/stores/specie";

const props = defineProps<{id: number}>()

const specieStore = useSpecieStore()

const onSubmit = async () => {
  const result = await specieStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The specie has been deleted!")
  } else {
    useSonner.error("Unable to delete the specie... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>