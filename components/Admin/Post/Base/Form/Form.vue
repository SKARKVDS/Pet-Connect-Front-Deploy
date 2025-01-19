<script setup lang="ts">

import {schema} from "~/form/post";
import type {InputPostAdd} from "~/services/post/types";

const emits = defineEmits(['onSubmit'])

defineProps<{post? : InputPostAdd}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="post" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminPostBaseFormBodyInput :initial-value="post?.body"/>
      <AdminPostBaseFormSubmit/>
    </fieldset>
  </form>
</template>