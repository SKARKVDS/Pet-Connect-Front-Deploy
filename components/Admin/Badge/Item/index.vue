<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Badge } from "~/services/badge/types";

  const showEditForm = ref(false)
  const showImageForm = ref(false)

  defineProps<{badge: Badge }>()
</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <AdminBadgeFormDialog v-model:open="showImageForm" title="Edit the badge image" desc="Edit the image about the badge">
      <template #trigger>
        <AdminBadgeItemActionImage/>
      </template>
      <template #content>
        <AdminBadgeFormImage :badge="badge" @close="showImageForm = false" />
      </template>
    </AdminBadgeFormDialog>

    <AdminBadgeFormDialog v-model:open="showEditForm" title="Edit the badge" desc="Edit the information about the badge">
      <template #trigger>
        <AdminBadgeItemActionEdit/>
      </template>
      <template #content>
        <AdminBadgeFormEdit :badge="badge" @close="showEditForm = false" />
      </template>
    </AdminBadgeFormDialog>

    <AdminBadgeFormAlertDialog title="Delete the badge" desc="Are you sure you want to delete the badge this can be dangerous?">
      <template #trigger>
        <AdminBadgeItemActionDelete/>
      </template>
      <template #content>
        <AdminBadgeFormDelete :id="badge.id"/>
      </template>
    </AdminBadgeFormAlertDialog>
  </UiTableCell>
</template>

<style scoped>

</style>