<script setup lang="ts">

import {injectServiceFindContext} from "~/layers/service/pages/service/find.vue"

const pageContext = injectServiceFindContext()


</script>

<template>
  <UiVeeTimePicker
      required
      label="Select a time slot"
      name="times"
      :day-value="pageContext.selectedDate.value"
  />
</template>