<script setup lang="ts">

  defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="First name" placeholder="Enter the first name" name="firstName" required />
</template>

<style scoped>

</style>