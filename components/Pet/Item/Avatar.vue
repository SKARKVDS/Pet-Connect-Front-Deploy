<script setup lang="ts">

defineProps<{
  imgSrc?: string;
}>()

</script>

<template>
  <img v-if="imgSrc" :src="imgSrc" alt="Pet avatar" class="rounded object-cover aspect-square" />
  <UiSkeleton class="rounded object-cover aspect-square w-full h-full" v-else/>
</template>

<style scoped>

</style>