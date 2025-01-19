<script setup lang="ts">

import {schema} from "~/form/topic";
import type {InputTopicAdd} from "~/services/topic/types";

const emits = defineEmits(['onSubmit'])

defineProps<{topic? :InputTopicAdd}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="topic" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <TopicBaseFormNameInput :initial-value="topic?.name"/>
      <TopicBaseFormSubmit/>
    </fieldset>
  </form>
</template>