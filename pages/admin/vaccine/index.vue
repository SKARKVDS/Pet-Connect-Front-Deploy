<template>
  <AdminVaccineHeader>
    <AdminVaccineFormDialog v-model:open="showAddForm" title="Add a vaccine" desc="Fill the information about the vaccine">
      <template #trigger>
        <AdminVaccineHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <AdminVaccineFormAdd @close="showAddForm = false" />
      </template>
    </AdminVaccineFormDialog>
  </AdminVaccineHeader>

  <AdminVaccineSkeletonSection v-if="loading"/>
  <AdminVaccineSection v-else :vaccines="vaccines"/>
</template>

<script setup lang="ts">
  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { ref } from "vue";
  import { useVaccineStore } from "~/stores/vaccine";
  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Vaccine"}
  ])

  const vaccineStore = useVaccineStore()
  const vaccines = computed(() => vaccineStore.vaccines);
  const showAddForm = ref(false)
  const loading = ref(true);

  onMounted(async() => {
    useSonner.promise(vaccineStore.dispatchGetAll().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })


</script>