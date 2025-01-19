<script setup lang="ts">

  import { startOfToday } from "date-fns";

  defineProps<{initialValue?: number}>()
  const maxDate = ref(startOfToday())

  const model = defineModel()
</script>

<template>
  <UiVeeDatepicker @update:model-value="(value) => {model = value}" :max-date="maxDate" :model-value="Number(initialValue)" label="Vaccination date" icon="lucide:syringe" name="dateVaccination" required/>
</template>

<style scoped>

</style>