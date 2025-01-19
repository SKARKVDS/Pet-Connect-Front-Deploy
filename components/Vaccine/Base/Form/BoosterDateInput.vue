<script setup lang="ts">

  const props = defineProps<{initialValue?: number, minDate: Date}>()

  let date = props.initialValue

  if(props.initialValue) {
    if(props.initialValue == 0) {
      console.log(props.initialValue)
      const today = new Date(); // Obtenir la date actuelle
      date = today.getTime();

    }
  }



</script>

<template>
  <UiVeeDatepicker :min-date="minDate" :model-value="Number(date)" label="Booster date" icon="lucide:calendar-clock" name="dateBooster" required/>
</template>

<style scoped>

</style>