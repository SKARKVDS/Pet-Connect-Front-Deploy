<script setup lang="ts">
  import type { Account } from "~/services/user/types";
  import { defineProps } from "vue";
  import type { ReservationRequest } from "~/services/reservation/types";

  defineProps<{reservationRequest: ReservationRequest}>()


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
  <div class=" p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Reservation details</h2>

    <div class="space-y-4">
      <!-- Type de Réservation -->
      <div class="flex items-center">
        <span class="font-medium text-gray-600 w-32">Type:</span>
        <span class="text-gray-800">{{ reservationRequest.typeName }}</span>
      </div>

      <!-- Temps de Réservation -->
      <div class="flex items-center">
        <span class="font-medium text-gray-600 w-32">Start:</span>
        <span class="text-gray-800">{{ formatDateFromTimestamp(reservationRequest.startTime) }}</span>
      </div>
      <div class="flex items-center">
        <span class="font-medium text-gray-600 w-32">End:</span>
        <span class="text-gray-800">{{ formatDateFromTimestamp(reservationRequest.endTime) }}</span>
      </div>

      <!-- Nom de l'utilisateur -->
      <div class="flex items-center">
        <span class="font-medium text-gray-600 w-32">Name:</span>
        <span class="text-gray-800">{{ reservationRequest.userName }}</span>
      </div>

      <div class="flex items-center">
        <span class="font-medium text-gray-600 w-32">Phone number:</span>
        <span class="text-gray-800">{{ reservationRequest.phoneNumber }}</span>
      </div>

      <div class="flex items-center">
        <span class="font-medium text-gray-600 w-32">Email :</span>
        <span class="text-gray-800">{{ reservationRequest.email }}</span>
      </div>

      <!-- Adresse -->
      <div class="flex items-center">
        <span class="font-medium text-gray-600 w-32">Address:</span>
        <span class="text-gray-800">{{ reservationRequest.address }}</span>
      </div>

      <!-- Animaux -->
      <div class="flex items-center">
        <span class="font-medium text-gray-600 w-32">Pets:</span>
        <span class="text-gray-800">
          <ul>
            <li v-for="(pet, index) in reservationRequest.pets" :key="index" class="ml-2 list-disc">
              {{ pet }}
            </li>
          </ul>
        </span>
      </div>

      <ReservationRequestFormAlertDialog v-if="!reservationRequest.isFinish && reservationRequest.canTouch" title="Finish the reservation" desc="Are you sure you want to finish the reservation ?">
        <template #trigger>
          <ReservationRequestItemActionFinish/>
        </template>
        <template #content>
          <ReservationRequestFormFinish :id="reservationRequest.id"/>
        </template>
      </ReservationRequestFormAlertDialog>
      <UiButton v-else disabled> Finish </UiButton>
    </div>
  </div>

</template>

<style scoped>

</style>