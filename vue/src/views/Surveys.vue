<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Surveys</h1>
        <router-link
          :to="{ name: 'SurveyCreate' }"
          class="
            text-white
            bg-blue-700
            hover:bg-blue-800
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            mr-2
            mb-2
            dark:bg-blue-600 dark:hover:bg-blue-700
            focus:outline-none
            dark:focus:ring-blue-800
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 -mt-1 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add new Survey
        </router-link>
      </div>
    </template>
    <MoonLoader v-if="isLoading" class="flex justify-center" />
    <div v-else>
      <div
        class="
          grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]
          gap-5
          justify-center
          mx-[10px]
        "
      >
        <SurveyListItem
          v-for="(survey, index) in surveys.data"
          :key="survey.id"
          :survey="survey"
          class="opacity-0 animate-fade-in-down"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @delete="deleteSurvey"
        />
      </div>
      <Pagination :links="surveys.links" />
    </div>
  </PageComponent>
</template>

<script>
import { mapState } from "vuex";
import PageComponent from "../components/PageComponent.vue";
import Pagination from "../components/Pagination.vue";
import MoonLoader from "../components/MoonLoader.vue";
import SurveyListItem from "../components/SurveyListItem.vue";
export default {
  components: {
    PageComponent,
    MoonLoader,
    SurveyListItem,
    Pagination,
  },
  mounted() {
    this.$store.dispatch("getSurveys").then((res) => {});
  },
  computed: {
    ...mapState({
      surveys: (state) => state.surveys,
      isLoading: (state) => state.surveys.isLoading,
    }),
  },
  methods: {
    deleteSurvey: function (survey) {
      this.$swal({
        titleText: `Are you sure you want to delete this survey?`,
        html: `<div style="color: red">This operation can't be revert!!</div>`,
        icon: "question",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return this.surveys.id;
        },
        backdrop: true,
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch("deleteSurvey", survey.id)
            .then(() => {
              this.$store.dispatch("getSurveys");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
</script>

<style>
</style>