<script setup lang="ts">

import {email} from "~/form/signup";

const model = defineModel('valid')

</script>

<template>
  <UiVeeInput
      required
      label="Email"
      type="email"
      name="email"
      placeholder="john@example.com"
      @input="model = email.safeParse($event.target.value).success"
  />
</template>

<style scoped>

</style>