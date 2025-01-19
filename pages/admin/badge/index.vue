<template>
  <AdminBadgeHeader>
    <AdminBadgeFormDialog v-model:open="showAddForm" title="Add a badge" desc="Fill the information about the badge">
      <template #trigger>
        <AdminBadgeHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <AdminBadgeFormAdd @close="showAddForm = false" />
      </template>
    </AdminBadgeFormDialog>
  </AdminBadgeHeader>

  <AdminBadgeSkeletonSection v-if="loading"/>
  <AdminBadgeSection v-else :badges="badges"/>


</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { ref } from "vue";
  import { useBadgeStore } from "~/stores/badge";

  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Badge"}
  ])

  const badgeStore = useBadgeStore()
  const badges = computed(() => badgeStore.badges);
  const showAddForm = ref(false)
  const loading = ref(true);

  onMounted(async() => {
    useSonner.promise(badgeStore.dispatchGetAll().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>