<template>
  <div>
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1
          v-if="title"
          class="text-3xl font-bold tracking-tight text-gray-900"
        >
          {{ title }}
        </h1>
        <slot name="header"></slot>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"><slot></slot></div>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style>
</style>