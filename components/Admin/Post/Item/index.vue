<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Post } from "~/services/post/types";

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


  defineProps<{post: Post, topicId: number}>()
  const showEditForm = ref(false)

</script>
<template>
  <UiCard>
    <UiCardContent>
      <div class="flex items-center gap-3 rounded-lg border p-2">
        <div  class="flex items-center gap-3 rounded-lg border p-3">
          <img v-if="post.creatorUrl" :src="post.creatorUrl" alt="Pet avatar" class="rounded object-cover aspect-square h-6 w-6" />
          <Icon v-else class="size-4" name="lucide:user-round" />
        </div>
        <div class="flex flex-col items-start text-sm">
          <h2>{{ post.creatorName }}</h2>
        </div>
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <Icon name="lucide:clock-5" class="h-6 w-6"/>
        </div>
        <div class="flex flex-col items-start text-sm">
          <h2>{{ formatDateFromTimestamp(post.creationTime) }}</h2>
        </div>

        <div class="flex ml-auto gap-3">
          <AdminPostFormDialog v-model:open="showEditForm" title="Edit the post" desc="Edit the information about the post">
            <template #trigger>
              <AdminPostItemActionEdit/>
            </template>
            <template #content>
              <AdminPostFormEdit :post="post" :topicId="topicId" @close="showEditForm = false" />
            </template>
          </AdminPostFormDialog>

          <AdminPostFormAlertDialog title="Delete the post" desc="Are you sure you want to delete the post this can be dangerous?">
            <template #trigger>
              <AdminPostItemActionDelete/>
            </template>
            <template #content>
              <AdminPostFormDelete :id="post.id"/>
            </template>
          </AdminPostFormAlertDialog>
        </div>
      </div>

      <div class="flex gap-5 p-8">
        <div class="flex flex-col items-start text-sm">
          <h1>{{post.body}}</h1>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<style scoped>

</style>