<script setup lang="ts">

  import {schema} from "~/form/pet/image";

  const emits = defineEmits(['onSubmit'])


  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form  @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <PetBaseFormFileInput/>
      <PetBaseFormSubmit/>
    </fieldset>
  </form>
</template>