<template>
  <ToggleGroupRoot
      :model-value="model"
      @update:model-value="(val) => {
      if (val.length) model = val
      }"
      v-slot="{ modelValue }"
      v-bind="forwarded"
      :class="styles({ class: props.class })"
  >
    <slot :model-value="modelValue"/>
  </ToggleGroupRoot>
</template>

<script lang="ts" setup>
import {ToggleGroupRoot, useForwardPropsEmits} from "radix-vue";
import type {ToggleGroupRootEmits, ToggleGroupRootProps} from "radix-vue";

const model = defineModel()

const props = withDefaults(
    defineProps<
        ToggleGroupRootProps & {
      /** custom class to add to the parent */
      class?: any;
    }
    >(),
    {
      type: "single",
    }
);

const emit = defineEmits<ToggleGroupRootEmits>();
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);

const styles = tv({
  base: "flex items-center gap-2",
});
</script>
