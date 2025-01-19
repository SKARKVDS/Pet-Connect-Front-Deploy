<script lang="ts">

type UiVeeListboxInputProps = {
  inputClass?: any;
  selectClass?: any;
  items?: any[];
  inputLabel?: string;
  selectLabel?: string;
  modelValue?: any[];
  hint?: string;
  loading?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  rules?: any;
  validateOnMount?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  required?: boolean;
  keyProperty?: string;
  labelProperty?: string;
  valueProperty?: string;
}
</script>

<script setup lang="ts">

const props = withDefaults(defineProps<UiVeeListboxInputProps>(), {
  items: () => [],
  modelValue: () => [],
  labelProperty: 'label',
  valueProperty: 'value'
});

defineOptions({inheritAttrs: false});

const {items, modelValue} = toRefs(props)

const inputId = props.id || useId();

const {errorMessage, value, setValue} = useField(() => props.name || inputId, props.rules, {
  initialValue: props.modelValue,
  label: props.inputLabel,
  validateOnMount: props.validateOnMount,
  syncVModel: true,
});

const search = ref<string>("");

const filteredItems = computed<any[]>(() => filterItem(search.value));
const filterItem = (filter: string) => items.value.filter((item) => item[props.labelProperty].toLowerCase().includes(filter.toLowerCase()))

const selected = ref(modelValue.value);
watch(selected, (newValue) => {
  setValue(newValue)
})

</script>

<template>
  <div>
    <UiLabel
        v-if="inputLabel"
        :for="inputId"
        :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
    ><span>{{ inputLabel }} <span v-if="required && !disabled" class="text-destructive">*</span></span></UiLabel>
    <UiListbox :disabled="disabled" v-model="selected" multiple>
      <UiListboxFilter :class="inputClass" v-model="search" :placeholder="placeholder || 'Search...'"/>
      <UiSkeleton v-if="loading" :class="selectClass"/>
      <UiListboxContent :class="selectClass" v-else>
        <UiListboxGroup v-if="filteredItems.length > 0">
          <UiListboxGroupLabel v-if="selectLabel">{{ selectLabel }}</UiListboxGroupLabel>
          <template v-for="item in filteredItems" :key="item[keyProperty || labelProperty]">
            <UiListboxItem :value="item[valueProperty]">
              <span>{{ item[labelProperty] }}</span>
            </UiListboxItem>
          </template>
        </UiListboxGroup>
        <UiListboxGroup class="h-full" v-else>
            <div class="flex h-full items-center justify-center py-5 text-sm font-medium">
              <p>{{ emptyMessage || 'No results found' }}</p>
            </div>
        </UiListboxGroup>
      </UiListboxContent>
    </UiListbox>
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