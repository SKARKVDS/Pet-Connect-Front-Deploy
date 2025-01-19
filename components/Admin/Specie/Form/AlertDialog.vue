<script setup lang="ts">

defineProps<{title: string, desc: string}>()

</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <slot name="trigger"/>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <div class="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
        <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
        >
          <Icon name="lucide:circle-alert" class="size-4 opacity-80" />
        </div>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle>{{ title }}</UiAlertDialogTitle>
          <UiAlertDialogDescription>
            {{ desc }}
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
      </div>
      <UiAlertDialogFooter>
        <slot name="content"/>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>

<style scoped>

</style>