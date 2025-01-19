<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Topic } from "~/services/topic/types";

  defineProps<{topic: Topic , forumId: number }>()
  const showEditForm = ref(false)
</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <AdminTopicFormDialog v-model:open="showEditForm" title="Edit the topic" desc="Edit the information about the topic">
      <template #trigger>
        <AdminTopicItemActionEdit/>
      </template>
      <template #content>
        <AdminTopicFormEdit :topic="topic" :forumId="forumId" @close="showEditForm = false" />
      </template>
    </AdminTopicFormDialog>

    <AdminTopicFormAlertDialog title="Delete the topic" desc="Are you sure you want to delete the topic this can be dangerous?">
      <template #trigger>
        <AdminTopicItemActionDelete/>
      </template>
      <template #content>
        <AdminTopicFormDelete :id="topic.id"/>
      </template>
    </AdminTopicFormAlertDialog>

    <NuxtLink :to="`/admin/forum/topic/post/${topic.id}`">
      <UiButton size="icon" class="bg-blue-500 hover:bg-blue-600 text-white">
        <Icon class="size-4" name="lucide:arrow-right"/>
      </UiButton>
    </NuxtLink>
  </UiTableCell>
</template>

<style scoped>

</style>