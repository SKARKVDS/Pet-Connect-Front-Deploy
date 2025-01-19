<script setup lang="ts">

  import { useProposalStore } from "~/layers/proposals/stores/proposal";

  const props = defineProps<{id: number}>()

  const proposalStore = useProposalStore()

  const onSubmit = async () => {
    const result = await proposalStore.dispatchActivateAdmin(props.id)
    if (result.success) {
      useSonner.success("The proposal has been activated!")
    } else {
      useSonner.error("Unable to activate the proposal... please try again later.")
    }
  }
</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>