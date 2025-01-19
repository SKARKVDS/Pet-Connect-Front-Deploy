<script setup lang="ts">

import {schema} from "~/form/race";
import type {InputRaceAdd} from "~/services/race/types";

const emits = defineEmits(['onSubmit'])

defineProps<{race? : InputRaceAdd}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="race" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminRaceBaseFormNameInput :initial-value="race?.name"/>
      <AdminRaceBaseFormSubmit/>
    </fieldset>
  </form>
</template>