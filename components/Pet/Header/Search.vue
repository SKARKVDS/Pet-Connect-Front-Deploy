<script setup lang="ts">

const model = defineModel()

</script>

<template>
  <div class="flex-grow relative">
    <UiInput v-model="model" class="pl-10" placeholder="Search..."/>
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon class="size-4" name="lucide:search"/>
    </div>
  </div>

</template>

<style scoped>

</style>