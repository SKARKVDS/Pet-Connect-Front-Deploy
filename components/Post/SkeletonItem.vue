<script setup lang="ts">

</script>

<template>

  <UiCard>
    <UiCardContent>
      <div class="flex items-center gap-3 rounded-lg border p-2">
        <!-- Skeleton pour l'icône de l'utilisateur -->
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <UiSkeleton class="h-6 w-6" />
        </div>
        <!-- Skeleton pour le nom de l'utilisateur -->
        <div class="flex flex-col items-start text-sm">
          <UiSkeleton class="h-4 w-24" />
        </div>
        <!-- Skeleton pour l'icône de l'horloge -->
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <UiSkeleton class="h-6 w-6" />
        </div>
        <!-- Skeleton pour la date -->
        <div class="flex flex-col items-start text-sm">
          <UiSkeleton class="h-4 w-16" />
        </div>
      </div>

      <div class="flex gap-5 p-8">
        <!-- Skeleton pour le corps du post -->
        <div class="flex flex-col items-start text-sm">
          <UiSkeleton class="h-4 w-72" />
          <UiSkeleton class="h-4 w-64" />
          <UiSkeleton class="h-4 w-80" />
        </div>
      </div>
    </UiCardContent>
  </UiCard>

</template>

<style scoped>

</style>