<script setup lang="ts">

import {schema} from "~/form/notification";
import type {InputForumAdd} from "~/services/forum/types";

const emits = defineEmits(['onSubmit'])


const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form  @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AccountBaseFormTypeInput/>
      <AccountBaseFormNameInput/>
      <AccountBaseFormSubmit/>
    </fieldset>
  </form>
</template>