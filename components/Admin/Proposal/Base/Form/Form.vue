<script setup lang="ts">

import {schema} from "~/form/proposalAdmin";
import type { InputPetAdd, Pet } from "~/services/pet/types";
import type { ProposalAdmin } from "~/services/proposal/types";

const emits = defineEmits(['onSubmit'])

defineProps<{proposal? :ProposalAdmin}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="proposal" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminProposalBaseFormDescriptionInput :initial-value="proposal?.description"/>
      <AdminProposalBaseFormSubmit/>
    </fieldset>
  </form>
</template>