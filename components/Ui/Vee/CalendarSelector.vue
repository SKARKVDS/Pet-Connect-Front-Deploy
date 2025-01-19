<script lang="ts">

export type UiVeeCalendarSelector = {
  label?: string;
  labelHint?: string;
  icon?: string;
  trailingIcon?: string;
  hint?: string;
  disabled?: boolean;
  modelValue?: CalendarValue
  minDate?: Date,
  name?: string;
  id?: string;
  rules?: any;
  validateOnMount?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export type CalendarValue = DayValue[]

export type DayValue = {
  dateTime: number;
  requestCount: number;
}

</script>

<script lang="ts" setup>

import {useScreens} from "vue-screen-utils";
import {addDays, startOfDay, startOfToday, startOfTomorrow, startOfYesterday} from "date-fns";

const props = withDefaults(defineProps<UiVeeCalendarSelector>(), {
  modelValue: () => []
});

const {modelValue} = toRefs(props)

const {mapCurrent} = useScreens({xs: '0px', sm: '640px', md: '768px', lg: '1024px'});
const columns = mapCurrent({lg: 2}, 1);

defineOptions({inheritAttrs: false});

const inputId = props.id || useId();

const {value} = useField(() => props.name || inputId, props.rules, {
  initialValue: modelValue.value,
  validateOnMount: props.validateOnMount,
  syncVModel: true,
});

const onClick = (timestamp: number) => {
  if (isNotEditable(timestamp))
    return

  if (isHighlighted(timestamp)) {
    deleteDay(timestamp)
  } else {
    addDay(timestamp)
  }
}

const deleteDay = (timestamp: number) => {
  const index = value.value.findIndex(day => day.dateTime === timestamp)
  value.value.splice(index, 1)
}

const addDay = (timestamp: number) => {
  value.value.push({dateTime: timestamp, requestCount: 0})
}

const isNotEditable = (timestamp: number) => (props.minDate && timestamp < props.minDate?.getTime()) || nonEditableDay.value.some(day => day.dateTime === timestamp)
const isHighlighted = (timestamp: number) => value.value.some(day => day.dateTime === timestamp)

const nonEditableDay = computed(() => modelValue.value.filter(day => day.requestCount))
const attributes = computed(() => [
  {
    highlight: {
      color: 'blue',
      fillMode: 'outline',
    },
    dates: startOfToday(),
  },
  {
    highlight: 'green',
    dates: toDaySequences(value.value),
  },
  {
    bar: 'orange',
    dates: toDaySequences(nonEditableDay.value),
  }
])

const toDaySequences = (days: CalendarValue) => {
  if (!days || !days.length)
    return []

  days.sort((a, b) => a.dateTime - b.dateTime)
  const sequences = [];
  let currentSequence = [days[0].dateTime];

  for (let i = 1; i < days.length; i++) {
    const previousDate = days[i - 1].dateTime;
    const currentDate = days[i].dateTime;

    if (addDays(new Date(previousDate), 1).getTime() === new Date(currentDate).getTime()) {
      currentSequence[1] = days[i].dateTime;
    } else {
      sequences.push(currentSequence.length > 1 ? currentSequence : currentSequence[0]);
      currentSequence = [days[i].dateTime];
    }
  }

  sequences.push(currentSequence.length > 1 ? currentSequence : currentSequence[0]);
  return sequences;
}

</script>


<template>
  <div class="p-2 bg-muted rounded-xl">
    <UiCalendar
        :columns="columns"
        :attributes="attributes"
        :min-date="minDate"
        @dayclick="dateObject => onClick(startOfDay(dateObject.date).getTime())"
        expanded
    />
  </div>
  <UiInput
      :id="inputId"
      v-model="value"
      type="hidden"
      :required="required"
      :name="name"
  />
</template>

