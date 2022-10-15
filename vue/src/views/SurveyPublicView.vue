<template>
  <div class="m-5">
    <MoonLoader v-if="isLoading" class="flex justify-center" />
    <form @submit.prevent="submitSurvey" class="container mx-auto" v-else>
      <div class="flex gap-5 flex-wrap">
        <img
          :src="survey.image_url"
          :alt="survey.title"
          class="sm:w-64 h-84 object-cover rounded-md w-full"
        />
        <div class="flex flex-col gap-2 items-start">
          <h1 class="mt-4 text-lg font-bold">{{ survey.title }}</h1>
          <div v-html="survey.description" class="overflow-hidden flex-1"></div>
        </div>
      </div>
      <hr class="my-3" />
      <div
        v-if="surveyFinished"
        class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto"
      >
        <div class="text-xl mb-3 font-semibold">
          Thank you for participation in this survey
        </div>
        <button
          @click="submitAnotherResponse"
          type="button"
          class="
            inline-flex
            justify-center
            py-2
            px-4
            border border-transparent
            shadow-sm
            text-sm
            font-medium
            rounded-md
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
        >
          Submit another response
        </button>
      </div>
      <div v-else class="flex flex-col gap-2 mb-5">
        <QuestionViewer
          v-for="(question, index) of survey.questions"
          :key="question.id"
          v-model="answers[question.id]"
          :question="question"
          :index="index"
        />
      </div>
      <button
        type="submit"
        class="
          inline-flex
          justify-center
          py-2
          px-4
          border border-transparent
          shadow-sm
          text-sm
          font-medium
          rounded-md
          text-white
          bg-indigo-600
          hover:bg-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import QuestionViewer from "../components/viewer/QuestionViewer.vue";
import MoonLoader from "../components/MoonLoader.vue";

export default {
  components: {
    QuestionViewer,
    MoonLoader,
  },
  data() {
    return {
      surveyFinished: false,
      answers: {},
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.currentSurvey.isLoading,
      survey: (state) => state.currentSurvey.data,
    }),
  },
  mounted() {
    this.$store.dispatch("getSurveyBySlug", this.$route.params.slug);
  },
  methods: {
    submitSurvey: function () {
      for (let ans in this.answers) {
        this.answers[ans].length === 0 ? delete this.answers[ans] : "";
      }
      this.$store
        .dispatch("saveSurveyAnswers", {
          surveyId: this.survey.id,
          answers: this.answers,
        })
        .then((res) => {
          if (res.status === 201) {
            this.surveyFinished = true;
          }
        });
    },
    submitAnotherResponse: function () {
      this.surveyFinished = false;
      this.answers = {};
    },
  },
};
</script>

<style>
</style>