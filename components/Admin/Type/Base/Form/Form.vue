<script setup lang="ts">

import {schema} from "~/form/type";
import type {InputTypeAdd} from "~/services/type/types";

const emits = defineEmits(['onSubmit'])

defineProps<{type? :InputTypeAdd}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="type" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminTypeBaseFormNameInput :initial-value="type?.name"/>
      <AdminTypeBaseFormAddressProposalInput :initial-value="type?.addressProposal"/>
      <AdminTypeBaseFormSpeciesInput :initial-value="type?.species"/>
      <AdminTypeBaseFormSubmit/>
    </fieldset>
  </form>
</template>