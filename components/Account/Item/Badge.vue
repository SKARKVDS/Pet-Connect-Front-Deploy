<script setup lang="ts">
  defineProps<{badgeUrl: string}>()
</script>

<template>
  <div class="flex flex-col w-full gap-4 items-center text-3xl ">
    <Icon name="lucide:crown"/>
    <h1>Your Rank</h1>

    <UiAvatar class="w-72 h-72 border border-black">
      <UiAvatarImage :src="badgeUrl" alt="https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg" />
      <UiAvatarFallback>Loading</UiAvatarFallback>
    </UiAvatar>
  </div>


</template>

<style scoped>

</style>