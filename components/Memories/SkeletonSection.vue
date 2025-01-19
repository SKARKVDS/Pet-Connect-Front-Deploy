<script setup lang="ts">

  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import FullCalendar from "@fullcalendar/vue3";
  import type { CalendarOptions } from "@fullcalendar/core";

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