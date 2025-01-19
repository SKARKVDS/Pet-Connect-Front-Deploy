<script setup lang="ts">

import {useRaceStore} from "~/stores/race";

defineProps<{initialValue?: string}>()

const specie = useFieldValue("specie")
const race = useField("race")

const raceStore = useRaceStore()

watch(specie, async () => {
  if (specie.value) {
    if (!(await raceStore.dispatchGetAllBySpecie(<number>specie.value)).success) {
      console.log('error')
    }
  } else {
    race.resetField()
  }
})

onMounted(async () => {
  if (specie.value) {
    if (!(await raceStore.dispatchGetAllBySpecie(<number>specie.value)).success) {
      console.log('error')
    }
  }
})


</script>

<template>
  <UiVeeMultiSelect :model-value="raceStore.races.find(race => race.name === initialValue)?.id" value-prop="id" label="name" :disabled="!specie" formLabel="Race" name="raceId" :options="raceStore.races" required/>
</template>

<style scoped>

</style>