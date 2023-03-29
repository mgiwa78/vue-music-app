<script>
import { mapStores, mapState } from 'pinia'
import useModalStore from '@/stores/modal.js'
import useUserStore from '@/stores/user.js'

export default {
  name: 'AuthHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore)
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
      // console.log(this.modalStore.isOpen)
    },
    signOut() {
      this.userStore.signOut()

      console.log(this.$route)
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        exact-active-class="no-active"
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'Home' }"
      >
        Music
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a @click.prevent="toggleAuthModal" class="px-2 text-white" href="#">
              Login / Register
            </a>
          </li>
          <template v-else>
            <li>
              <router-link to="/about" class="px-2 text-white" o="">About</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Manage' }" class="px-2 text-white">Manage</router-link>
            </li>

            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
