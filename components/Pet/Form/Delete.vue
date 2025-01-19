<script setup lang="ts">

import {usePetStore} from "~/stores/pet";

const props = defineProps<{id: number}>()

const petStore = usePetStore()

const onSubmit = async () => {
  const result = await petStore.dispatchDisable(props.id)
  if (result.success) {
    useSonner.success("Your pet has been deleted!")
  } else {
    useSonner.error("Unable to delete your pet... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>