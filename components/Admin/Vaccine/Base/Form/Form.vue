<script setup lang="ts">

import {schema} from "~/form/vaccine";
import type {InputVaccineAdd} from "~/services/vaccine/types";

const emits = defineEmits(['onSubmit'])

defineProps<{vaccine? :InputVaccineAdd}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="vaccine" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminVaccineBaseFormNameInput :initial-value="vaccine?.name"/>
      <AdminVaccineBaseFormNeedBoosterInput :initial-value="vaccine?.needBooster"/>
      <AdminVaccineBaseFormSubmit/>
    </fieldset>
  </form>
</template>