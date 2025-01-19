<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Vaccination } from "~/services/vaccination/types";

  const showEditForm = ref(false)
  const showDeleteForm = ref(false)
  defineProps<{vaccination: Vaccination}>()

</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <VaccineFormDialog v-model:open="showEditForm" title="Edit the vaccination" desc="Edit the information about the vaccination">
      <template #trigger>
        <VaccineItemActionEdit/>
      </template>
      <template #content>
        <VaccineFormEdit :vaccination="vaccination" @close="showEditForm = false" />
      </template>
    </VaccineFormDialog>

    <VaccineFormAlertDialog v-model:open="showDeleteForm" title="Delete the vaccination" desc="Are you sure you want to delete the vaccination?">
      <template #trigger>
        <VaccineItemActionDelete/>
      </template>
      <template #content>
        <VaccineFormDelete :id="vaccination.id" @close="showDeleteForm = false" />
      </template>
    </VaccineFormAlertDialog>
  </UiTableCell>
</template>

<style scoped>

</style>