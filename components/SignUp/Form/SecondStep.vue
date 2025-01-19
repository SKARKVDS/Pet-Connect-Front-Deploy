<template>
  <UiVeeAvatarInput
      hint="You can upload a picture to help other users recognize you more easily. This is completely optional."
      name="avatar" label="Cool" id="id"/>
  <UiVeeInput
      required
      label="Nickname"
      type="text"
      name="userName"
  />
  <div class="flex gap-2">
    <UiButton size="icon" variant="outline">
      <Icon class="size-4" name="lucide:chevron-left"/>
    </UiButton>
    <UiButton :disabled="!valid" class="w-full" type="button" text="Continue"/>
  </div>
</template>

<script setup lang="ts">

import {userName} from "~/form/signup";

const valid = computed(() => userName.value)

</script>