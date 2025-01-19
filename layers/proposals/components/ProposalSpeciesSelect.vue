<script setup lang="ts">

import { injectProposalCreateFormContext } from "~/layers/proposals/components/ProposalCreateForm.vue"

const rootContext = injectProposalCreateFormContext()

</script>

<template>
  <UiVeeListboxInput
      required
      name="species"
      select-class="h-[300px]"
      inputLabel="Accepted species"
      selectLabel="Selected species"
      placeholder="Search species..."
      :empty-message="rootContext.selectedType.value === undefined ? 'Please select a proposal type to start selecting your accepted species.' : undefined"
      hint="The system will only process requests for the specific species selected"
      :items="rootContext.selectedType.value?.species"
      key-property="id"
      value-property="id"
      label-property="name"
      :disabled="rootContext.selectedType.value === undefined"
  />
</template>