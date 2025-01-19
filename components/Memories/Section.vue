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

  const props = defineProps<{memories: ReservationDashboard[], color: string}>()

  const calendarEvents = props.memories.map(memory => ({
    title: `${memory.typeName}`,
    date: dayjs(Number(memory.startTime)).format("YYYY-MM-DD"),
    color: props.color, // Une couleur différente pour les requests
    url: `/memories/${memory.id}`,
  }));

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