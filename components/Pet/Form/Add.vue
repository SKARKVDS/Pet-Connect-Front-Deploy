<script setup lang="ts">

  import {usePetStore} from "~/stores/pet";

  const emits = defineEmits(['close'])

  const petStore = usePetStore()

  const onSubmit = async (values: any) => {

    console.log(values)
    const result = await petStore.dispatchAdd(values)
    if (result.success) {
      useSonner.success("Your pet has been added!")
      emits('close')
    } else {
      useSonner.error("Unable to add your pet... please try again later.")
    }
  }


</script>

<template>
  <PetBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>