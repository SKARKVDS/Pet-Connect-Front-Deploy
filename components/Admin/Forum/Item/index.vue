<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Forum } from "~/services/forum/types";

  const showEditForm = ref(false)
  defineProps<{forum: Forum }>()
</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <AdminForumFormDialog v-model:open="showEditForm" title="Edit the forum" desc="Edit the information about the forum">
      <template #trigger>
        <AdminForumItemActionEdit/>
      </template>
      <template #content>
        <AdminForumFormEdit :forum="forum" @close="showEditForm = false" />
      </template>
    </AdminForumFormDialog>

    <AdminForumFormAlertDialog title="Delete the forum" desc="Are you sure you want to delete the forum this can be dangerous?">
      <template #trigger>
        <AdminForumItemActionDelete/>
      </template>
      <template #content>
        <AdminForumFormDelete :id="forum.id"/>
      </template>
    </AdminForumFormAlertDialog>

    <NuxtLink :to="`/admin/forum/topic/${forum.id}`">
      <UiButton size="icon" class="bg-blue-500 hover:bg-blue-600 text-white">
        <Icon class="size-4" name="lucide:arrow-right"/>
      </UiButton>
    </NuxtLink>
  </UiTableCell>
</template>

<style scoped>

</style>