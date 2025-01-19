<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { RequestReceive } from "~/services/request/types";

  // Définir les props pour recevoir les informations du forum
  const props = defineProps<{request: RequestReceive}>()

  function formatDateFromTimestamp(timestamp:any) {
    // Créer un objet Date à partir du timestamp
    const date = new Date(Number(timestamp));

    // Obtenir le mois (ajouter 1 car les mois sont indexés à partir de 0)
    const month = String(date.getMonth() + 1).padStart(2, '0');

    // Obtenir le jour du mois
    const day = String(date.getDate()).padStart(2, '0');

    // Obtenir l'année
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');

    // Obtenir les minutes
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Retourner la date formatée en MM-DD-YYYY
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

</script>

<template>
  <UiCard>
    <UiCardContent>
      <div class="flex items-center gap-3 rounded-lg border p-2">
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <Icon class="size-4" name="lucide:clock" />
        </div>
        <div class="flex flex-col items-start text-sm">
          <h2>{{ formatDateFromTimestamp(request.startTime) }} - {{ formatDateFromTimestamp(request.endTime) }}</h2>
        </div>
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <Icon class="size-4" name="lucide:user-round" />
        </div>
        <div class="flex flex-col items-start text-sm">
          <h2>{{ request.userName }}</h2>
        </div>
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <Icon name="lucide:shapes" class="h-6 w-6"/>
        </div>
        <div class="flex flex-col items-start text-sm">
          <h2>{{ request.typeName }}</h2>
        </div>

        <div class="flex ml-auto gap-3">
          <RequestReceiveFormAlertDialog title="Accept the request" desc="Are you sure you want to accept the request ? (And continue to display it)">
            <template #trigger>
              <RequestReceiveItemActionAccept/>
            </template>
            <template #content>
              <RequestReceiveFormAccept :id="request.id"/>
            </template>
          </RequestReceiveFormAlertDialog>

          <RequestReceiveFormAlertDialog title="Accept the request" desc="Are you sure you want to accept the request ? (And stop to display it)">
            <template #trigger>
              <RequestReceiveItemActionAcceptNoMore/>
            </template>
            <template #content>
              <RequestReceiveFormAcceptNoMore :id="request.id"/>
            </template>
          </RequestReceiveFormAlertDialog>

          <RequestReceiveFormAlertDialog title="Delete the request" desc="Are you sure you want to delete the request ?">
            <template #trigger>
              <RequestReceiveItemActionDelete/>
            </template>
            <template #content>
              <RequestReceiveFormDelete :id="request.id"/>
            </template>
          </RequestReceiveFormAlertDialog>
        </div>
      </div>


      <div class="flex flex-col gap-5 p-8">
        <div class="items-start text-sm" v-for="pet in request.pets" :key="pet">
          <h1>{{pet}}</h1>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<style scoped>

</style>