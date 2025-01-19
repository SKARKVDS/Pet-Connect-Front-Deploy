<template>
  <AdminPetSkeletonSection v-if="loading"/>
  <AdminPetSection v-else :pets="pets"/>
</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { usePetStore } from "~/stores/pet";
  import { useSpecieStore } from "~/stores/specie";
  import { useSexStore } from "~/stores/sex";
  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "User", link:"/admin/user"},
    {label: "Pet"}
  ])

  const route = useRoute()
  const petStore = usePetStore()
  const pets = computed(() => petStore.petsAdmin);
  const loading = ref(true);

  const specieStore = useSpecieStore()
  const sexStore = useSexStore()

  onMounted(async() => {
    useSonner.promise(petStore.dispatchGetAllByUserIdAdmin(Number(route.params.id)).finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })

    if (!(await specieStore.dispatchGetAll()).success) {
      useSonner.error('Unable to fetch species...');
    }

    if (!(await sexStore.dispatchGetAll()).success) {
      useSonner.error('Unable to fetch pet sexes...');
    }
  })
</script>