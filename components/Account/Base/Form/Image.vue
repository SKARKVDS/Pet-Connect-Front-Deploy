<script setup lang="ts">

  import {schema} from "~/form/account/image";

  const emits = defineEmits(['onSubmit'])


  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form  @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AccountBaseFormFileInput/>
      <AccountBaseFormSubmit/>
    </fieldset>
  </form>
</template>