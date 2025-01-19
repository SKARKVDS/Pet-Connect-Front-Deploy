<script setup lang="ts">

defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label="Nickname" placeholder="Enter your pet name" name="nickName" required />
</template>

<style scoped>

</style>