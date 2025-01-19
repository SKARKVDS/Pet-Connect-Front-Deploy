<script setup lang="ts">

import {useRaceStore} from "~/stores/race";
import type { Race } from "~/services/race/types";
const emits = defineEmits(['close'])

const props = defineProps<{race :Race}>()


const raceStore = useRaceStore()

const onSubmit = async (values: any) => {
  values.id = props.race.id
  values.specieId = props.race.specieId

  const result = await raceStore.dispatchUpdate(values)
  if (result.success) {
    useSonner.success("Your race has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update your race... please try again later.")
  }
}

</script>

<template>
  <AdminRaceBaseForm :race="race" @onSubmit="onSubmit"/>
</template>