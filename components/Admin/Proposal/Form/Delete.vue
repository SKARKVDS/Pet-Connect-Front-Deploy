<script setup lang="ts">

import { useProposalStore } from "~/layers/proposals/stores/proposal";

const props = defineProps<{id: number}>()

const proposalStore = useProposalStore()

const onSubmit = async () => {
  const result = await proposalStore.dispatchDeleteByIdAdmin(props.id)
  if (result.success) {
    useSonner.success("The proposal has been deleted!")
  } else {
    useSonner.error("Unable to delete the proposal... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>