<script setup lang="ts">

import {useSpecieStore} from "~/stores/specie";

defineProps<{initialValue?: number[]}>()

const specieStore = useSpecieStore()



</script>

<template>

  <UiVeeListboxInput
    name="species"
    inputLabel="Accepted species"
    selectLabel="Selected species"
    placeholder="Search by name..."
    :items="specieStore.species"
    :model-value="initialValue"
    key-property="id"
    value-property="id"
    label-property="name"
    select-class="h-[200px]"
    required
  />
</template>

<style scoped>

</style>