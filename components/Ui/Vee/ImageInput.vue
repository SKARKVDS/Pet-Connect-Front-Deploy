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
  disabled?: boolean;
  label: string;
}>()

const emits = defineEmits<{
  change: [files?: FileList | File | File[] | null];
  blur: [event?: FocusEvent];
}>();

const currentAvatarImage = ref<string | null>(null);

async function onAvatarChange(files) {
  if (!files || files.length === 0) {
    return;
  }
  const file = files[0];
  const {execute} = useBase64(file);
  currentAvatarImage.value = await execute();
}

const inputId = props.id || useId();

const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

const {errorMessage, handleChange, handleBlur} = useField(() => props.name, props.rules, {
  initialValue: undefined,
  label: props.label,
  validateOnMount: props.validateOnMount,
});

</script>


<template>
  <div class="w-full">
    <UiLabel
        v-if="label"
        :for="inputId"
        :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'flex flex-col items-start']"
    >
      <span class="mb-2">{{ label }} <span v-if="required" class="text-destructive">*</span></span>
      <div
          class="relative rounded w-full flex aspect-square items-center justify-center overflow-hidden border-background bg-muted shadow-sm shadow-black/10"
      >
        <img
            v-if="currentAvatarImage"
            :src="currentAvatarImage"
            class="h-full w-full object-cover"
            alt="Profile image"
        />
        <div v-if="currentAvatarImage" class="absolute flex size-10 cursor-pointer items-center justify-center top-0 right-0 m-2 rounded bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70">
          <Icon name="lucide:pencil" class="size-5" aria-hidden="true"/>
        </div>
        <div v-else
             class="absolute flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
             aria-label="Change profile picture"
        >
          <Icon name="lucide:image-plus" class="size-5" aria-hidden="true"/>
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