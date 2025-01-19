<script setup>

import {useBreadcrumbStore} from "~/stores/breadcrumb.js";
import {useProposalStore} from "~/layers/proposals/stores/proposal/index.ts";

definePageMeta({
  layout: 'dashboard'
})

useBreadcrumbStore().set([
  {label: "Proposals", link: "/proposals"}
])

const proposalStore = useProposalStore()

onMounted(async () => {
  const result = await proposalStore.dispatchGetAllByToken()
  if (result.success) {

  }
})

</script>

<template>
  <ProposalList>
    <ProposalListItem v-for="proposal in proposalStore.proposals" v-bind="proposal"/>
  </ProposalList>
</template>