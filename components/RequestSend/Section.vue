<script setup lang="ts">

  import listPlugin from "@fullcalendar/list";
  import FullCalendar from "@fullcalendar/vue3";
  import dayjs from "dayjs";
  import type { CalendarOptions } from "@fullcalendar/core";
  import { defineProps } from "vue";
  import type { RequestSend } from "~/services/request/types";

  const props = defineProps<{requests: RequestSend[] }>()

  console.log(props.requests[0].pets)

  const calendarEvents = props.requests.map(request => ({
    title: `${request.userName} - ${request.address} - ${request.typeName} - ${request.pets.join(' ,')}`,
    allDay: false,
    date: dayjs(Number(request.startTime)).toDate(),
    begin: dayjs(Number(request.startTime)).toDate(),
    end: dayjs(Number(request.endTime)).toDate(),
    color: request.isAccepted ? "green" : "orange",
  }));


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