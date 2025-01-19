<template>
  <AdminSpecieHeader>
    <AdminSpecieFormDialog v-model:open="showAddForm" title="Add a specie" desc="Fill the information about the specie">
      <template #trigger>
        <AdminSpecieHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <AdminSpecieFormAdd @close="showAddForm = false" />
      </template>
    </AdminSpecieFormDialog>
  </AdminSpecieHeader>

  <AdminSpecieSkeletonSection v-if="loading"/>
  <AdminSpecieSection v-else :species="species"/>
</template>

<script setup lang="ts">
  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { ref } from "vue";
  import { useSpecieStore } from "~/stores/specie";
  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Specie"}
  ])

  const specieStore = useSpecieStore()
  const species = computed(() => specieStore.speciesAdmin);
  const showAddForm = ref(false)
  const loading = ref(true);


  onMounted(async() => {
    useSonner.promise(specieStore.dispatchGetAllAdmin().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>
