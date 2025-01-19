<script setup lang="ts">

import {usePetStore} from "~/stores/pet";
import type {Pet} from "~/services/pet/types";

const emits = defineEmits(['close'])

const props = defineProps<{pet :Pet}>()

const petStore = usePetStore()

const onSubmit = async (values: any) => {
  values.id = props.pet.id

  console.log(values)
  const result = await petStore.dispatchUpdate(values)
  if (result.success) {
    useSonner.success("Your pet has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update your pet... please try again later.")
  }
}

</script>

<template>
  <PetBaseFormEdit :pet="pet" @onSubmit="onSubmit"/>
</template>