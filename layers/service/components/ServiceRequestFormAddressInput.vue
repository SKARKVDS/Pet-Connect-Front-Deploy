<script setup lang="ts">

import {injectServiceFindContext} from "~/layers/service/pages/service/find.vue"

const pageContext = injectServiceFindContext()

</script>

<template>
  <UiVeeAddressInput
      required
      label="Address"
      name="address"
      placeholder="Enter the address of the proposal"
      :disabled="pageContext.selectedService.value?.address !== '------'"
  />
</template>