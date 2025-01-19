<script setup lang="ts">
  import {useRaceStore} from "~/stores/race";

  const emits = defineEmits(['close'])

  const raceStore = useRaceStore()
  const props = defineProps<{specieId :number}>()

  const onSubmit = async (values: any) => {
    values.specieId = props.specieId

    const result = await raceStore.dispatchAdd(values)
    if (result.success) {
      useSonner.success("The race has been added!")
      emits('close')
    } else {
      useSonner.error("Unable to add the race... please try again later.")
    }
  }


</script>

<template>
  <AdminRaceBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>