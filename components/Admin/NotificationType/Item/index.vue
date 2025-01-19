<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { TypeNotification } from "~/services/typeNotification/types";

  const showEditForm = ref(false)
  defineProps<{notificationType: TypeNotification}>()
</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">

    <AdminNotificationTypeFormDialog v-model:open="showEditForm" title="Edit the type" desc="Edit the information about the notification type">
      <template #trigger>
        <AdminNotificationTypeItemActionEdit/>
      </template>
      <template #content>
        <AdminNotificationTypeFormEdit :notificationType="notificationType" @close="showEditForm = false" />
      </template>
    </AdminNotificationTypeFormDialog>
    <AdminNotificationTypeFormAlertDialog title="Delete the notification type" desc="Are you sure you want to delete the notification type this can be dangerous?">
      <template #trigger>
        <AdminNotificationTypeItemActionDelete/>
      </template>
      <template #content>
        <AdminNotificationTypeFormDelete :id="notificationType.id"/>
      </template>
    </AdminNotificationTypeFormAlertDialog>
  </UiTableCell>
</template>

<style scoped>

</style>