<script setup lang="ts">

import {useSpecieStore} from "~/stores/specie";
import type { SpecieAdmin } from "~/services/specie/types";
const emits = defineEmits(['close'])

const props = defineProps<{specie :SpecieAdmin}>()

const specieStore = useSpecieStore()

const onSubmit = async (values: any) => {
  values.id = props.specie.id
  const result = await specieStore.dispatchUpdate(values)
  if (result.success) {
    useSonner.success("Your specie has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update your specie... please try again later.")
  }
}

</script>

<template>
  <AdminSpecieBaseForm :specie="specie" @onSubmit="onSubmit"/>
</template>