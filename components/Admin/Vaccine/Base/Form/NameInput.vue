<script setup lang="ts">

defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="Name" placeholder="Enter your vaccine name" name="name" required />
</template>

<style scoped>

</style>