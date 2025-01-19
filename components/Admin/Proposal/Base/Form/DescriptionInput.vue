<script setup lang="ts">

defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="Description" placeholder="Enter the new description" name="description" required />
</template>

<style scoped>

</style>