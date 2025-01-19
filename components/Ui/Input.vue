<template>
  <!-- eslint-disable-next-line vue/html-self-closing -->
  <input ref="input" v-bind="props" v-model="localModel" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      class?: any;
      id?: string;
      name?: string;
      placeholder?: string;
      disabled?: boolean;
      required?: boolean;
      type?: string;
      modelValue?: any;
    }>(),
    { type: "text" }
  );
  const emits = defineEmits<{
    "update:modelValue": [value: any];
  }>();
  const localModel = useVModel(props, "modelValue", emits);

  const styles = tv({
    base: "form-input h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:px-1 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 dark:[color-scheme:dark] sm:text-sm",
  });

  const input = useTemplateRef('input')

  defineExpose({input})
</script>
