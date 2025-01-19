<script setup lang="ts">

  import {usePetStore} from "~/stores/pet";

  const props = defineProps<{id: number}>()

  const petStore = usePetStore()

  const onSubmit = async () => {
    const result = await petStore.dispatchDisableAdmin(props.id)
    if (result.success) {
      useSonner.success("The pet has been disabled!")
    } else {
      useSonner.error("Unable to disable the pet... please try again later.")
    }
  }
</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>