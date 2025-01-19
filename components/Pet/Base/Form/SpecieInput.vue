<script setup lang="ts">

import {useSpecieStore} from "~/stores/specie";

defineProps<{initialValue?: string}>()

const specieStore = useSpecieStore()

</script>

<template>
  <UiVeeMultiSelect :model-value="specieStore.species.find(specie => specie.name === initialValue)?.id" value-prop="id" label="name" :options="specieStore.species" form-label="Specie" name="specie" required />
</template>

<style scoped>

</style>