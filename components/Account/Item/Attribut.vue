<script setup lang="ts">
  import { defineProps } from "vue";
  import type { Account } from "~/services/user/types";

  defineProps<{account: Account}>()
  const details = ref([
    { key: "Full name", value: "John Doe" },
    { key: "Email", value: "janedoe@testmail.com" },
    { key: "Phone", value: "123-456-7890" },
    { key: "Address", value: "1234 Elm St" },
    { key: "City", value: "Springfield" },
    { key: "State", value: "IL" },
    { key: "Zip", value: "62701" },
  ]);
  const d = ref(
    { key: "Full name", value: "John Doe" }
  );
</script>

<template>
  <AccountBaseEditable :account="account"/>
</template>

<style scoped>

</style>