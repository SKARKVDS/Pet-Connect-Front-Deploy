<script setup lang="ts">

import {schema} from "~/form/specie";
import type {InputSpecieAdd} from "~/services/specie/types";

const emits = defineEmits(['onSubmit'])

defineProps<{specie? : InputSpecieAdd}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="specie" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminSpecieBaseFormNameInput :initial-value="specie?.name"/>
      <AdminSpecieBaseFormSubmit/>
    </fieldset>
  </form>
</template>