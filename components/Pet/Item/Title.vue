<script setup lang="ts">

const props = defineProps<{
  name?: string;
  age?: number;
}>()

</script>

<template>
  <div class="flex-col gap-2">
    <UiButton variant="link" class="p-0 h-auto text-lg"> {{ name }} </UiButton>
    <p class="text-muted-foreground text-sm">{{ age }}yo</p>
  </div>
</template>

<style scoped>

</style>