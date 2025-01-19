<script setup lang="ts">

  import {usePetStore} from "~/stores/pet";

  const props = defineProps<{id: number}>()

  const petStore = usePetStore()

  const onSubmit = async () => {
    const result = await petStore.dispatchActivateAdmin(props.id)
    if (result.success) {
      useSonner.success("The pet has been activated!")
    } else {
      useSonner.error("Unable to activate the pet... please try again later.")
    }
  }
</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>