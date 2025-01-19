<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Type, TypeAdmin } from "~/services/type/types";

  // Définir les props pour recevoir les informations du forum
  const showEditForm = ref(false)
  defineProps<{type: TypeAdmin }>()
</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <AdminTypeFormDialog v-model:open="showEditForm" title="Edit the type" desc="Edit the information about the type">
      <template #trigger>
        <AdminTypeItemActionEdit/>
      </template>
      <template #content>
        <AdminTypeFormEdit :type="type" @close="showEditForm = false" />
      </template>
    </AdminTypeFormDialog>

    <AdminTypeFormAlertDialog title="Delete the type" desc="Are you sure you want to delete the type this can be dangerous?">
      <template #trigger>
        <AdminTypeItemActionDelete/>
      </template>
      <template #content>
        <AdminTypeFormDelete :id="type.id"/>
      </template>
    </AdminTypeFormAlertDialog>
  </UiTableCell>
</template>

<style scoped>

</style>