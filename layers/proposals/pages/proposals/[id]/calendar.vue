<script setup>

import {useBreadcrumbStore} from "~/stores/breadcrumb";
import {usePlanificationStore} from "~/layers/proposals/stores/planification";
import {schema} from "~/layers/proposals/validators/update-calendar.validators";
import {startOfToday, startOfTomorrow} from "date-fns";

definePageMeta({
  layout: 'dashboard',
  middleware: 'calendar'
})

const id = useRoute().params.id

useBreadcrumbStore().set([
  {label: "Proposals", link: "/proposals"},
  {label: "Calendar", link: `/proposals/${id}/calendar`}
])

const planificationStore = usePlanificationStore()

onMounted(async () => {
  const result = await planificationStore.dispatchGetAllByProposalId(id)
  if (!result.success) {
    // show error
  }
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
});

const sendRequest = async (values) => {
  values.proposalId = id
  useSonner.promise(planificationStore.dispatchAdd(values), {
    loading: "Updating",
    success: () => "Calendar updated!",
    error: 'An unexpected error occured'
  })
}

const submit = handleSubmit(sendRequest)

</script>

<template>
  <form @submit="submit">
    <UiVeeCalendarSelector
        name="dateTimes"
        :min-date="startOfTomorrow()"
        :model-value="planificationStore.planifications"
    />
    <div class="flex justify-end">
      <UiButton class="mt-4" type="submit">Apply modification</UiButton>
    </div>
  </form>
</template>