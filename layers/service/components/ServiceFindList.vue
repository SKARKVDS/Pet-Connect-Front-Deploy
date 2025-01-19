<script setup lang="ts">

import {injectServiceFindContext} from "~/layers/service/pages/service/find.vue"

const pageContext = injectServiceFindContext()

</script>

<template>
  <div class="mt-4">
    <UiPlaceholder v-if="!pageContext.selectedDate.value" class="h-[500px]">
      Please select a date to view the services available
    </UiPlaceholder>
    <UiSkeleton v-else-if="pageContext.fetchingServices.value" class="h-[500px]"/>
    <section class="space-y-4" v-else>
      <slot/>
    </section>
  </div>
</template>

<style scoped>

</style>