<script setup lang="ts">
  import { defineProps } from "vue";
  import type { Account } from "~/services/user/types";

  defineProps<{account: Account}>()
</script>

<template>
  <div class="w-full grid grid-cols-2">
    <div>
      <AccountBaseEditableUserNameInput :userName="account.userName" />
    </div>
    <div>
      <AccountBaseEditableEmailInput :email="account.email" />
    </div>
    <div>
      <AccountBaseEditableFirstNameInput :firstName="account.firstName" />
    </div>
    <div>
      <AccountBaseEditableLastNameInput :lastName="account.lastName" />
    </div>
    <div>
      <AccountBaseEditablePhoneNumberInput :phoneNumber="account.phoneNumber" />
    </div>
    <div>
      <AccountBaseEditablePasswordInput :password="account.password" />
    </div>
  </div>

</template>

<style scoped>

</style>