<template>
  <AdminNotificationHeader>
      <AdminNotificationHeaderFormTrigger class="mb-3"/>
  </AdminNotificationHeader>

  <AdminNotificationSection v-if="loading">
    <AdminNotificationSkeletonItem/>
  </AdminNotificationSection>
  <AdminNotificationSection v-else>
    <Div v-for="notification in notifications" :key="notification.id" class="notification-item">
      <AdminNotificationItem :notification="notification" />
    </Div>
  </AdminNotificationSection>
</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { useNotificationStore } from "~/stores/notification";
  import { ref } from "vue";

  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Notification"},
  ])
  const notificationStore = useNotificationStore()
  const notifications = computed(() => notificationStore.notifications);
  const loading = ref(true);


  onMounted(async() => {
    useSonner.promise(notificationStore.dispatchGetAll().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>
