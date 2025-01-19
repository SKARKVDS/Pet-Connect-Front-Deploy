<template>
  <AdminTypeHeader>
    <AdminTypeFormDialog v-model:open="showAddForm" title="Add a type" desc="Fill the information about the type">
      <template #trigger>
        <AdminTypeHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <AdminTypeFormAdd @close="showAddForm = false" />
      </template>
    </AdminTypeFormDialog>
  </AdminTypeHeader>

  <AdminTypeSkeletonSection v-if="loading"/>
  <AdminTypeSection v-else :types="types"/>
</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { ref } from "vue";
  import { useTypeStore } from "~/stores/type";
  import { useSpecieStore } from "~/stores/specie";
  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Service Type"}
  ])

  const typeStore = useTypeStore()
  const types = computed(() => typeStore.typesAdmin);
  const showAddForm = ref(false)
  const loading = ref(true);
  const specieStore = useSpecieStore()

  onMounted(async() => {
    useSonner.promise(typeStore.dispatchGetAllAdmin().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })

    if (!(await specieStore.dispatchGetAll()).success) {
      useSonner.error('Unable to fetch species...');
    }
  })




</script>