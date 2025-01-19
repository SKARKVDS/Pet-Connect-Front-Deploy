<template>
  <AdminUserSkeletonSection v-if="loading"/>
  <AdminUserSection v-else :users="users"/>
</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { useUserStore } from "~/stores/user";
  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "User"}
  ])

  const userStore = useUserStore()
  const users = computed(() => userStore.users);
  const loading = ref(true); // Utilisation de ref pour rendre "loading" réactif

  onMounted(async() => {
    useSonner.promise(userStore.dispatchGetAll().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>