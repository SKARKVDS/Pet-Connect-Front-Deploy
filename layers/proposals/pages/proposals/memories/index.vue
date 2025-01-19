<script setup lang="ts">

  import ComboBox from "~/components/Ui/ComboBox.vue";
  import { useBreadcrumbStore } from "~/stores/breadcrumb.js";

  definePageMeta({
    layout: 'dashboard'
  });

  const dialog = ref(true);


  useBreadcrumbStore().set([
    {label: "Proposal", link: "/proposals"},
    {label: "Memory"},
  ])

  import { useReservationStore } from "~/stores/reservation";


  const reservationStore = useReservationStore()


  const memories = computed(() => reservationStore.reservationsMemoryProposalDashboard);
  const loading = ref(true);

  onMounted(async() => {
    useSonner.promise(reservationStore.dispatchGetAllMemoryProposalByToken().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>

<template>
  <div v-if="memories.length > 0">
    <MemoriesSection :memories="memories" color="blue"/>
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