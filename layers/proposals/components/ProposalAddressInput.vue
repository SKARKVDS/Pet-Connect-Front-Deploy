<script setup lang="ts">

import { injectProposalCreateFormContext } from "~/layers/proposals/components/ProposalCreateForm.vue"

const rootContext = injectProposalCreateFormContext()

const typeNotSelected = computed(() => !rootContext.selectedType.value)
const typeWithoutAddress = computed(() => rootContext.selectedType.value && !rootContext.selectedType.value.addressProposal)

</script>

<template>
  <UiVeeAddressInput
      required
      label="Address"
      name="address"
      :label-hint="typeWithoutAddress ? 'The address is set by the applicant': undefined"
      placeholder="Enter the address of the proposal"
      :disabled="typeNotSelected || typeWithoutAddress"
  />
</template>
