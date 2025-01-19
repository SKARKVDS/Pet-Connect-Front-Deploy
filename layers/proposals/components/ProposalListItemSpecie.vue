<script setup lang="ts">

const props = defineProps<{items: any[]}>()

</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton>Show accepted species</UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-80 p-0">
      <UiScrollArea class="h-72 rounded-md border">
        <div class="p-4 flex flex-col">
          <h4 class="mb-4 text-xs font-medium leading-none text-muted-foreground">Accepted species</h4>
          <template v-for="(item, i) in items" :key="i">
            <div>
              <div class="text-sm">{{ item }}</div>
              <UiSeparator class="my-2"/>
            </div>
          </template>
        </div>
      </UiScrollArea>
    </UiPopoverContent>
  </UiPopover>
</template>