<template>
  <AppHeader />
  <!-- Introduction -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <!-- Player -->
  <player />
  <AppAuth />
</template>

<script>
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/user.js'
import AppAuth from '@/components/AppAuth.vue'
import AppHeader from '@/components/AppHeader.vue'
import Player from '@/components/Player.vue'

import { auth } from './includes/firebase'

export default {
  name: 'App',
  components: { AppHeader, AppAuth, Player },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<style>
.fade-enter-form {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
