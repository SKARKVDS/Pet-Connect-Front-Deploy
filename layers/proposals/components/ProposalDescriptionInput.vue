<script setup lang="ts">

import { injectProposalCreateFormContext } from "~/layers/proposals/components/ProposalCreateForm.vue"

const rootContext = injectProposalCreateFormContext()

</script>

<template>
  <UiVeeTextarea
      required
      name="description"
      label="Description"
      placeholder="Type your description here..."
      :maxContent="true"
      :disabled="!rootContext.selectedType.value"
  />
</template>