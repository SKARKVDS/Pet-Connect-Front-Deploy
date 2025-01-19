<script lang="ts">

export type UiComboBoxProps = {
  class?: any;
  items?: any[];
  defaultValue?: any,
  modelValue?: any;
  loading?: boolean;
  disabled?: boolean;
  textButton?: string;
  placeholder?: string;
  emptyMessage?: string;
  keyProperty?: string;
  labelProperty?: string;
  valueProperty?: string;
}

export type UiComboBoxEmits = {
  'update:modelValue': [value: any | undefined]
}

</script>

<script setup lang="ts">

import type {Ref} from "vue"

const props = withDefaults(defineProps<UiComboBoxProps>(), {
  items: () => [],
  labelProperty: 'label',
  valueProperty: 'value'
});

const emits = defineEmits<UiComboBoxEmits>()

const {defaultValue, items} = toRefs(props)

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: defaultValue.value,
  passive: (props.modelValue === undefined) as false,
}) as Ref<any | undefined>

const open = ref(false);

const selected = ref(items.value.find((item) => item[props.valueProperty] === props.modelValue))
watch(selected, (_selected) => {
  modelValue.value = _selected
  emits('update:modelValue', _selected)
})

const selectedItems = computed(
    () => items.value.find((item) => item[props.valueProperty] === selected.value?.[props.valueProperty])?.[props.labelProperty]
);

const filterFunction = (list: typeof items, search: string) =>
    list.filter((i) => i[props.labelProperty].toLowerCase().includes(search.toLowerCase()));

</script>

<template>
  <div :class="props.class">
    <UiSkeleton v-if="loading" class="h-10 w-full"/>
    <UiPopover v-else v-model:open="open">
      <UiPopoverTrigger as-child>
        <UiButton
            variant="outline"
            role="combobox"
            :aria-expanded="open"
            class="w-full justify-between"
        >
          {{ selected ? selectedItems : textButton }}

          <Icon name="lucide:chevrons-up-down" class="ml-auto h-4 w-4 shrink-0 opacity-50"/>
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-[250px] p-0">
        <UiCommand v-model="selected" :filter-function="filterFunction">
          <UiCommandInput :placeholder="placeholder || 'Search...'"/>
          <UiCommandList>
            <UiCommandEmpty>{{ emptyMessage || 'No results found' }}</UiCommandEmpty>
            <UiCommandGroup>
              <UiCommandItem
                  v-for="item in items"
                  :key="item[keyProperty || labelProperty]"
                  :value="item"
                  @select="open = false"
              >
                <Icon
                    name="lucide:check"
                    :class="[
                    'mr-2 h-4 w-4',
                    selected?.[valueProperty] === item[valueProperty] ? 'opacity-100' : 'opacity-0',
                  ]"
                />
                {{ item[labelProperty] }}
              </UiCommandItem>
            </UiCommandGroup>
          </UiCommandList>
        </UiCommand>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>
