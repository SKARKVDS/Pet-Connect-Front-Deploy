<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
        class="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/80%)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/80%)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
    />

    <div class="relative w-full max-w-[330px]">
      <div class="flex flex-col items-center px-5">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
      </div>

      <UiStepper
          v-model="stepper"
          class="flex w-full items-start justify-between gap-2 px-5 mt-10 "
      >
        <UiStepperItem
            v-for="step in steps"
            :key="step.index"
            v-slot="{ state }"
            class="group relative w-full"
            :step="step.index"
            :class="[isLastItem(step.index) && '!w-fit']"
        >
          <UiStepperTrigger
              as="div"
              class="flex items-center gap-3"
              :class="[isLastItem(step.index) && 'justify-end']"
          >
            <UiButton
                :variant="state == 'completed' || state == 'active' ? 'default' : 'outline'"
                size="icon-sm"
                class="z-10 size-8 shrink-0 rounded-full"
                :class="[
                state == 'active' && `ring-2 ring-ring ring-offset-2 ring-offset-background`,
                state == 'completed' && step.validity && 'bg-green-700 hover:bg-green-800 text-white',
                state == 'completed' && !step.validity && 'bg-red-700 hover:bg-red-800 text-white'
                ]"
            >
              <TransitionScale mode="out-in" :scale="0.8" :duration="100">
                <Icon v-if="state == 'active'" name="lucide:pen" class="size-4"/>
                <Icon v-else-if="state == 'completed' && step.validity" name="lucide:check" class="size-4"/>
                <Icon v-else-if="state == 'completed' && !step.validity" name="lucide:circle-x" class="size-4"/>
                <span v-else>{{ step.name }}</span>
              </TransitionScale>
            </UiButton>
            <UiStepperSeparator
                v-if="step.index != steps[steps.length - 1].index"
                class="h-0.5 shrink-0 grow rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />
          </UiStepperTrigger>
        </UiStepperItem>
      </UiStepper>

      <form enctype="multipart/form-data" @submit="onSubmit" class="mt-10 px-5">
        <fieldset :disabled="isSubmitting">
          <div :class="isCurrentItem(0)">
            <UiVeeInput
                required
                label="Email"
                type="email"
                name="email"
                placeholder="john@example.com"
                @change="emailValid = isFieldValid('email')"
            />
            <UiVeePasswordInput
                required
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                @change="emailValid = isFieldValid('email')"
            />
            <UiButton @click="goNext" class="w-full" type="button" text="Continue"/>
          </div>
          <div :class="isCurrentItem(1)">
            <UiVeeInput
                required
                label="Nickname"
                type="text"
                name="userName"
            />
            <UiVeeInput
                required
                label="First name"
                type="text"
                name="firstName"
            />
            <UiVeeInput
                required
                label="Last name"
                type="text"
                name="lastName"
            />
            <UiVeeInput
                required
                label="Phone number"
                type="text"
                name="phoneNumber"
            />
            <div class="flex gap-2">
              <UiButton @click="stepper--" size="icon" variant="outline">
                <Icon class="size-4" name="lucide:chevron-left"/>
              </UiButton>
              <UiButton class="w-full" type="submit" text="Create my account"/>
            </div>
          </div>
        </fieldset>
      </form>
      <p class="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="/login"
        >Log in
        </NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {schema} from "~/form/signup";
import {useAuthStore} from "~/stores/auth";

const title = "Sign Up";
const description = "Please provide your email and your password";

useSeoMeta({title, description});

const {isSubmitting, handleSubmit, isFieldValid} = useForm({
  validationSchema: toTypedSchema(schema),
});

const authStore = useAuthStore()

const router = useRouter()

const onSubmit = handleSubmit(async (values) => {
  const result = await authStore.dispatchSignUp(values)
  if (result.success) {
    await router.push("dashboard")
    useSonner.success("Sign up successful! Welcome to PetConnect.")
  } else {
    useSonner.error("Invalid credentials...")
  }
})

const stepper = ref(0);
const steps = ref([
  {index: 0, name: 1, validity: false},
  {index: 1, name: 2, validity: false}
]);

const emailValid = ref(false)


const goNext = () => {
  if (stepper.value === 0) {
    steps.value[0].validity = isFieldValid("email") && isFieldValid("password")
  }

  stepper.value++;
}

const isLastItem = (step: number) => step === steps.value.length - 1;

const isCurrentItem = (step: number) => step === stepper.value ? 'grid gap-5' : 'hidden'


</script>
