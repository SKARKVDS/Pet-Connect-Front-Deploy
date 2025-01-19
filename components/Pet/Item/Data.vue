<script setup lang="ts">

defineProps<{
  name?: string;
  specie?: string;
  race?: string;
  birthday?: string;
}>()

</script>

<template>
  <div class="flex justify-between">
    <div>
      <h4 class="text-sm font-semibold">{{ name }}</h4>
      <p class="text-sm">
        - {{ specie }}
      </p>
      <p class="text-sm">
        - {{ race }}
      </p>
      <div class="flex items-center pt-2">
        <Icon name="lucide:cake" class="mr-2 h-4 w-4 opacity-70" />
        <span class="text-xs text-muted-foreground"> {{ birthday }} </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>