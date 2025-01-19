<script setup lang="ts">

import {useTypeStore} from "~/stores/type";

const emits = defineEmits(['close'])

const typeStore = useTypeStore()

const onSubmit = async (values: any) => {
  const result = await typeStore.dispatchAdd(values)
  if (result.success) {
    useSonner.success("The type has been added!")
    emits('close')
  } else {
    useSonner.error("Unable to add the type... please try again later.")
  }
}


</script>

<template>
  <AdminTypeBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>