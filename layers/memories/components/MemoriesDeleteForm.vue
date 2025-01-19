<script setup lang="ts">

import {injectMemoriesContext} from "~/layers/memories/pages/memories/[id].vue"

const pageContext = injectMemoriesContext()

</script>

<template>
  <UiAlertDialog v-model:open="pageContext.isDeleteFormOpen.value">
    <UiAlertDialogContent>
      <div class="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
        <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
        >
          <Icon name="lucide:circle-alert" class="size-4 opacity-80"/>
        </div>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle>Delete memory</UiAlertDialogTitle>
          <UiAlertDialogDescription>
            Are you sure you want to delete this memory?
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
      </div>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
        <UiAlertDialogAction @click="pageContext.onDeleteSubmit">Confirm</UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>