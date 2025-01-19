<script lang="ts">

type UiVeeTimePickerProps = {
  class?: any;
  defaultValue?: number[];
  dayValue?: Date;
  modelValue?: number[];
  disabled?: boolean;
  label?: string;
  name?: string;
  id?: string;
  hint?: string;
  rules?: any;
  validateOnMount?: boolean;
  required?: boolean;
}

</script>

<script setup lang="ts">

import {addHours, startOfToday} from "date-fns";

const props = withDefaults(defineProps<UiVeeTimePickerProps>(), {
  dayValue: () => startOfToday()
})

const inputId = props.id || useId();

const {errorMessage, value, setValue} = useField(() => props.name || inputId, props.rules, {
  initialValue: props.modelValue || [props.dayValue.getTime(), addHours(props.dayValue, 24).getTime()],
  label: props.label,
  validateOnMount: props.validateOnMount,
  syncVModel: true
});

const ticks = [...Array(24 + 1)].map((_, i) => i);

const sliderValue = ref([0, 24]);
watch(sliderValue, (_value) => {
  setValue([addHours(props.dayValue, _value[0]).getTime(), addHours(props.dayValue, _value[1]).getTime()])
})

</script>

<template>
  <div>
    <UiLabel
        v-if="label"
        :for="inputId"
        :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
    ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel>
    <div class="mt-4">
      <UiSlider v-model="sliderValue" :max="24" aria-label="Select a time slot" />
      <span
          class="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
      >
          <span
              v-for="(_, i) in ticks"
              :key="i"
              class="flex w-0 flex-col items-center justify-center gap-2"
          >
            <span :class="['h-1 w-px bg-muted-foreground/70', i % 2 !== 1 && 'h-0.5']" />
            <span :class="[i % 2 === 1 && 'opacity-0']">{{ i }}</span>
          </span>
        </span>
    </div>
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