<script lang="ts">

import {createContext} from "radix-vue";
import type {Type} from "~/services/type/types";
import type {Ref} from "vue";
import type {Service} from "~/services/service/types";

type ServiceFindContext = {
  fetchingServices: Ref<boolean>;
  error: Ref<boolean>;
  onDateChange: (date: Date) => void;
  selectedDate: Ref<Date | undefined>;
  minDate: Date;
  selectedService: Ref<Service | undefined>;
  isFormOpen: Ref<boolean>;
  onRequestSubmit: (value: any) => void;
  selectedType: Ref<Type | undefined>;
}

export const [injectServiceFindContext, provideServiceFindContext]
    = createContext<ServiceFindContext>('ServiceFindContext')

</script>

<script setup lang="ts">

import {useServiceStore} from "~/layers/service/stores/service";
import {useBreadcrumbStore} from "~/stores/breadcrumb";
import {startOfTomorrow} from "date-fns";
import {Ref} from "vue";
import {Service} from "~/services/service/types";
import {useRequestStore} from "~/stores/request";

definePageMeta({
  layout: 'dashboard'
})

useBreadcrumbStore().set([
  {label: "Find service", link: "/service/find"}
])

const selectedType = ref<Type>()

const serviceStore = useServiceStore()

const services = ref<Service[]>([])
const filteredServices = computed<Service[]>(() => selectedType.value ? services.value.filter(service => service.typeId === selectedType.value?.id) : services.value)

const fetchingServices = ref<boolean>(false)
const error = ref<boolean>(false)
const selectedDate = ref<Date>()
const isDateSelected = ref<boolean>(false)
const onDateChange = async (date) => {
  fetchingServices.value = true;

  const result = await serviceStore.dispatchGetAllByTimestamp(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), 0, 0, 0)).finally(() => fetchingServices.value = false)
  if (result.success) {
    services.value = result.content;
  }

  error.value = !result.success
}

const isFormOpen = ref<boolean>(false)

const requestStore = useRequestStore()
const onRequestSubmit = async (values) => {
  values.proposalId = selectedService.value?.id
  useSonner.promise(requestStore.dispatchAdd(values), {
    loading: "Send your request",
    success: () => { isFormOpen.value = false; return "Your request has been sent!" },
    error: "An unexpected error occured",
  })
}

const selectedService = ref<Service>()

provideServiceFindContext({
  fetchingServices,
  error,
  onDateChange,
  selectedDate,
  minDate: startOfTomorrow(),
  selectedService,
  isFormOpen,
  onRequestSubmit,
  selectedType,
})

</script>

<template>
  <ServiceFindHeader>
    <ServiceFindHeaderTypeSelector/>
    <ServiceFindHeaderDatePicker/>
  </ServiceFindHeader>
  <ServiceFindError v-if="error"/>
  <ServiceFindList v-else>
    <template v-for="service in filteredServices">
      <ServiceFindListItem v-bind="service"/>
    </template>
  </ServiceFindList>
  <ServiceRequestForm/>
</template>