<script setup lang="ts">

  defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="Last name" placeholder="Enter the last name" name="lastName" required />
</template>

<style scoped>

</style>