<template>
  <AdminProposalSkeletonSection v-if="loading"/>
  <AdminProposalSection v-else :proposals="proposals"/>
</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";

  import { useProposalStore } from "~/layers/proposals/stores/proposal";
  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "User", link:"/admin/user"},
    {label: "Proposal"}
  ])

  const route = useRoute()
  const proposalStore = useProposalStore()
  const proposals = computed(() => proposalStore.proposalsAdmin);
  const loading = ref(true);


  onMounted(async() => {
    useSonner.promise(proposalStore.dispatchGetAllByUserIdAdmin(Number(route.params.id)).finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>