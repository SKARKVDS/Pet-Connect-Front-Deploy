<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { PetAdmin } from "~/services/pet/types";
  import type { ProposalAdmin } from "~/services/proposal/types";

  const showEditForm = ref(false)
  const showDisableForm = ref(false)
  const showDeleteForm = ref(false)
  const props = defineProps<{proposal: ProposalAdmin }>()

</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <AdminProposalFormDialog v-model:open="showEditForm" title="Edit the proposal" desc="Edit the information about the proposal">
      <template #trigger>
        <AdminProposalItemActionEdit/>
      </template>
      <template #content>
        <AdminProposalFormEdit :proposal="proposal" @close="showEditForm = false" />
      </template>
    </AdminProposalFormDialog>

    <AdminProposalFormAlertDialog v-if="proposal.isDisable" v-model:open="showDisableForm" title="Activate the proposal" desc="Do you want to activate the proposal ?">
      <template #trigger>
        <AdminProposalItemActionActive/>
      </template>
      <template #content>
        <AdminProposalFormActive :id="proposal.id" @close="showDisableForm = false" />
      </template>
    </AdminProposalFormAlertDialog>
    <AdminProposalFormAlertDialog v-else v-model:open="showDisableForm" title="Disable the proposal" desc="Do you want to disable the proposal ?">
      <template #trigger>
        <AdminProposalItemActionDisable/>
      </template>
      <template #content>
        <AdminProposalFormDisable :id="proposal.id" @close="showDisableForm = false" />
      </template>
    </AdminProposalFormAlertDialog>

    <AdminProposalFormAlertDialog v-model:open="showDeleteForm" title="Delete the proposal" desc="Are you sure you want to delete the proposal this can be dangerous?">
      <template #trigger>
        <AdminProposalItemActionDelete/>
      </template>
      <template #content>
        <AdminProposalFormDelete :id="proposal.id" @close="showDeleteForm = false" />
      </template>
    </AdminProposalFormAlertDialog>
  </UiTableCell>
</template>

<style scoped>

</style>