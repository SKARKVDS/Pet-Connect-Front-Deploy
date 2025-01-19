<script setup lang="ts">

defineProps<{to: string}>()

</script>

<template>
  <NuxtLink :to="to">
    <UiButton size="icon" class="bg-green-500 hover:bg-green-600 text-white">
      <Icon class="size-4" name="lucide:syringe" />
    </UiButton>
  </NuxtLink>
</template>

<style scoped>

</style>