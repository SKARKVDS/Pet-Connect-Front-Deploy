<script setup lang="ts">
  import type { Account } from "~/services/user/types";
  import { defineProps } from "vue";

  defineProps<{account: Account}>()
</script>

<template>

  <div class="flex flex-col w-full items-center">
    <div class="flex flex-row w-8/12 items-center justify-between mb-10">
      <AccountItemImage :user="account" />
      <div class="flex h-[200px] w-full items-center">
        <UiDivider orientation="vertical" />
      </div>
      <AccountItemBadge :badgeUrl="account.badgeUrl" />
    </div>
    <UiDivider />
    <div class="flex w-full items-center">
      <AccountItemAttribut :account="account" />
    </div>
  </div>
</template>

<style scoped>

</style>