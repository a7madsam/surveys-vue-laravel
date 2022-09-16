<template>
  <div>
    <div>
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        Register for free
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ " " }}
        <router-link
          :to="{ name: 'login' }"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >login to your account</router-link
        >
      </p>
    </div>
    <form class="mt-8 space-y-6" @submit.prevent="register">
      <input type="hidden" name="remember" value="true" />
      <Alert
        v-if="errors"
        description="Invalid Input"
        :errorList="errors"
        @hide="hide"
      />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="full-name-address" class="sr-only">Full Name</label>
          <input
            id="full-name-address"
            name="full-name"
            type="text"
            autocomplete="name"
            required=""
            class="
              relative
              block
              w-full
              appearance-none
              rounded-none rounded-t-md
              border border-gray-300
              px-3
              py-2
              text-gray-900
              placeholder-gray-500
              focus:z-10
              focus:border-indigo-500
              focus:outline-none
              focus:ring-indigo-500
              sm:text-sm
            "
            placeholder="Full name"
            v-model="user.name"
          />
        </div>
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required=""
            class="
              relative
              block
              w-full
              appearance-none
              rounded-none
              border border-gray-300
              px-3
              py-2
              text-gray-900
              placeholder-gray-500
              focus:z-10
              focus:border-indigo-500
              focus:outline-none
              focus:ring-indigo-500
              sm:text-sm
            "
            placeholder="Email address"
            v-model="user.email"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="
              relative
              block
              w-full
              appearance-none
              rounded-none
              border border-gray-300
              px-3
              py-2
              text-gray-900
              placeholder-gray-500
              focus:z-10
              focus:border-indigo-500
              focus:outline-none
              focus:ring-indigo-500
              sm:text-sm
            "
            placeholder="Password"
            v-model="user.password"
          />
        </div>
        <div>
          <label for="confirm-password" class="sr-only">Confirm Password</label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autocomplete="current-password"
            required=""
            class="
              relative
              block
              w-full
              appearance-none
              rounded-none rounded-b-md
              border border-gray-300
              px-3
              py-2
              text-gray-900
              placeholder-gray-500
              focus:z-10
              focus:border-indigo-500
              focus:outline-none
              focus:ring-indigo-500
              sm:text-sm
            "
            placeholder="Confirm Password"
            v-model="user.password_confirmation"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          class="
            group
            relative
            flex
            w-full
            justify-center
            rounded-md
            border border-transparent
            bg-indigo-600
            py-2
            px-4
            text-sm
            font-medium
            text-white
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
          "
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Sign up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { LockClosedIcon } from "@heroicons/vue/20/solid";
import Alert from "../components/Alert.vue";
export default {
  components: {
    LockClosedIcon,
    Alert,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: null,
    };
  },
  methods: {
    register: function (evt) {
      this.$store
        .dispatch("register", this.user)
        .then((res) => {
          this.$router.push({ name: "dashboard" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    hide: function () {
      this.errors = null;
    },
  },
};
</script>