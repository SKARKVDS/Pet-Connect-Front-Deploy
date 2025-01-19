<template>
  <AdminRaceHeader>
    <AdminRaceFormDialog v-model:open="showAddForm" title="Add a race" desc="Fill the information about the race">
      <template #trigger>
        <AdminRaceHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <AdminRaceFormAdd :specieId="Number(route.params.id)" @close="showAddForm = false" />
      </template>
    </AdminRaceFormDialog>
  </AdminRaceHeader>

  <AdminRaceSkeletonSection v-if="loading"/>
  <AdminRaceSection v-else :races="races" />

</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { ref } from "vue";
  import { useRaceStore } from "~/stores/race";
  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Specie", link: "/admin/specie"},
    {label: "Race"},
  ])

  const raceStore = useRaceStore()
  const route = useRoute()
  const races = computed(() => raceStore.races);
  const showAddForm = ref(false)
  const loading = ref(true);

  onMounted(async() => {
    useSonner.promise(raceStore.dispatchGetAllBySpecie(Number(route.params.id)).finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>