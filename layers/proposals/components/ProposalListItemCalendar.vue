<template>
  <UiButton :to="`/proposals/${id}/calendar`" size="icon">
    <Icon class="size-4" name="lucide:calendar"/>
  </UiButton>
</template>

<script setup lang="ts">

const props = defineProps<{id: number}>()

</script>