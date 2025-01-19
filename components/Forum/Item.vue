<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Forum } from "~/services/forum/types";

  // Définir les props pour recevoir les informations du forum
  defineProps<{forum: Forum }>()
</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <NuxtLink :to="`/forum/topic/${forum.id}`">
      <UiButton size="icon" class="bg-blue-500 hover:bg-blue-600 text-white">
        <Icon class="size-4" name="lucide:arrow-right" />
      </UiButton>
    </NuxtLink>
  </UiTableCell>
</template>

<style scoped>

</style>