<script setup lang="ts">

import {injectServiceFindContext} from "~/layers/service/pages/service/find.vue"
import {format} from "date-fns";

const pageContext = injectServiceFindContext()

</script>

<template>
  <UiDatepicker :minDate="pageContext.minDate" @update:modelValue="pageContext.onDateChange" v-model:model-value="pageContext.selectedDate.value" :popover="{placement: 'bottom'}">
    <template #default="{ togglePopover }">
      <UiButton
          variant="outline"
          class="xl:col-start-4 xl:col-span-3"
          :class="[!pageContext.selectedDate.value && 'text-muted-foreground', 'justify-start text-left']"
          @click="togglePopover"
      >
        <Icon name="lucide:calendar" class="h-4 w-4"/>
        {{ pageContext.selectedDate.value ? format(pageContext.selectedDate.value, "MMMM dd, yyyy") : "Select a date" }}
      </UiButton>
    </template>
  </UiDatepicker>
</template>

<style scoped>

</style>