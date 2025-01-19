<template>
  <AdminNotificationTypeHeader>
    <AdminNotificationTypeFormDialog v-model:open="showAddForm" title="Add a notification type" desc="Fill the information about the type">
      <template #trigger>
        <AdminNotificationTypeHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <AdminNotificationTypeFormAdd @close="showAddForm = false" />
      </template>
    </AdminNotificationTypeFormDialog>
  </AdminNotificationTypeHeader>

  <AdminNotificationTypeSkeletonSection v-if="loading"/>
  <AdminNotificationTypeSection v-else :notificationsTypes="notificationsTypes" />

</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { ref } from "vue";
  import { useRaceStore } from "~/stores/race";
  import { useTypeNotificationStore } from "~/stores/typeNotification";
  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Notification", link: "/admin/notification"},
    {label: "Type"},
  ])

  const typeStore = useTypeNotificationStore()
  const notificationsTypes = computed(() => typeStore.typesNotifications);
  const showAddForm = ref(false)
  const loading = ref(true);


  onMounted(async() => {
    useSonner.promise(typeStore.dispatchGetAll().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>