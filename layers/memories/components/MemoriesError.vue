<script setup lang="ts">

import {injectMemoriesContext} from "~/layers/memories/pages/memories/[id].vue"

const pageContext = injectMemoriesContext()

</script>

<template>
  <div class="flex items-center justify-center h-[500px] w-full mt-4 ">
    <div class="max-w-[400px]">
      <UiAlert variant="destructive">
        <template #icon>
          <UiFancyIcon size="md" circle>
            <Icon name="lucide:circle-alert" class="size-4"/>
          </UiFancyIcon>
        </template>
        <UiAlertDescription class="mb-1 flex items-center justify-between font-medium">
          Oops...
          <UiButton variant="ghost" size="icon-xs" class="size-5" @click="pageContext.error.value = false">
            <Icon name="lucide:x" class="size-3.5"/>
          </UiButton>
        </UiAlertDescription>
        <p class="mb-3 text-sm text-muted-foreground">
          Something went wrong unexpectedly! Please try again later, and we apologize for the inconvenience.
        </p>
        <div class="flex items-center gap-2">
          <UiButton @click="pageContext.fetchMemories" variant="destructive" class="text-xs" size="xs">Try again
          </UiButton>
        </div>
      </UiAlert>
    </div>
  </div>
</template>