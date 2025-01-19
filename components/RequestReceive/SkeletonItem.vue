<script setup lang="ts">

</script>

<template>
  <UiCard>
    <UiCardContent>
      <div class="flex items-center gap-3 rounded-lg border p-2">
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <!-- Skeleton pour l'icône de l'utilisateur -->
          <UiSkeleton class="h-6 w-6" />
        </div>
        <div class="flex flex-col items-start text-sm">
          <!-- Skeleton pour le nom de l'utilisateur -->
          <UiSkeleton class="h-4 w-24" />
        </div>
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <!-- Skeleton pour l'icône de l'horloge -->
          <UiSkeleton class="h-6 w-6" />
        </div>
        <div class="flex flex-col items-start text-sm">
          <!-- Skeleton pour la date -->
          <UiSkeleton class="h-4 w-16" />
        </div>

        <div class="flex ml-auto gap-3">
          <div class="flex flex-col items-start text-sm">
            <!-- Skeleton pour les boutons -->
            <UiSkeleton class="h-8 w-8" />
          </div>

          <div class="flex flex-col items-start text-sm">
            <!-- Skeleton pour les boutons -->
            <UiSkeleton class="h-8 w-8" />
          </div>
        </div>
      </div>

      <div class="flex gap-5 p-8">
        <div class="flex flex-col items-start text-sm">
          <!-- Skeleton pour le corps du post -->
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