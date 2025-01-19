<script setup lang="ts">
  import type { Account } from "~/services/user/types";
  import { defineProps } from "vue";
  import type { ReservationRequest } from "~/services/reservation/types";

  defineProps<{reservationRequest: ReservationRequest}>()

</script>

<template>
  <ReservationRequestItem :reservationRequest="reservationRequest" />
</template>

<style scoped>

</style>