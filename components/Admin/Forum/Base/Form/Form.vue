<script setup lang="ts">

import {schema} from "~/form/forum";
import type {InputForumAdd} from "~/services/forum/types";

const emits = defineEmits(['onSubmit'])

defineProps<{forum? : InputForumAdd}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="forum" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminForumBaseFormNameInput :initial-value="forum?.name"/>
      <AdminForumBaseFormSubmit/>
    </fieldset>
  </form>
</template>