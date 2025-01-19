<script setup lang="ts">

  defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="Phone number" placeholder="Enter the phone number" name="phoneNumber" required />
</template>

<style scoped>

</style>