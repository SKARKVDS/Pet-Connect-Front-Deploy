<script setup lang="ts">

import {useAccountStore} from "~/stores/account";

const accountStore = useAccountStore()

const loading = ref(false)

/*onMounted(async () => {
  const result = await accountStore.dispatchGet().finally(() => loading.value = false)

  if (!result.success) {
    useSonner.error("Unable to fetch user data...")
  }
})*/

const logoutDialog = ref(false)

</script>

<template>
  <UiSidebarFooter>
    <UiSidebarMenu>
      <UiSidebarMenuButton
          v-if="loading"
          size="lg"
          class="p-0"
          disabled="disabled"
      >   <UiSkeleton class="w-full h-full"/></UiSidebarMenuButton>
      <SidebarFooterItem v-else>
        <template #trigger>
          <SidebarFooterAccount :avatar="accountStore.account?.url" :username="accountStore.account?.userName" :email="accountStore.account?.email"/>
        </template>
        <template #content>
          <SidebarFooterDropdownMenu>
            <template #label>
              <SidebarFooterAccount :avatar="accountStore.account?.url" :username="accountStore.account?.userName" :email="accountStore.account?.email"/>
            </template>
            <template #item>
              <NuxtLink to="/account">
                <SidebarFooterDropdownMenuItem title="Account" icon="lucide:user"/>
              </NuxtLink>
            </template>
            <template #footer>
              <SidebarFooterLogout v-model:open="logoutDialog"/>
            </template>
          </SidebarFooterDropdownMenu>
        </template>
        <template #dialog>
          <SidebarFooterLogoutDialog v-model:open="logoutDialog"/>
        </template>
      </SidebarFooterItem>
    </UiSidebarMenu>
  </UiSidebarFooter>
</template>

<style scoped>

</style>