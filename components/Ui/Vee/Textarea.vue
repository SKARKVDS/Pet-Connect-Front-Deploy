<template>
  <div class="w-full" :class="[maxContent && 'flex flex-col flex-auto']">
    <UiLabel v-if="label" :for="inputId" :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']">
      <span>{{ label }} <span v-if="required && !disabled" class="text-destructive">*</span></span>
    </UiLabel>
    <div class="relative" :class="[maxContent && 'h-full']">
      <slot name="icon">
        <span v-if="hasIcon" class="absolute left-3 top-3 flex items-center justify-center">
          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground/70" />
        </span>
      </slot>
      <UiTextarea
        :id="inputId"
        v-model="value"
        :required="required"
        :rows="rows"
        :name="name"
        v-bind="$attrs"
        :class="[hasIcon && 'pl-9', maxContent && 'h-full']"
        :placeholder="placeholder"
        @blur="handleBlur"
        :disabled="disabled"
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
    label?: string;
    icon?: string;
    hint?: string;
    modelValue?: string;
    name?: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    placeholder?: string;
    rows?: number;
    required?: boolean;
    maxContent?: boolean;
    disabled: boolean;
  }>();

  const inputId = props.id || useId();

  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
