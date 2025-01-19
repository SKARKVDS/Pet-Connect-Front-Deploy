<template>
  <div class="w-full">
    <UiLabel
        v-if="label"
        :for="inputId"
        :hint="labelHint"
        :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
    ><span>{{ label }} <span v-if="required && !disabled" class="text-destructive">*</span></span></UiLabel
    >
    <div class="relative">
      <slot name="icon">
        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">
          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground/70" />
        </span>
      </slot>
      <slot name="trailingIcon">
        <span
            v-if="hasTrailingIcon"
            class="absolute inset-y-0 right-3 flex items-center justify-center"
        >
          <Icon v-if="trailingIcon" :name="trailingIcon" class="h-4 w-4 text-muted-foreground/70" />
        </span>
      </slot>
      <UiInput
          v-model="inputValue"
          ref="addressInput"
          :required="required"
          :disabled="disabled"
          v-bind="$attrs"
          :class="[hasIcon && 'pl-9', hasTrailingIcon && 'pr-9']"
          :placeholder="placeholder"
          @blur="handleBlur"
      />
      <UiInput
          v-if="!disabled"
          :id="inputId"
          v-model="value"
          type="hidden"
          :required="required"
          :name="name"
      />
    </div>
    <TransitionSlide group tag="div">
      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">
        {{ hint }}
      </p>

      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">
        {{ errorMessage }}
      </p>
    </TransitionSlide>
  </div>
</template>

<script lang="ts" setup>

import {Loader} from "@googlemaps/js-api-loader";

const props = defineProps<{
  label?: string;
  labelHint?: string;
  icon?: string;
  trailingIcon?: string;
  hint?: string;
  disabled?: boolean;
  modelValue?: AddressValue;
  name?: string;
  id?: string;
  rules?: any;
  validateOnMount?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
}>();

defineOptions({ inheritAttrs: false });

const inputId = props.id || useId();

const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));
const hasTrailingIcon = computed(
    () => Boolean(props.trailingIcon) || Boolean(useSlots().trailingIcon)
);

const { errorMessage, value, handleBlur, setValue } = useField(() => props.name || inputId, props.rules, {
  initialValue: props.modelValue,
  label: props.label,
  validateOnMount: props.validateOnMount,
  syncVModel: true,
});

const { disabled } = toRefs(props)
watch(disabled, (_disabled) => {
  if (_disabled) {
    inputValue.value = ''
  }
})

const inputValue = ref()
watch(inputValue, (_inputValue) => {
  if (!_inputValue.length) {
    setValue(undefined)
  }
})

type AddressValue = {
  lat: number;
  lng: number;
  streetNumber: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}

const input = useTemplateRef('addressInput')

onMounted(async () => {
  const loader = new Loader({
    apiKey: 'AIzaSyARNOTZTNDiMLmFR-bZiPB8kFbQsKWYUlU', // Remplacez par votre clé API
    libraries: ['places'],  // Ajoutez des bibliothèques si nécessaire
  });

  const center = {lat: 34.082298, lng: -82.284777};
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  const Places = await loader.importLibrary('places');
  const options = {
    bounds: defaultBounds,
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
  };
  const autocomplete = new Places.Autocomplete(input.value?.input, options);

  console.log('autocomplete', autocomplete);

// Écoutez la sélection d'un lieu
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    const addressComponents = place.address_components;
    const address: AddressValue = {}

    address.lat = place.geometry.location.lat();
    address.lng = place.geometry.location.lng()
    addressComponents.forEach(component => {
      const types = component.types;
      if (types.includes('street_number')) {
        address.streetNumber = component.long_name; // Numéro de rue seul
      } else if (types.includes('route')) {
        address.streetName = component.long_name;   // Nom de la rue seul
      } else if (types.includes('locality')) {
        address.city = component.long_name;
      } else if (types.includes('country')) {
        address.country = component.long_name;
      } else if (types.includes('postal_code')) {
        address.postalCode = component.long_name;
      }
    });

    setValue(address, true)
  });
})
</script>
