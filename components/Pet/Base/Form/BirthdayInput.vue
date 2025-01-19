<script setup lang="ts">

import {startOfToday} from "date-fns";

defineProps<{initialValue?: number}>()

const maxDate = ref(startOfToday())

</script>

<template>
  <UiVeeDatepicker :max-date="maxDate" :model-value="initialValue * 1" label="Birthdate" icon="lucide:cake" name="birthDate" required/>
</template>

<style scoped>

</style>