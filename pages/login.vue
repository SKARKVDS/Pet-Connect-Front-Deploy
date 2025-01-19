<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
        class="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/80%)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/80%)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
    />

    <div class="relative w-full max-w-[330px]">
      <div class="flex flex-col items-center px-5">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
      </div>
      <form @submit="onSubmit" class="mt-10 px-5">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput
              required
              label="Email"
              type="email"
              name="email"
              placeholder="john@example.com"
          />
          <UiVeeInput
              required
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
          />
          <UiButton class="w-full" type="submit" text="Continue"/>
        </fieldset>
      </form>
      <p class="mt-8 text-center text-sm text-muted-foreground">
        Doesn't have an account?
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="/sign-up"
        >Sign up
        </NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {schema} from "~/form/login";
import {useAuthStore} from "~/stores/auth";

const title = "Login";
const description = "Please enter your email and your password";

useSeoMeta({title, description});

const {isSubmitting, handleSubmit} = useForm({
  validationSchema: toTypedSchema(schema),
});

const authStore = useAuthStore()

const router = useRouter()

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  const result = await authStore.dispatchLogin(values.email, values.password)
  console.log(result)
  if (result.success) {
    await router.push("dashboard")
    useSonner.success("Login successful.")
  } else {
    useSonner.error("Invalid credentials...")
  }
})

</script>
