<template>
  <div>
    <div
      class="text-white text-center font-bold p-4 rounded mb-4"
      :class="reg_alert_varient"
      v-show="reg_show_alert"
    >
      {{ reg_alert_msg }}
    </div>
    <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
      <!-- Name -->
      <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <vee-field
          name="name"
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Name"
        />
        <ErrorMessage class="text-red-600" name="name" />
      </div>
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field
          name="email"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
        <ErrorMessage class="text-red-600" name="email" />
      </div>
      <!-- Age -->
      <div class="mb-3">
        <label class="inline-block mb-2">Age</label>
        <vee-field
          name="age"
          type="number"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        />
        <ErrorMessage class="text-red-600" name="age" />
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>

        <vee-field name="password" :bails="false" v-slot="{ field, errors }">
          <input
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"
            v-bind="field"
          />
          <div class="text-red-600" v-for="error in errors" :key="error">
            {{ error }}
          </div>
        </vee-field>
      </div>
      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <vee-field
          name="confirm_password"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Confirm Password"
        />
        <ErrorMessage class="text-red-600" name="confirm_password" />
      </div>
      <!-- Country -->
      <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <vee-field
          as="select"
          name="country"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="USA">USA</option>
          <option value="Mexico">Mexico</option>
          <option value="Germany">Germany</option>
          <option value="Antarctica">Antarctica</option>
        </vee-field>
        <ErrorMessage class="text-red-600" name="country" />
      </div>
      <!-- TOS -->
      <div class="mb-3 pl-6">
        <vee-field
          value="1"
          name="tos"
          type="checkbox"
          class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        />
        <label class="inline-block">Accept terms of service</label>
        <ErrorMessage class="text-red-600" name="tos" />
      </div>
      <button
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
        :disabled="reg_in_submission"
      >
        Submit
      </button>
    </vee-form>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'RegisterForm',
  data() {
    return {
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_varient: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created',
      userData: {
        country: 'USA'
      },
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:100|email',
        age: 'required|minVal:18|maxVal:100|numeric',
        password: 'required|min:9|max:100|excluded:password',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|contry_excluded:Antarctica',
        tos: 'tos'
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, { createUser: 'register' }),

    async register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_varient = 'bg-blue-500'
      this.reg_alert_msg = 'Please wait! Your account is being created.'

      let userCred = null
      try {
        this.createUser(values)
      } catch (error) {
        this.reg_in_submission = false
        this.reg_alert_varient = 'bg-red-500'
        this.reg_alert_msg = 'An unexpected error occured please try again later'
        return
      }
      this.reg_alert_varient = 'bg-green-500'
      this.reg_alert_msg = 'Success! Your account has been created.'

      window.location.reload()
    }
  }
}
</script>

<style></style>
