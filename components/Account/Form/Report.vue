<script setup lang="ts">
  import {useNotificationStore} from "~/stores/notification";

  const emits = defineEmits(['close'])

  const notificationStore = useNotificationStore()

  const onSubmit = async (values: any) => {
    const result = await notificationStore.dispatchAdd(values)
    if (result.success) {
      useSonner.success("Your notification has been sent!")
      emits('close')
    } else {
      useSonner.error("Unable to add the notification... please try again later.")
    }
  }


</script>

<template>
  <AccountBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>