<script setup lang="ts">
import { useBreadcrumbStore } from "~/stores/breadcrumb.js";

definePageMeta({
  layout: 'dashboard'
});

const dialog = ref(true);


useBreadcrumbStore().set([
  {label: "Dashboard"}
])

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/vue3";
import dayjs from "dayjs";
import type { CalendarOptions } from "@fullcalendar/core";
import { useVaccinationStore } from "~/stores/vaccination";
import { useReservationStore } from "~/stores/reservation";

const vaccinationStore = useVaccinationStore()
const reservationStore = useReservationStore()


const vaccinations = computed(() => vaccinationStore.vaccinationsDashboard);
const reservationsRequest = computed(() => reservationStore.reservationsRequestDashboard);
const reservationsProposal = computed(() => reservationStore.reservationsProposalDashboard);

const loadingVaccination = ref(true);
const loadingReservationRequest = ref(true);
const loadingReservationProposal = ref(true);

onMounted(async() => {
  useSonner.promise(vaccinationStore.dispatchGetAllFutureByToken().finally(() => loadingVaccination.value = false), {
    error: () => "Error! It seems the server has a problem to load vaccinations...",
  })

  useSonner.promise(reservationStore.dispatchGetAllRequestByToken().finally(() => loadingReservationRequest.value = false), {
    error: () => "Error! It seems the server has a problem to load reservations requested...",
  })

  useSonner.promise(reservationStore.dispatchGetAllProposalByToken().finally(() => loadingReservationProposal.value = false), {
    error: () => "Error! It seems the server has a problem to load reservations sent...",
  })
})
</script>

<template>
    <div v-if="!loadingVaccination && !loadingReservationRequest && !loadingReservationProposal">
      <DashboardSection :vaccinations="vaccinations" :requests="reservationsRequest" :proposals="reservationsProposal" />
    </div>
    <div v-else>
      <DashboardSkeletonSection/>
    </div>
</template>

<style>
  /* Because the doc's navbar is blocking it 🙄 */
  .fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky > * {
    top: 55px;
  }
</style>