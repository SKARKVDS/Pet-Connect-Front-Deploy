<template>
  <UiVeeInput
      required
      label="Email"
      type="email"
      name="email"
      placeholder="john@example.com"
      @input="emailValid = email.safeParse($event.target.value).success"
  />
  <UiVeePasswordInput
      required
      label="Password"
      type="password"
      name="password"
      placeholder="Enter your password"
      @input="passwordValid = password.safeParse($event.target.value).success"
  />
  <UiButton :disabled="!valid" class="w-full" type="button" text="Continue"/>
</template>

<script setup lang="ts">

import {email, password} from "~/form/signup";

const emailValid = ref(false)
const passwordValid = ref(false)

const valid = computed(() => emailValid.value && passwordValid.value)

</script>