<script setup lang="ts">

const props = defineProps<{
  userName: string,
  firstName: string,
  lastName: string,
  badge: string,
  url: string
}>()

</script>

<template>
  <div class="flex items-end gap-2">
    <UiAvatar class="rounded-lg">
      <UiAvatarImage :src="url"/>
      <UiAvatarFallback>{{ `${firstName.at(0).toUpperCase()}${lastName.at(0).toUpperCase()}` }}</UiAvatarFallback>
    </UiAvatar>
    <div class="flex flex-col">

      <div class="flex gap-2 items-center">
        <span>
          {{ userName }}
        </span>
        <div class="text-center flex items-baseline" v-if="badge !== '------'">
          <UiBadge class="h-[18px]">{{ badge }}</UiBadge>
        </div>
      </div>
      <span class="text-muted-foreground text-xs mt-0.5">{{ firstName }} {{ lastName }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>