<template>
  <AccountHeader>
    <AccountFormDialog v-model:open="showReportForm" title="Report" desc="Fill the information about the report">
      <template #trigger>
        <AccountHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <AccountFormReport @close="showReportForm = false" />
      </template>
    </AccountFormDialog>
  </AccountHeader>


  <div v-if="account !== null">
    <AccountSection :account="account" />
  </div>
  <div v-else>
    <AccountSkeletonSection/>
  </div>

</template>

<script setup lang="ts">
  import { useBreadcrumbStore } from "~/stores/breadcrumb";
  import { ref } from "vue";
  import { useTypeNotificationStore } from "~/stores/typeNotification";
  import { useAccountStore } from "~/stores/account";

  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Account"}
  ])

  const typeStore = useTypeNotificationStore()
  const userStore = useAccountStore()
  const account = computed(() => userStore.account);
  const loading = ref(true); // Utilisation de ref pour rendre "loading" réactif
  const showReportForm = ref(false)

  onMounted(async() => {
    useSonner.promise(userStore.dispatchGet().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })

    if (!(await typeStore.dispatchGetAll()).success) {
      useSonner.error('Unable to fetch pet notifications types...');
    }
  })
</script>