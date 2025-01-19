<script lang="ts" setup>

import Autoplay from "embla-carousel-autoplay";

const plugin = Autoplay({
  delay: 10000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});

</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <UiCarousel
        class="relative w-10/12 xl:w-11/12"
        :plugins="[plugin]"
        @mouseenter="plugin.stop"
        @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')]"
    >
      <UiCarouselContent>
        <slot/>
      </UiCarouselContent>
      <UiCarouselPrevious/>
      <UiCarouselNext/>
    </UiCarousel>
  </div>
</template>