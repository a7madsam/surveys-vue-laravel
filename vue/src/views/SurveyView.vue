<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ model.id ? model.title : "Create Survey" }}
        </h1>
      </div>
    </template>
    <form class="animate-fade-in-down" @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <!-- Survey Field -->
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <label
              v-if="!model.image"
              class="block ml-2 text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image"
                :src="model.image"
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
              type="text"
              v-model="model.title"
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
import { v4 as uuidv4 } from "uuid";
export default {
  components: {
    PageComponent,
    QuestionEditor,
  },
  data() {
    return {
      model: {
        title: "",
        status: false,
        description: null,
        image: null,
        expire_date: null,
        questions: [],
      },
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.model = this.$store.state.surveys.find((survey) => {
        return survey.id === parseInt(this.$route.params.id);
      });
    }
  },
  methods: {
    saveSurvey: function () {},
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
      console.log(e);
    },
    questionChange: function (question) {
      this.model.questions = this.model.questions.map((ques) => {
        if (question.id === ques.id) {
          return JSON.parse(JSON.stringify(question));
        }
        return ques;
      });
    },
  },
};
</script>

<style>
</style>