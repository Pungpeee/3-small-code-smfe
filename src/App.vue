<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
<!-- <template>
  <div id="view">
    <router-view/>
  </div>
</template> -->

<template>
  <div id="nav" v-if="$store.state.user">
    <!-- <router-link to="/">Home</router-link> -->
    <!-- <router-link to="/todo">todo</router-link> -->
    <!-- <button @click="$store.dispatch('logout')">Logout</button> -->
  </div> 
  <router-view/>
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
<style >

</style>