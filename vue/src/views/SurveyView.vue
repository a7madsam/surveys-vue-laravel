<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ this.$route.params.id ? model.title : "Create Survey" }}
        </h1>
        <div
          class="flex justify-between items-center"
          v-if="this.$route.params.id"
        >
          <button
            type="button"
            class="
              focus:outline-none
              text-white
              bg-red-700
              hover:bg-red-800
              focus:ring-4 focus:ring-red-300
              font-medium
              rounded-lg
              text-sm
              px-5
              py-2.5
              mr-2
              mb-2
              dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900
            "
            @click="deleteSurvey"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 -mt-1 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Delete Survey
          </button>
        </div>
      </div>
    </template>
    <MoonLoader v-if="isLoading" class="flex justify-center" />
    <form class="animate-fade-in-down" @submit.prevent="saveSurvey" v-else>
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <!-- Survey Field -->
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <label
              v-if="!model.image_url"
              class="block ml-2 text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image_url"
                :src="model.image_url"
                :alt="model.title"
                class="w-64 h-84 object-cover"
              />
              <span
                v-else
                class="
                  flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-full
                  overflow-hidden
                  bg-gray-100
                "
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-[80%] w-[80%] text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  ></path></svg></span
              ><button
                type="button"
                class="
                  relative
                  overflow-hidden
                  ml-5
                  bg-white
                  py-2
                  px-3
                  border border-gray-300
                  rounded-md
                  shadow-sm
                  text-sm
                  leading-4
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
              >
                <input
                  type="file"
                  @change="setImage"
                  accept="image/png, image/gif, image/jpeg"
                  class="
                    absolute
                    left-0
                    top-0
                    right-0
                    bottom-0
                    opacity-0
                    cursor-pointer
                  "
                />
                Change
              </button>
            </div>
          </div>
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700"
              >Title</label
            ><input
              required
              type="text"
              v-model.trim="model.title"
              name="title"
              id="title"
              autocomplete="survey_title"
              class="
                mt-1
                focus:ring-indigo-500 focus:border-indigo-500
                block
                w-full
                shadow-sm
                sm:text-sm
                border-gray-300
                rounded-md
              "
            />
          </div>
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <textarea
                id="description"
                name="description"
                v-model="model.description"
                rows="3"
                autocomplete="survey_description"
                class="
                  shadow-sm
                  focus:ring-indigo-500 focus:border-indigo-500
                  mt-1
                  block
                  w-full
                  sm:text-sm
                  border border-gray-300
                  rounded-md
                "
                placeholder="Describe your survey"
              ></textarea>
            </div>
          </div>
          <div>
            <label
              for="expire_date"
              class="block text-sm font-medium text-gray-700"
              >Expire Date</label
            ><input
              type="date"
              name="expire_date"
              id="expire_date"
              v-model="model.expire_date"
              class="
                mt-1
                focus:ring-indigo-500 focus:border-indigo-500
                block
                w-full
                shadow-sm
                sm:text-sm
                border-gray-300
                rounded-md
              "
            />
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="status"
                name="status"
                type="checkbox"
                v-model="model.status"
                class="
                  focus:ring-indigo-500
                  h-4
                  w-4
                  text-indigo-600
                  border-gray-300
                  rounded
                "
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700"
                >Active</label
              >
            </div>
          </div>
        </div>
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <h3 class="text-2xl font-semibold flex items-center justify-between">
            Questions
            <button
              type="button"
              @click="addQuestion()"
              class="
                flex
                items-center
                text-sm
                py-1
                px-4
                rounded-sm
                text-white
                bg-gray-600
                hover:bg-gray-700
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Add Question
            </button>
          </h3>

          <div v-if="!model.questions.length" class="text-center text-gray-600">
            You don't have any questions created
          </div>
          <div v-for="(question, index) in model.questions" :key="question.id">
            <QuestionEditor
              :question="question"
              :index="index"
              @change="questionChange"
              @addQuestion="addQuestion"
              @deleteQuestion="deleteQuestion"
            />
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
            Save
          </button>
        </div>
      </div>
    </form>
  </PageComponent>
</template>

<script>
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";
import MoonLoader from "../components/MoonLoader.vue";

import { v4 as uuidv4 } from "uuid";
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  components: {
    PageComponent,
    QuestionEditor,
    MoonLoader,
  },
  data() {
    return {
      model: {
        title: "",
        status: false,
        description: null,
        image: null,
        image_url: null,
        expire_date: null,
        questions: [],
      },
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.currentSurvey.isLoading,
    }),
  },
  mounted() {
    if (this.$route.params.id) {
      this.$store.dispatch("getSurvey", this.$route.params.id);
    }
  },
  watch: {
    "$store.state.currentSurvey.data": function (newVal, oldVal) {
      this.model = {
        ...JSON.parse(JSON.stringify(newVal)),
        status: newVal.status !== "draft",
      };
    },
  },
  methods: {
    /**
     * Create OR Update survey
     */
    saveSurvey: function () {
      this.$store
        .dispatch("saveSurvey", this.model)
        .then(({ data }) => {
          this.$router.push({
            name: "SurveyView",
            params: {
              id: data.data.id,
            },
          });
        })
        .catch((e) => {
          let errString = "";
          for (const item in e.response.data.errors) {
            errString += `<li>${e.response.data.errors[item][0]}</li>`;
          }
          Swal.fire({
            title: `Error`,
            html: `<ul>${errString}</ul>`,
            icon: "error",
            backdrop: true,
            allowOutsideClick: () => !this.$swal.isLoading(),
          }).then(() => {
            this.$store.dispatch("getSurvey", this.$route.params.id);
          });
        });
    },
    addQuestion: function (index) {
      const newQuestion = {
        id: uuidv4(),
        type: "text",
        question: "",
        description: null,
        data: {
          options: [],
        },
      };
      this.model.questions.splice(
        index || this.model.questions.length,
        0,
        newQuestion
      );
    },
    deleteQuestion: function (question) {
      this.model.questions = this.model.questions.filter((ques) => {
        return ques !== question;
      });
    },
    setImage: function (e) {
      const imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.model.image = reader.result;
        this.model.image_url = reader.result;
      };
      reader.readAsDataURL(imgFile);
    },
    questionChange: function (question) {
      this.model.questions = this.model.questions.map((ques) => {
        if (question.id === ques.id) {
          return JSON.parse(JSON.stringify(question));
        }
        return ques;
      });
    },
    deleteSurvey: function () {
      Swal.fire({
        titleText: `Are you sure you want to delete this survey?`,
        html: `<div style="color: red">This operation can't be revert!!</div>`,
        icon: "question",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        backdrop: true,
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch("deleteSurvey", this.model.id)
            .then(() => {
              this.$router.push({
                name: "surveys",
              });
            })
            .catch((err) => {
              let errString = "";
              for (const item in err.response.data.errors) {
                errString += `<li>${
                  e.response.data.errors[item][0] || ""
                }</li>`;
              }
              Swal.fire({
                title: `Server Error`,
                html: `<ul>${errString}</ul>`,
                icon: "error",
                backdrop: true,
                allowOutsideClick: () => !this.$swal.isLoading(),
              }).then(() => {
                this.$store.dispatch("getSurvey", this.$route.params.id);
              });
            });
        }
      });
    },
  },
};
</script>

<style>
</style>