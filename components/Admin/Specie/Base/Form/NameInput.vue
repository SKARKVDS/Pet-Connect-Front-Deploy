<script setup lang="ts">

defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="Name" placeholder="Enter the specie name" name="name" required />
</template>

<style scoped>

</style>