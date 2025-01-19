<script setup lang="ts">

  import {useUserStore} from "~/stores/user";
  import type {User} from "~/services/user/types";
  import { useVaccinationStore } from "~/stores/vaccination";
  import type { InputVaccinationAdd } from "~/services/vaccination/types";

  const emits = defineEmits(['close'])

  const vaccinationStore = useVaccinationStore()

  const props = defineProps<{petId : number}>()

  const onSubmit = async (values: any) => {
    console.log(values)
    values.petId = props.petId

    const result = await vaccinationStore.dispatchAdd(values)

    if (result.success) {
      useSonner.success("The vaccination has been updated!")
      emits('close')
    } else {
      useSonner.error("Unable to update the vaccination... please try again later.")
    }
  }

</script>

<template>
  <VaccineBaseForm @onSubmit="onSubmit"/>
</template>