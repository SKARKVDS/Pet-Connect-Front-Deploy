<script setup lang="ts">
defineProps<{initialValue?: boolean}>()
</script>

<template>
  <UiVeeCheckbox :model-value="initialValue" model-type="checkbox" label="Need Booster" placeholder="Enter your vaccine booster" name="needBooster" />
</template>

<style scoped>

</style>