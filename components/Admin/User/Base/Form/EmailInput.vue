<script setup lang="ts">

  defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="Email" placeholder="Enter the emlail" name="email" required />
</template>

<style scoped>

</style>