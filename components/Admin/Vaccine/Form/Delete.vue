<script setup lang="ts">

import {useVaccineStore} from "~/stores/vaccine";

const props = defineProps<{id: number}>()

const vaccineStore = useVaccineStore()

const onSubmit = async () => {
  const result = await vaccineStore.dispatchDeleteById(props.id)
  if (result.success) {
    useSonner.success("The vaccine has been deleted!")
  } else {
    useSonner.error("Unable to delete the vaccine... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>