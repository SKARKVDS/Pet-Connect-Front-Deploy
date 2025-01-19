<script setup lang="ts">

  import {schema} from "~/form/badge/edit";
  import type { InputBadgeUpdateAttributs } from "~/services/badge/types";

  const emits = defineEmits(['onSubmit'])

  defineProps<{badge : InputBadgeUpdateAttributs}>()

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminBadgeBaseFormNameInput :initial-value="badge.name"/>
      <AdminBadgeBaseFormCountServiceInput :initial-value="badge.numberServices"/>
      <AdminBadgeBaseFormSubmit/>
    </fieldset>
  </form>
</template>