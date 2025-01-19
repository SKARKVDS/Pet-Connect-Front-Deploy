<template>
  <PetHeader>
    <PetHeaderFilter v-model="filter"/>
    <PetHeaderSearch v-model="search"/>
    <PetFormDialog v-model:open="showAddForm" title="Add your pet" desc="Fill the information about your pet">
      <template #trigger>
        <PetHeaderFormTrigger/>
      </template>

      <template #content>
        <PetFormAdd @close="showAddForm = false" />
      </template>
    </PetFormDialog>
  </PetHeader>
  <PetSection>
    <template v-for="pet in petStore.pets">
      <PetItem v-if="(!filter || pet.specie === filter) && (!search || pet.nickName.toLowerCase().includes(search.toLowerCase()))" :pet="pet">

      </PetItem>
    </template>
  </PetSection>
</template>

<script lang="ts" setup>

import {useBreadcrumbStore} from "~/stores/breadcrumb";
import {useSpecieStore} from "~/stores/specie";
import {usePetStore} from "~/stores/pet";
import {useSexStore} from "~/stores/sex";

definePageMeta({
  layout: 'dashboard'
});

useBreadcrumbStore().set([
    {label: "Pet", link: "/pet"}
])

const filter = ref()
const search = ref()

const showAddForm = ref(false)

const petStore = usePetStore()
const specieStore = useSpecieStore()
const sexStore = useSexStore()

onMounted(async() => {
  if (!(await petStore.dispatchGetAllByToken()).success) {
    useSonner.error('Unable to fetch user pets...');
  }

  if (!(await specieStore.dispatchGetAll()).success) {
    useSonner.error('Unable to fetch species...');
  }

  if (!(await sexStore.dispatchGetAll()).success) {
    useSonner.error('Unable to fetch pet sexes...');
  }
})

</script>
