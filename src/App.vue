<template>
  <div id="nav" v-if="$store.state.user">
    <!-- Uncomment below if navigation links are needed -->
    <!-- <router-link to="/">Home</router-link> -->
    <!-- <router-link to="/todo">Todo</router-link> -->
    <!-- <button @click="$store.dispatch('logout')">Logout</button> -->
  </div>
  <router-view />
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  }
}
</script>

<style>
/* Add custom styles here */
</style>
