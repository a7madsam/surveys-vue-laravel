<template>
  <div
    class="
      flex
      items-center
      justify-center
      border-t border-gray-200
      bg-white
      px-4
      py-3
      mt-5
      sm:px-6
    "
  >
    <nav
      class="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <a
        v-for="(link, i) of links"
        :key="i"
        :disabled="!link.url"
        href="#"
        aria-current="page"
        :class="[
          link.active
            ? 'z-10 bg-indigo-50 border border-indigo-500 text-indigo-600'
            : 'bg-white border border-gray-300 text-gray-500 hover:bg-gray-50',
          i === 0 ? 'rounded-l-md' : '',
          i === links.length - 1 ? 'rounded-r-md' : '',
        ]"
        class="
          relative
          inline-flex
          items-center
          border
          px-4
          py-2
          text-sm
          font-medium
          focus:z-20
        "
        @click.prevent="getForPage(link)"
        v-html="link.label"
      ></a>
    </nav>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

export default {
  props: ["links"],
  components: { ChevronLeftIcon, ChevronRightIcon },
  methods: {
    getForPage: function (link) {
      if (!link.url || link.active) {
        return;
      }
      this.$store.dispatch("getSurveys", { url: link.url });
    },
  },
};
</script>

<style>
</style>