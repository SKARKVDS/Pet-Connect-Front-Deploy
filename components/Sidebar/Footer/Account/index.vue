<script setup lang="ts">

defineProps<{
  username: String,
  email: String,
  avatar: String
}>()

</script>

<template>
  <UiAvatar class="size-8 rounded-lg">
    <UiAvatarImage :src="avatar" :alt="username"/>
    <UiAvatarFallback class="rounded-lg">{{ username?.substring(0, 2).toUpperCase() }}</UiAvatarFallback>
  </UiAvatar>
  <div class="grid flex-1 text-left text-sm leading-tight">
    <span class="truncate font-semibold">{{ username }}</span>
    <span class="truncate text-xs">{{ email }}</span>
  </div>
</template>
