<template>
  <header class="flex justify-end">
    <UiButton to="/proposals/create">Add proposal</UiButton>
  </header>
  <section class="flex flex-col gap-4 mt-4">
    <slot/>
  </section>
</template>