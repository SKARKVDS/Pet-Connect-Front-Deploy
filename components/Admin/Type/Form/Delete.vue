<script setup lang="ts">

  import {useTypeStore} from "~/stores/type";

  const props = defineProps<{id: number}>()

  const typeStore = useTypeStore()

  const onSubmit = async () => {
    const result = await typeStore.dispatchDeleteById(props.id)
    if (result.success) {
      useSonner.success("The type has been deleted!")
    } else {
      useSonner.error("Unable to delete the type... please try again later.")
    }
  }


</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>