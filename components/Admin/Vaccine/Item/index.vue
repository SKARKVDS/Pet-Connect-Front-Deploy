<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Vaccine } from "~/services/vaccine/types";

  // Définir les props pour recevoir les informations du forum
  const showEditForm = ref(false)
  defineProps<{vaccine: Vaccine }>()
</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <AdminVaccineFormDialog v-model:open="showEditForm" title="Edit the vaccine" desc="Edit the information about the vaccine">
      <template #trigger>
        <AdminVaccineItemActionEdit/>
      </template>
      <template #content>
        <AdminVaccineFormEdit :vaccine="vaccine" @close="showEditForm = false" />
      </template>
    </AdminVaccineFormDialog>

    <AdminVaccineFormAlertDialog title="Delete the vaccine" desc="Are you sure you want to delete the vaccine this can be dangerous?">
      <template #trigger>
        <AdminVaccineItemActionDelete/>
      </template>
      <template #content>
        <AdminVaccineFormDelete :id="vaccine.id"/>
      </template>
    </AdminVaccineFormAlertDialog>
  </UiTableCell>
</template>

<style scoped>

</style>