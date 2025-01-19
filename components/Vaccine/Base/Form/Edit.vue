<script setup lang="ts">

  import {schema} from "~/form/vaccination";
  import type {InputVaccineAdd} from "~/services/vaccine/types";
  import type { InputVaccinationAdd, Vaccination } from "~/services/vaccination/types";
  import { useVaccineStore } from "~/stores/vaccine";

  const emits = defineEmits(['onSubmit'])
  const vaccineStore = useVaccineStore()

  const props = defineProps<{vaccination :Vaccination}>()

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });


  const vaccineId = ref<number | null>(props.vaccination?.vaccineId || null);
  const showBoosterDateInput = ref(props.vaccination.needBooster);

  // Watcher sur la sélection du vaccin
  watch(vaccineId, (newVaccineId) => {
    const vaccine = vaccineStore.vaccines.find(vaccine => vaccine.id === newVaccineId);
    if (vaccine) {
      showBoosterDateInput.value = vaccine.needBooster;
    }
  });

  const submit = handleSubmit((values) => emits('onSubmit', values))

  const dateVaccinationRef = ref<Date>(new Date(props.vaccination?.dateVaccination));

</script>

<template>
  <form :initial-values="vaccination" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <VaccineBaseFormVaccineInput :initial-value="vaccination.vaccineId" @update:model-value="vaccineId = $event"  />
      <VaccineBaseFormVaccineDateInput v-model="dateVaccinationRef" :initial-value="vaccination?.dateVaccination"/>
      <VaccineBaseFormBoosterDateInput :min-date="dateVaccinationRef" v-if="showBoosterDateInput" :initial-value="vaccination.dateBooster"/>
      <VaccineBaseFormSubmit/>
    </fieldset>
  </form>
</template>