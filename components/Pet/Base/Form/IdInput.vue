<script setup lang="ts">

defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeInput :model-value="initialValue" label-hint="(optional)" label="Identification" placeholder="Enter your pet identification code" name="identification" />
</template>

<style scoped>

</style>