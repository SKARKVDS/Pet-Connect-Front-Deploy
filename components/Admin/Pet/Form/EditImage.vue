<script setup lang="ts">

  import {usePetStore} from "~/stores/pet";

  const props = defineProps<{id: number, url: string}>()

  const petStore = usePetStore()

  const onSubmit = async () => {
    const result = await petStore.dispatchResetImageAdmin(props.id)
    if (result.success) {
      useSonner.success("The user image has been deleted!")
    } else {
      useSonner.error("Unable to delete the user image... please try again later.")
    }
  }


</script>

<template>
  <div class="flex flex-col items-center">
    <img :src="url" alt="Pet avatar" class="rounded object-cover aspect-square border m-6" />
    <div class="flex space-x-4">
      <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
      <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
    </div>
  </div>

</template>

<style scoped>

</style>