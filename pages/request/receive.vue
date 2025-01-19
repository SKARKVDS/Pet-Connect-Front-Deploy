<script setup lang="ts">

  import ComboBox from "~/components/Ui/ComboBox.vue";
  import { useBreadcrumbStore } from "~/stores/breadcrumb.js";

  definePageMeta({
    layout: 'dashboard'
  });


  useBreadcrumbStore().set([
    {label: "Request Receive"}
  ])

  import { useRequestStore } from "~/stores/request";

  const requestStore = useRequestStore()

  const requests = computed(() => requestStore.requestsReceive);
  const loading = ref(true);

  onMounted(async() => {
    useSonner.promise(requestStore.dispatchGetAllReceiveByToken().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>

<template>

  <RequestReceiveSection v-if="loading">
    <RequestReceiveSkeletonItem/>
  </RequestReceiveSection>
  <RequestReceiveSection v-else>
    <Div v-for="request in requests" :key="request.id" class="request-item">
      <RequestReceiveItem :request="request" />
    </Div>
  </RequestReceiveSection>

</template>

<style>
  /* Because the doc's navbar is blocking it 🙄 */
  .fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky > * {
    top: 55px;
  }
</style>