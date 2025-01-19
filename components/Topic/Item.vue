<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Topic } from "~/services/topic/types";

  defineProps<{topic: Topic }>()
</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <NuxtLink :to="`/forum/topic/post/${topic.id}`">
      <UiButton size="icon" class="bg-blue-500 hover:bg-blue-600 text-white">
        <Icon class="size-4" name="lucide:arrow-right" />
      </UiButton>
    </NuxtLink>
  </UiTableCell>
</template>

<style scoped>

</style>