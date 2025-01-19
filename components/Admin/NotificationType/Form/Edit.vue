<script setup lang="ts">

import {useRaceStore} from "~/stores/race";
import type { Race } from "~/services/race/types";
import { useTypeNotificationStore } from "~/stores/typeNotification";
import type { TypeNotification } from "~/services/typeNotification/types";
const emits = defineEmits(['close'])

const props = defineProps<{notificationType :TypeNotification}>()



const typeStore = useTypeNotificationStore()

const onSubmit = async (values: any) => {
  values.id = props.notificationType.id

  const result = await typeStore.dispatchUpdate(values)
  if (result.success) {
    useSonner.success("Your notification type has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update your notification type... please try again later.")
  }
}

</script>

<template>
  <AdminNotificationTypeBaseForm :notificationType="notificationType" @onSubmit="onSubmit"/>
</template>