<template>
  <div>
    <div
      class="text-white text-center font-bold p-4 rounded mb-4"
      :class="login_alert_varient"
      v-show="login_show_alert"
    >
      {{ login_alert_msg }}
    </div>
    <vee-form :validation-schema="loginSchema" @submit="login">
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
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field
          name="password"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
        />
        <ErrorMessage class="text-red-600" name="password" />
      </div>
      <button
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      >
        Submit
      </button>
    </vee-form>
  </div>
  <!-- Login Form -->
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'LoginForm',
  data() {
    return {
      login_in_submission: false,
      login_show_alert: false,
      login_alert_varient: 'bg-blue-500',
      login_alert_msg: 'Please wait! We are loggin you in',
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:100|'
      }
    }
  },

  methods: {
    ...mapActions(useUserStore, ['autheticate']),
    async login(values) {
      this.login_in_submission = true
      this.login_show_alert = true
      this.login_alert_varient = 'bg-green-500'
      this.login_alert_msg = 'Please wait! We are loggin you in'

      try {
        await this.autheticate(values)
      } catch (error) {
        this.login_in_submission = false
        this.login_alert_varient = 'bg-red-500'
        this.login_alert_msg = 'Invalid Login Details'
        return
      }
      this.login_alert_msg = 'Success! You are now logged in'
      this.login_alert_varient = 'bg-blue-500'
      console.log(values)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped></style>
