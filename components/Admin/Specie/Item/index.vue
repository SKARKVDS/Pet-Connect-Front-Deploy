<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { SpecieAdmin } from "~/services/specie/types";

  const showEditForm = ref(false)
  defineProps<{specie: SpecieAdmin }>()
</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <AdminSpecieFormDialog v-model:open="showEditForm" title="Edit the specie" desc="Edit the information about the specie">
      <template #trigger>
        <AdminSpecieItemActionEdit/>
      </template>
      <template #content>
        <AdminSpecieFormEdit :specie="specie" @close="showEditForm = false" />
      </template>
    </AdminSpecieFormDialog>

    <AdminSpecieFormAlertDialog title="Delete the specie" desc="Are you sure you want to delete the specie this can be dangerous?">
      <template #trigger>
        <AdminSpecieItemActionDelete/>
      </template>
      <template #content>
        <AdminSpecieFormDelete :id="specie.id"/>
      </template>
    </AdminSpecieFormAlertDialog>

    <NuxtLink :to="`/admin/specie/race/${specie.id}`">
      <UiButton size="icon" class="bg-blue-500 hover:bg-blue-600 text-white">
        <Icon class="size-4" name="lucide:arrow-right"/>
      </UiButton>
    </NuxtLink>
  </UiTableCell>
</template>

<style scoped>

</style>