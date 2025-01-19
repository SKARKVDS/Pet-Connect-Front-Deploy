<script lang="ts">

import type {UiComboBoxProps} from "~/components/Ui/ComboBox.vue";

type UiVeeComboBoxProps = {
  label?: string;
  name?: string;
  id?: string;
  hint?: string;
  rules?: any;
  validateOnMount?: boolean;
  required?: boolean;
} & UiComboBoxProps

</script>

<script setup lang="ts">

const props = defineProps<UiVeeComboBoxProps>();

const inputId = props.id || useId();

const {errorMessage, value, setValue} = useField(() => props.name || inputId, props.rules, {
  initialValue: props.modelValue,
  label: props.label,
  validateOnMount: props.validateOnMount,
  syncVModel: true
});

const onSelect = (_value) => {
  setValue(_value)
}

</script>

<template>
  <div>
    <UiLabel
        v-if="label"
        :for="inputId"
        :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
    ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel>
    <UiComboBox @update:model-value="onSelect" v-bind="props"/>
    <TransitionSlide v-if="errorMessage || hint" group tag="div">
      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">
        {{ hint }}
      </p>

      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">
        {{ errorMessage }}
      </p>
    </TransitionSlide>

    <UiInput
        v-if="!disabled"
        :id="inputId"
        v-model="value"
        type="hidden"
        :required="required"
        :name="name"
    />
  </div>
</template>