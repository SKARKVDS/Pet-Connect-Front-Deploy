<template>
  <VaccineHeader>
    <VaccineFormDialog v-model:open="showAddForm" title="Add a vaccination" desc="Fill the information about the vaccination">
      <template #trigger>
        <VaccineHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <VaccineFormAdd :petId="Number(route.params.id)" @close="showAddForm = false" />
      </template>
    </VaccineFormDialog>
  </VaccineHeader>


  <VaccineSkeletonSection v-if="loading"/>
  <VaccineSection v-else :vaccinations="vaccinations"/>
</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { useVaccinationStore } from "~/stores/vaccination";
  import { ref } from "vue";
  import { useVaccineStore } from "~/stores/vaccine";
  definePageMeta({
    layout: 'dashboard'
  });

  const route = useRoute()

  useBreadcrumbStore().set([
    {label: "Pet", link:`/pet`},
    {label: "Vaccine"}
  ])

  const vaccinationStore = useVaccinationStore()
  const vaccinations = computed(() => vaccinationStore.vaccinations);
  const loading = ref(true); // Utilisation de ref pour rendre "loading" réactif
  const showAddForm = ref(false)

  const vaccineStore = useVaccineStore()

  onMounted(async() => {
    useSonner.promise(vaccinationStore.dispatchGetAllByPet(Number(route.params.id)).finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })

    if (!(await vaccineStore.dispatchGetAll()).success) {
      useSonner.error('Unable to fetch vaccines...');
    }
  })
</script>