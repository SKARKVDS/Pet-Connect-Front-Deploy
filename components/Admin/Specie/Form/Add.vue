
<script setup lang="ts">

  import {useSpecieStore} from "~/stores/specie";

  const emits = defineEmits(['close'])

  const specieStore = useSpecieStore()

  const onSubmit = async (values: any) => {
    const result = await specieStore.dispatchAdd(values)
    if (result.success) {
      console.log(specieStore.speciesAdmin)

      useSonner.success("The specie has been added!")
      emits('close')
    } else {
      useSonner.error("Unable to add the specie... please try again later.")
    }
  }


</script>

<template>
  <AdminSpecieBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>