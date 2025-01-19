<script setup lang="ts">

import {useBreadcrumbStore} from "~/stores/breadcrumb";
import {useProposalStore} from "~/layers/proposals/stores/proposal";
import type {InputProposalAdd} from "~/services/proposal/types";

definePageMeta({
  layout: 'dashboard'
})

useBreadcrumbStore().set([
  {label: "Proposals", link: "/proposals"},
  {label: "Create", link: "/proposals/create"}
])

const proposalStore = useProposalStore()

const navigateTo = (location: string) => {
  const router = useRouter()
  router.push(location)
}

const onSubmit = async (values: InputProposalAdd) => {
  useSonner.promise(proposalStore.dispatchAdd(values), {
    loading: "Creating your proposal",
    success: () => { navigateTo('/proposals'); return "Proposal created!" },
    error: "An unexpected error occured",
  })
}

</script>

<template>
  <ProposalCreateForm @submit="onSubmit"/>
</template>
