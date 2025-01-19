<script setup lang="ts">

import {useVaccineStore} from "~/stores/vaccine";
import type {Vaccine} from "~/services/vaccine/types";

const emits = defineEmits(['close'])

const props = defineProps<{vaccine :Vaccine}>()

const vaccineStore = useVaccineStore()

const onSubmit = async (values: any) => {
  values.id = props.vaccine.id
  const result = await vaccineStore.dispatchUpdate(values)
  if (result.success) {
    useSonner.success("The vaccine has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update the vaccine... please try again later.")
  }
}

</script>

<template>
  <AdminVaccineBaseForm :vaccine="vaccine" @onSubmit="onSubmit"/>
</template>