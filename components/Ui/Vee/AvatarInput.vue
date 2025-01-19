<template>
  <div class="w-full">
    <UiLabel :for="inputId" :class="[errorMessage && 'text-destructive', 'mb-2', 'justify-center']">
      <div
          class="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10"
          :class="[!meta.validated && required && 'border-destructive']"
      >
        <img
            v-if="currentAvatarImage"
            :src="currentAvatarImage"
            class="h-full w-full object-cover"
            width="80"
            height="80"
            alt="Profile image"
        />

        <div
            class="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            aria-label="Change profile picture"
        >
          <Icon name="lucide:image-plus" class="size-4" aria-hidden="true"/>
        </div>
      </div>
    </UiLabel>
    <div class="relative hidden">
      <UiInput
          :id="inputId"
          type="file"
          :required="required"
          :name="name"
          v-bind="$attrs"
          :class="[hasIcon]"
          :accept="accept"
          @change="
          handleChange($event);
          onAvatarChange($event.target.files);
          emits('change', $event.target.files);
        "
          @blur="
          handleBlur($event);
          emits('blur', $event);
        "
      />
    </div>
    <TransitionSlide group tag="div">
      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">
        {{ hint }}
      </p>

      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">
        {{ errorMessage }}
      </p>
    </TransitionSlide>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon?: string;
  hint?: string;
  name: string;
  id?: string;
  rules?: any;
  validateOnMount?: boolean;
  accept?: string;
  required?: boolean;
}>()

const emits = defineEmits<{
  change: [files?: FileList | File | File[] | null];
  blur: [event?: FocusEvent];
}>();

const currentAvatarImage = ref<string | null>(null);

async function onAvatarChange(files) {
  if (!files || files.length === 0) {
    currentAvatarImage.value = null;
    return;
  }
  const file = files[0];
  const {execute} = useBase64(file);
  currentAvatarImage.value = await execute();
}

const inputId = props.id || useId();

const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

const {errorMessage, handleChange, handleBlur, meta} = useField(() => props.name, props.rules, {
  validateOnMount: props.validateOnMount,
});

</script>
