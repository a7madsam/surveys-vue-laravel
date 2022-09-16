<template>
  <div>
    <div
      class="
        relative
        flex
        p-4
        mb-4
        text-sm text-red-700
        bg-red-100
        rounded-lg
        dark:bg-red-200 dark:text-red-800
      "
      role="alert"
    >
      <svg
        aria-hidden="true"
        class="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Danger</span>
      <div>
        <span class="font-medium">{{ description }}</span>
        <ul
          class="mt-1.5 ml-4 text-red-700 list-disc list-inside"
          :key="item"
          v-for="item in errorList"
        >
          <li :key="it" v-for="it in item">
            {{ it }}
          </li>
        </ul>
      </div>
      <span
        @click="this.hide"
        class="cursor-pointer absolute right-[16px] top-[12px]"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["description", "errorList"],
  methods: {
    hide: function () {
      this.$emit("hide");
    },
  },
};
</script>

<style>
</style>