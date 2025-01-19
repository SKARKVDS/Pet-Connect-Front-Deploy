<template>
 <div v-if="!loading && reservation != undefined">
    <ReservationProposalSection :reservationProposal="reservation" />
  </div>
  <div v-else>
    <ReservationProposalSkeletonSection/>
  </div>

</template>

<script setup lang="ts">
  import { useBreadcrumbStore } from "~/stores/breadcrumb";
  import { ref } from "vue";
  import { useTypeNotificationStore } from "~/stores/typeNotification";
  import { useAccountStore } from "~/stores/account";
  import { useReservationStore } from "~/stores/reservation";

  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Dashboard", link: "/dashboard"},
    {label: "Reservation"},
  ])
  const route = useRoute()
  const reservationStore = useReservationStore()
  const reservation = computed(() => reservationStore.reservationProposal);
  const loading = ref(true); // Utilisation de ref pour rendre "loading" réactif


  onMounted(async() => {
    useSonner.promise(reservationStore.dispatchGetProposalById(Number(route.params.id)).finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>