<script setup lang="ts">

import {useSexStore} from "~/stores/sex";

defineProps<{initialValue: string}>()

const sexStore = useSexStore()

</script>

<template>
  <UiVeeMultiSelect :model-value="sexStore.sexes.find(sex => sex.name === initialValue)?.id" value-prop="id" label="name" :options="sexStore.sexes" form-label="Sex" name="sexId" required />
</template>

<style scoped>

</style>