<script setup lang="ts">
  import { useRequestStore } from "~/stores/request";
  import { useReservationStore } from "~/stores/reservation";

const props = defineProps<{id: number}>()

const reservationStore = useReservationStore()

const onSubmit = async () => {
  const result = await reservationStore.dispatchFinish(props.id)
  if (result.success) {
    useSonner.success("The reservation has been updated!")
  } else {
    useSonner.error("Unable to update the reservation... please try again later.")
  }
}

</script>

<template>
  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
  <UiAlertDialogAction @click="onSubmit">Confirm</UiAlertDialogAction>
</template>

<style scoped>

</style>