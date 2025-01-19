<script setup lang="ts">


import type { Vaccination } from "~/services/vaccination/types";
import { useVaccinationStore } from "~/stores/vaccination";

const emits = defineEmits(['close'])

const props = defineProps<{vaccination :Vaccination}>()

const vaccinationStore = useVaccinationStore()

const onSubmit = async (values: any) => {
  values.id = props.vaccination.id
  const result = await vaccinationStore.dispatchUpdate(values)
  if (result.success) {
    useSonner.success("The vaccination has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update the vaccination... please try again later.")
  }
}

</script>

<template>
  <VaccineBaseFormEdit :vaccination="vaccination" @onSubmit="onSubmit"/>
</template>