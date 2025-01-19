<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';

  // Définir les props pour recevoir les informations du forum
  const props = defineProps({
    post: {
      type: Object,
      required: true,
      validator(value: any) {
        return value.id && value.name ;//todo review
      }
    }
  });

  function formatDateFromTimestamp(timestamp:String) {
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
          <img v-if="post.creatorUrl" :src="post.creatorUrl" alt="Pet avatar" class="rounded object-cover aspect-square h-6 w-6" />
          <Icon v-else class="size-4" name="lucide:user-round" />
        </div>
        <div class="flex flex-col items-start text-sm">
          <h2>{{ props.post.creatorName }}</h2>
        </div>
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <Icon name="lucide:clock-5" class="h-6 w-6"/>
        </div>
        <div class="flex flex-col items-start text-sm">
          <h2>{{ formatDateFromTimestamp(props.post.creationTime) }}</h2>
        </div>
      </div>

      <div class="flex gap-5 p-8">
        <div class="flex flex-col items-start text-sm">
          <h1>{{props.post.body}}</h1>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<style scoped>

</style>