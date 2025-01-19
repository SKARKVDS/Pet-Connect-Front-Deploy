<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Race } from "~/services/race/types";

  const showEditForm = ref(false)
  defineProps<{race: Race}>()
</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">

    <AdminRaceFormDialog v-model:open="showEditForm" title="Edit the race" desc="Edit the information about the race">
      <template #trigger>
        <AdminRaceItemActionEdit/>
      </template>
      <template #content>
        <AdminRaceFormEdit :race="race" @close="showEditForm = false" />
      </template>
    </AdminRaceFormDialog>
    <AdminRaceFormAlertDialog title="Delete the race" desc="Are you sure you want to delete the race this can be dangerous?">
      <template #trigger>
        <AdminRaceItemActionDelete/>
      </template>
      <template #content>
        <AdminRaceFormDelete :id="race.id"/>
      </template>
    </AdminRaceFormAlertDialog>
  </UiTableCell>
</template>

<style scoped>

</style>