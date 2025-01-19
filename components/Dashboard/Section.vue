<script setup lang="ts">

  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import FullCalendar from "@fullcalendar/vue3";
  import dayjs from "dayjs";
  import type { CalendarOptions } from "@fullcalendar/core";
  import { useVaccinationStore } from "~/stores/vaccination";
  import type { VaccinationDashBoard } from "~/services/vaccination/types";
  import { defineProps } from "vue";
  import type { Forum } from "~/services/forum/types";
  import type { ReservationDashboard } from "~/services/reservation/types";

  const props = defineProps<{vaccinations: VaccinationDashBoard[], requests: ReservationDashboard[], proposals: ReservationDashboard[]}>()

  const vaccinationEvents = props.vaccinations.map(vaccination => ({
    title: `${vaccination.vaccineName} - ${vaccination.petName}`,
    date: dayjs(Number(vaccination.dateBooster)).format("YYYY-MM-DD"), // Assurez-vous que c'est bien converti
    color: "purple",
    url: `/pet/vaccine/${vaccination.petId}`, // Lien vers votre app
  }));

  const requestEvents = props.requests.map(request => ({
    title: `${request.typeName} (Request)`,
    date: dayjs(Number(request.startTime)).format("YYYY-MM-DD"),
    color: "orange", // Une couleur différente pour les requests
    url: `/reservation/request/${request.id}`,
  }));

  const proposalEvents = props.proposals.map(proposal => ({
    title: `${proposal.typeName} (Proposal)`,
    date: dayjs(Number(proposal.startTime)).format("YYYY-MM-DD"),
    color: "blue", // Une couleur différente pour les requests
    url: `/reservation/proposal/${proposal.id}`,
  }));

  const calendarEvents = [...vaccinationEvents, ...requestEvents, ...proposalEvents];

  const calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    height: 'auto',
    stickyHeaderDates: true,
    editable: true,
    headerToolbar: {
      left: "prevYear,prev,today,next,nextYear",
      center: "title",
    },
    footerToolbar: {
      left: "prevYear,prev,today,next,nextYear",
      center: "",
    },
    events: calendarEvents,
  };
</script>

<template>
  <FullCalendar :options="calendarOptions"/>
</template>

<style>
  /* Because the doc's navbar is blocking it 🙄 */
  .fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky > * {
    top: 55px;
  }
</style>