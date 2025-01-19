<script setup lang="ts">

import {useProposalStore} from "~/layers/proposals/stores/proposal";

const props = defineProps<{id: number}>();

const open = ref<boolean>();

const proposalStore = useProposalStore()
const onDeleteSubmit = () => {
  useSonner.promise(proposalStore.dispatchDisable(props.id), {
    loading: "Deleting your proposal",
    success: () => { open.value = false; return "Your proposal has been deleted!" },
    error: "An unexpected error occured",
  })
}

</script>

<template>
  <UiAlertDialog v-model:open="open">
    <UiAlertDialogTrigger as-child>
      <UiButton variant="destructive" size="icon">
        <Icon class="size-4" name="lucide:trash"/>
      </UiButton>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <div class="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
        <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
        >
          <Icon name="lucide:circle-alert" class="size-4 opacity-80"/>
        </div>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle>Delete proposal</UiAlertDialogTitle>
          <UiAlertDialogDescription>
            Are you sure you want to delete that proposal?
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
      </div>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
        <UiAlertDialogAction @click="onDeleteSubmit">Confirm</UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>