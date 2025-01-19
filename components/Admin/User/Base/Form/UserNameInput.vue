<script setup lang="ts">

defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="User name" placeholder="Enter the user name" name="userName" required />
</template>

<style scoped>

</style>