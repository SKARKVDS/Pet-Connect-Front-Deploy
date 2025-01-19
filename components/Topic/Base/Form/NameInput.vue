<script setup lang="ts">

defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="name" placeholder="Enter your topic name" name="name" required />
</template>

<style scoped>

</style>