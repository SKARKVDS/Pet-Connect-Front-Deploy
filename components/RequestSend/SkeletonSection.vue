<script setup lang="ts">

  import listPlugin from "@fullcalendar/list";
  import FullCalendar from "@fullcalendar/vue3";
  import dayjs from "dayjs";
  import type { CalendarOptions } from "@fullcalendar/core";
  import { useVaccinationStore } from "~/stores/vaccination";
  import type { VaccinationDashBoard } from "~/services/vaccination/types";
  import { defineProps } from "vue";
  import type { Forum } from "~/services/forum/types";

  const calendarOptions: CalendarOptions = {
    plugins: [listPlugin],
    initialView: "listMonth",
    height: 'auto',
    headerToolbar: {
      left: "prevYear,prev,today,next,nextYear",
      center: "title",
      right: "listDay,listWeek,listMonth",
    },
    footerToolbar: {
      left: "prevYear,prev,today,next,nextYear",
      center: "",
      right: "listWeek,listDay,listMonth",
    },
    buttonText: { listWeek: "List Week", listDay: "List Day", listMonth: "List Month" },
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