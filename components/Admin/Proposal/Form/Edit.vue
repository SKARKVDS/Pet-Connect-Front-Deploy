<script setup lang="ts">

import {useUserStore} from "~/stores/user";
import type {User} from "~/services/user/types";
import type { Pet } from "~/services/pet/types";
import { usePetStore } from "~/stores/pet";
import { useProposalStore } from "~/layers/proposals/stores/proposal";
import type { ProposalAdmin } from "~/services/proposal/types";

const emits = defineEmits(['close'])

const props = defineProps<{proposal :ProposalAdmin}>()

const proposalStore = useProposalStore()

const onSubmit = async (values: any) => {
  values.id = props.proposal.id
  const result = await proposalStore.dispatchUpdateAdmin(values)
  if (result.success) {
    useSonner.success("The proposal has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update the proposal... please try again later.")
  }
}

</script>

<template>
  <AdminProposalBaseForm :proposal="proposal" @onSubmit="onSubmit"/>
</template>