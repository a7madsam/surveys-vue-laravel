<template>
  <div>
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-bold">{{ index + 1 }}. {{ ques.question }}</h3>
      <div class="flex items-center">
        <button
          type="button"
          @click="this.$emit('addQuestion', this.index + 1)"
          class="
            flex
            items-center
            text-xs
            py-1
            px-3
            mr-2
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
          Add</button
        ><button
          type="button"
          @click="this.$emit('deleteQuestion', this.question)"
          class="
            flex
            items-center
            text-xs
            py-1
            px-3
            rounded-sm
            border border-transparent
            text-red-500
            hover:border-red-600
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
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Delete
        </button>
      </div>
    </div>
    <div class="grid gap-3 grid-cols-12">
      <div class="mt-3 col-span-9">
        <label
          :for="'question_text_' + ques.question"
          class="block text-sm font-medium text-gray-700"
          >Question Text</label
        ><input
          type="text"
          :name="'question_text_' + ques.question"
          :id="'question_text_' + ques.question"
          v-model="ques.question"
          @change="dataChange"
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
      <div class="mt-3 col-span-3">
        <label
          for="question_type"
          class="block text-sm font-medium text-gray-700"
          >Select Question Type</label
        ><select
          id="question_type"
          name="question_type"
          v-model="ques.type"
          @change="typeChange"
          class="
            mt-1
            block
            w-full
            py-2
            px-3
            border border-gray-300
            bg-white
            rounded-md
            shadow-sm
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm
          "
        >
          <option :key="t" v-for="t in questionTypes" :value="t">
            {{ this.upperCaseFirst(t) }}
          </option>
        </select>
      </div>
      <div class="mt-3 col-span-9">
        <label
          :for="'question_description_' + ques.id"
          class="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          :name="'question_description_' + ques.id"
          :id="'question_description_' + ques.id"
          v-model="ques.description"
          @change="dataChange"
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
    </div>

    <div v-if="shouldHaveOption()" class="mt-2">
      <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
        Options
        <!-- add new option -->
        <button
          type="button"
          @click="addOption()"
          class="
            flex
            items-center
            text-xs
            py-1
            px-2
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
          Add Option
        </button>
      </h4>
      <div
        v-if="!ques.data.options.length"
        class="text-xs text-gray-600 text-center py-3"
      >
        You don't have any options defined
      </div>
      <div
        v-for="(option, index) in ques.data.options"
        :key="option.uuid"
        class="flex items-center mb-1"
      >
        <span class="w-6 text-sm">{{ index + 1 }}. </span>
        <input
          type="text"
          v-model="option.text"
          @change="dataChange"
          class="
            w-full
            rounded-sm
            py-1
            px-2
            text-xs
            border border-gray-300
            focus:border-indigo-500
          "
        />
        <!-- Delete option  -->
        <button
          type="button"
          @click="removeOption(option)"
          class="
            h-6
            w-6
            rounded-full
            flex
            items-center
            justify-center
            border border-transparent
            transition-colors
            hover:border-red-100
            ml-1
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <hr class="my-4" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { v4 as uuidv4 } from "uuid";
export default {
  props: { question: Object, index: Number },
  data() {
    return {
      ques: JSON.parse(JSON.stringify(this.question)),
    };
  },
  computed: {
    ...mapState(["questionTypes"]),
  },
  methods: {
    addOption: function () {
      this.setOptions([...this.getOptions(), { uuid: uuidv4(), text: "" }]);
      this.dataChange();
    },
    removeOption: function (option) {
      let currentOptions = this.getOptions();
      let newOptions = currentOptions.filter((opt) => {
        return opt !== option;
      });
      this.setOptions(newOptions);
      this.dataChange();
    },
    typeChange: function () {
      if (this.shouldHaveOption()) {
        this.setOptions(this.getOptions() || []);
      }
      this.dataChange();
    },
    shouldHaveOption: function () {
      return ["select", "radio", "checkbox"].includes(this.ques.type);
    },
    upperCaseFirst: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    getOptions: function () {
      return this.ques.data.options;
    },
    setOptions: function (options) {
      this.ques.data.options = options;
    },
    dataChange: function () {
      const data = this.ques;
      const temp = data.data.options;
      if (!this.shouldHaveOption()) {
        delete data.data.options;
      }
      this.$emit("change", data);
      this.setOptions(temp);
    },
  },
};
</script>
