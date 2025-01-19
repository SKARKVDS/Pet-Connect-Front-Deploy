<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Notification } from "~/services/notification/types";

  // Définir les props pour recevoir les informations du forum
  defineProps<{notification: Notification }>()

</script>

<template>
  <UiCard>
    <UiCardContent>
      <div class="flex items-center gap-3 rounded-lg border p-2">
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <Icon class="size-4" name="lucide:user-round" />
        </div>
        <div class="flex flex-col items-start text-sm">
          <h2>{{ notification.creatorName }}</h2>
        </div>
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <Icon name="lucide:shapes" class="h-6 w-6"/>
        </div>
        <div class="flex flex-col items-start text-sm">
          <h2>{{ notification.typeName }}</h2>
        </div>

        <div class="flex ml-auto gap-3">
          <AdminNotificationFormAlertDialog title="Delete the notification" desc="Are you sure you want to delete the notification?">
            <template #trigger>
              <AdminNotificationItemActionDelete/>
            </template>
            <template #content>
              <AdminNotificationFormDelete :id="notification.id"/>
            </template>
          </AdminNotificationFormAlertDialog>
        </div>
      </div>


      <div class="flex gap-5 p-8">
        <div class="flex flex-col items-start text-sm">
          <h1>{{notification.name}}</h1>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<style scoped>

</style>