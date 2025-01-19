<script setup lang="ts">

import {usePetStore} from "~/stores/pet";
import type {Pet} from "~/services/pet/types";

import {injectServiceFindContext} from "~/layers/service/pages/service/find.vue"

const pageContext = injectServiceFindContext()

const loading = ref(true)

const items = ref<Pet[]>([])

const petStore = usePetStore()

onMounted(async () => {
  const result = await petStore.dispatchGetAllByToken().finally(() => loading.value = false)
  if (result.success) {
    items.value = petStore.pets
  }
})

const filteredItems = computed(() => items.value.filter((pet) => pageContext.selectedService.value.species.includes(pet.specie)))

</script>

<template>
  <UiVeeListboxInput
      required
      name="pets"
      label="Selected pet"
      select-class="h-[150px]"
      inputLabel="Selected pets"
      selectLabel="Selected pets"
      placeholder="Search my pet..."
      :items="filteredItems"
      :loading="loading"
      key-property="id"
      value-property="id"
      label-property="nickName"
  />
</template>

<style scoped>

</style>