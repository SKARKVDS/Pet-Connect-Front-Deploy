<script lang="ts">

import {createContext} from "radix-vue";
import type {Type} from "~/services/type/types";
import type {Ref} from "vue";
import type {InputProposalAdd} from "~/services/proposal/types";

type ProposalCreateFormContext = {
  selectedType: Ref<Type | undefined>
}

type ProposalCreateFormEmits = {
  'submit': [value: InputProposalAdd]
}

export const [injectProposalCreateFormContext, provideProposalCreateFormContext]
    = createContext<ProposalCreateFormContext>('ProposalCreateForm')

</script>

<script setup lang="ts">

import {noAddressSchema, fullSchema} from "~/layers/proposals/validators/create.validators";
import ProposalSpecieSelect from "~/layers/proposals/components/ProposalSpeciesSelect.vue";
import {z} from "zod";

const emits = defineEmits<ProposalCreateFormEmits>()

const selectedType = ref<Type | undefined>()

const typedSchema = computed(() => toTypedSchema(selectedType.value ? (selectedType.value.addressProposal ? fullSchema : noAddressSchema) : z.object({})));
const { handleSubmit } = useForm({
  validationSchema: typedSchema,
  validateOnMount: true
});

const submit = handleSubmit((values) => emits('submit', values))

provideProposalCreateFormContext({
  selectedType
})

</script>

<template>
  <form @submit="submit">
    <fieldset class="grid grid-cols-1 xl:grid-cols-[1fr_1px_1fr] gap-x-4">
      <div class="flex flex-col space-y-4">
        <ProposalTypeSelect/>
        <ProposalAddressInput/>
        <ProposalDescriptionInput/>
      </div>
      <UiDivider class="hidden xl:flex" orientation="vertical"/>
      <div class="space-y-4 mt-4 xl:mt-0">
        <ProposalSpecieSelect/>
      </div>
      <UiButton type="submit" class="xl:col-start-3 mt-4">Create</UiButton>
    </fieldset>
  </form>
</template>

<style scoped>

</style>