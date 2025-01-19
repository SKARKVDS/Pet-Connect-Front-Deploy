<script setup lang="ts">

import {schema} from "~/form/pet";
import type {InputPetAdd} from "~/services/pet/types";

const emits = defineEmits(['onSubmit'])

defineProps<{pet? :InputPetAdd}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="pet" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <PetBaseFormAvatarInput/>
      <PetBaseFormNickNameInput :initial-value="pet?.nickName"/>
      <PetBaseFormSexInput :initial-value="pet?.sex"/>
      <PetBaseFormBirthdayInput :initial-value="pet?.birthDate"/>
      <PetBaseFormSpecieInput :initial-value="pet?.specie"/>
      <PetBaseFormRaceInput :initial-value="pet?.race"/>
      <PetBaseFormIdInput :initial-value="pet?.identification"/>
      <PetBaseFormSubmit/>
    </fieldset>
  </form>
</template>