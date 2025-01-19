<script setup lang="ts">

  import { useTypeNotificationStore } from "~/stores/typeNotification";

  const typeStore = useTypeNotificationStore()

</script>

<template>
  <UiVeeSelect label="Type" name="typeId" hint="Pick the type you want" required>
    <option disabled value="">Select type</option>
    <option v-for="type in typeStore.typesNotifications" :key="type.id" :value="type.id">
      {{ type.name }}
    </option>
  </UiVeeSelect>
</template>

<style scoped>

</style>