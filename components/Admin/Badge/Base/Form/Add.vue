<script setup lang="ts">

import {schema} from "~/form/badge/add";
import type {InputPetAdd} from "~/services/pet/types";

const emits = defineEmits(['onSubmit'])


const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminBadgeBaseFormAvatarInput/>
      <AdminBadgeBaseFormNameInput/>
      <AdminBadgeBaseFormCountServiceInput :initial-value="0"/>
      <AdminBadgeBaseFormSubmit/>
    </fieldset>
  </form>
</template>