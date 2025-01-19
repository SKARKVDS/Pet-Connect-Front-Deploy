<script setup lang="ts">
defineProps<{initialValue?: boolean}>()
</script>

<template>
  <UiVeeCheckbox :model-value="initialValue" model-type="checkbox" label="Address in Proposal" placeholder="Enter your vaccine booster" name="addressProposal" />
</template>

<style scoped>

</style>