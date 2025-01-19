<script setup lang="ts">

  defineProps<{initialValue?: number}>()

</script>

<template>
  <UiVeeNumberField :model-value="initialValue" :min="0" label="Minimum service count" placeholder="Enter the minimum service count" name="numberServices" required>
    <UiNumberFieldInput />
    <UiNumberFieldDecrement class="border-l" />
    <UiNumberFieldIncrement class="border-l" />
  </UiVeeNumberField>
</template>

<style scoped>

</style>