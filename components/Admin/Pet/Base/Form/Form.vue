<script setup lang="ts">

import {schema} from "~/form/petAdmin";
import type { InputPetAdd, Pet } from "~/services/pet/types";

const emits = defineEmits(['onSubmit'])

defineProps<{pet? :Pet}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="pet" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminPetBaseFormNickNameInput :initial-value="pet?.nickName"/>
      <AdminPetBaseFormSexInput :initial-value="pet?.sex"/>
      <AdminPetBaseFormBirthdayInput :initial-value="pet?.birthDate"/>
      <AdminPetBaseFormSpecieInput :initial-value="pet?.specie"/>
      <AdminPetBaseFormRaceInput :initial-value="pet?.race"/>
      <AdminPetBaseFormIdInput :initial-value="pet?.identification"/>
      <AdminPetBaseFormSubmit/>
    </fieldset>
  </form>
</template>