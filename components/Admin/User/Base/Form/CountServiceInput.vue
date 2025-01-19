<script setup lang="ts">

  defineProps<{initialValue?: number}>()

</script>

<template>
  <UiVeeNumberField :model-value="initialValue" :min="0" label="Service count" placeholder="Enter the service count" name="countService" required>
    <UiNumberFieldInput />
    <UiNumberFieldDecrement class="border-l" />
    <UiNumberFieldIncrement class="border-l" />
  </UiVeeNumberField>
</template>

<style scoped>

</style>