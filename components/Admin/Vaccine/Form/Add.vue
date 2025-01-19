<script setup lang="ts">

import {useVaccineStore} from "~/stores/vaccine";

const emits = defineEmits(['close'])

const vaccineStore = useVaccineStore()

const onSubmit = async (values: any) => {
  const result = await vaccineStore.dispatchAdd(values)
  if (result.success) {
    useSonner.success("The vaccine has been added!")
    emits('close')
  } else {
    useSonner.error("Unable to add the vaccine... please try again later.")
  }
}


</script>

<template>
  <AdminVaccineBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>