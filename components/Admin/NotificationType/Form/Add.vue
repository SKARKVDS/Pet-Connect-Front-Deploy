<script setup lang="ts">
  import {useTypeNotificationStore} from "~/stores/typeNotification";

  const emits = defineEmits(['close'])

  const typeStore = useTypeNotificationStore()

  const onSubmit = async (values: any) => {

    const result = await typeStore.dispatchAdd(values)
    if (result.success) {
      useSonner.success("The notification type has been added!")
      emits('close')
    } else {
      useSonner.error("Unable to add the notification type... please try again later.")
    }
  }


</script>

<template>
  <AdminNotificationTypeBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>