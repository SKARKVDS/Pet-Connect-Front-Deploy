<template>
  <AdminForumHeader>
    <AdminForumFormDialog v-model:open="showAddForm" title="Add a forum" desc="Fill the information about the forum">
      <template #trigger>
        <AdminForumHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <AdminForumFormAdd @close="showAddForm = false" />
      </template>
    </AdminForumFormDialog>
  </AdminForumHeader>

  <AdminForumSkeletonSection v-if="loading"/>
  <AdminForumSection v-else :forums="forums"/>


</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { useForumStore } from "~/stores/forum";
  import { ref } from "vue";

  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Forum"}
  ])

  const forumStore = useForumStore()
  const forums = computed(() => forumStore.forums);
  const showAddForm = ref(false)
  const loading = ref(true);

  onMounted(async() => {
    useSonner.promise(forumStore.dispatchGetAll().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>