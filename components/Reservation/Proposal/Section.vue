<script setup lang="ts">
  import type { Account } from "~/services/user/types";
  import { defineProps } from "vue";
  import type { ReservationRequest, ReservationProposal } from "~/services/reservation/types";

  defineProps<{reservationProposal: ReservationProposal}>()

</script>

<template>
  <ReservationProposalItem :reservationProposal="reservationProposal" />
</template>

<style scoped>

</style>