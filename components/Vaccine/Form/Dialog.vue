<script setup lang="ts">

defineProps<{title: string, desc: string}>()

const open = defineModel('open')

</script>

<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <slot name="trigger" />
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[600px] min-h-[600px] gap-4">
        <div class="flex flex-col items-center gap-4">
          <UiDialogHeader class="mb-6">
            <UiDialogTitle class="sm:text-center">{{ title }}</UiDialogTitle>
            <UiDialogDescription class="sm:text-center">
              {{ desc }}
            </UiDialogDescription>
          </UiDialogHeader>
        </div>
        <slot name="content"/>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<style scoped>

</style>