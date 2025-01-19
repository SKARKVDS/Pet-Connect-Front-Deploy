<script setup lang="ts">

  import ComboBox from "~/components/Ui/ComboBox.vue";
  import { useBreadcrumbStore } from "~/stores/breadcrumb.js";

  definePageMeta({
    layout: 'dashboard'
  });


  useBreadcrumbStore().set([
    {label: "Request Send"}
  ])

  import { useRequestStore } from "~/stores/request";

  const requestStore = useRequestStore()


  const requests = computed(() => requestStore.requestsSend);
  const loading = ref(true);

  onMounted(async() => {
    useSonner.promise(requestStore.dispatchGetAllSendByToken().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })
</script>

<template>
  <div v-if="!loading">
    <RequestSendSection :requests="requests"/>
  </div>
  <div v-else>
    <RequestSendSkeletonSection/>
  </div>
</template>

<style>
  /* Because the doc's navbar is blocking it 🙄 */
  .fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky > * {
    top: 55px;
  }
</style>