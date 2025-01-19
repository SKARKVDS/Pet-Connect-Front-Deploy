<template>
 <div v-if="!loading && reservation != undefined">
    <ReservationRequestSection :reservationRequest="reservation" />
  </div>
  <div v-else>
    <ReservationRequestSkeletonSection/>
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
  const reservation = computed(() => reservationStore.reservationRequest);
  const loading = ref(true); // Utilisation de ref pour rendre "loading" réactif


  onMounted(async() => {
    useSonner.promise(reservationStore.dispatchGetRequestById(Number(route.params.id)).finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>