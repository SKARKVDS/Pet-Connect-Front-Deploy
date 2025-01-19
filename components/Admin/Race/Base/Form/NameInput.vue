<script setup lang="ts">

defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="Name" placeholder="Enter the race name" name="name" required />
</template>

<style scoped>

</style>