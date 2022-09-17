<template>
  <div>
    <PageComponent>
      <template v-slot:header>
        <h1
          class="text-3xl font-bold tracking-tight text-gray-900"
          :name="name"
        >
          Dashboard
        </h1>
      </template>
    </PageComponent>
  </div>
</template>

<script>
import PageComponent from "../components/PageComponent.vue";
export default {
  components: {
    PageComponent,
  },
};
</script>

<style>
</style>