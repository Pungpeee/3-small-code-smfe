<template>
  <div class="relative md:block lg:flex min-h-screen">
    <!-- <div class="bg-gray-900 text-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 md:relative md:-translate-x-0 transform -translate-x-full  transition duration-200 ease-in-out" -->
    <div class="bg-gray-900 text-white lg:w-64 space-y-6 px-2 py-4 inset-y-0 left-0 relative"
      :class="{ 'block': showFullNavbarFlag, 'hidden': !showFullNavbarFlag }">
      <a href="/" @click="homehelper = null" class="flex items-center space-x-2 px-4">
        <img alt="content" class="h-12 w-12" src="@/assets/Iot/watering.png">
        <span class="text-xl font-extrabold text-white">IoT Smart Farming</span>
      </a>
      <nav>
        <div v-if="$store.state.user">
          <a
            class="group flex items-center space-x-2 py-3 px-4 text-white hover:bg-white hover:bg-opacity-90  hover:text-gray-900 transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span class=" text-white  group-hover:text-gray-900 text-lg ">
              <router-link to="/">DASHBOARD</router-link>
            </span>
          </a>

          <a
            class="group flex items-center space-x-2 py-3 px-4 text-white hover:bg-white hover:bg-opacity-90  hover:text-gray-900 transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span class=" text-white  group-hover:text-gray-900 text-lg ">
              <router-link to="/todo">TO-DO LIST</router-link>
            </span>
          </a>
        </div>
        <a
          class="group flex items-center space-x-2 py-3 px-4 text-white hover:bg-white hover:bg-opacity-90  hover:text-gray-900 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class=" text-white  group-hover:text-gray-900 text-lg ">
            <router-link to="/about">ABOUT</router-link>
          </span>
        </a>
        <a
          class="group flex items-center space-x-2 py-3 px-4 text-white hover:bg-white hover:bg-opacity-90  hover:text-gray-900 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class=" text-white  group-hover:text-gray-900 text-lg">
            <router-link to="/team">TEAM</router-link>
          </span>
        </a>

        <!-- <a
          class="group flex items-center space-x-2 py-3 px-4 text-white hover:bg-white hover:bg-opacity-90  hover:text-gray-900 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span class=" text-white  group-hover:text-gray-900 text-lg">
            <router-link to="/login">LOGIN</router-link>
          </span>
        </a>
        <a
          class="group flex items-center space-x-2 py-3 px-4 text-white hover:bg-white hover:bg-opacity-90  hover:text-gray-900 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class=" text-white  group-hover:text-gray-900 text-lg">
            <router-link to="/register">REGISTER</router-link>
          </span>
        </a> -->

        <!-- Logout -->
        <!-- <div id="nav" v-if="$store.state.user">
          <button @click="$store.dispatch('logout')">Logout</button>
        </div> -->
        <!-- <a
          class="group flex items-center space-x-2 py-3 px-4 text-white hover:bg-white hover:bg-opacity-90  hover:text-gray-900 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class=" text-white  group-hover:text-gray-900 text-lg">
            <router-link to="/profile">TEST PROFILE</router-link>
          </span>
        </a> -->
        <div v-if="$store.state.user">
          <a
            class="group flex items-center space-x-2 py-3 px-4 text-white hover:bg-white hover:bg-opacity-90  hover:text-gray-900 transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class=" text-white  group-hover:text-gray-900 text-lg">
              <router-link to="/editprofile">PROFILE</router-link>
            </span>
            
          </a>
        </div>
      </nav>
    </div>
    <div class="flex-1 bg-white">
      <div class=" flex justify-between  bg-white shadow px-2 py-4">
        <div class=" ">
          <button @click="showFullNavbarFlag = !showFullNavbarFlag" class="pt-4 text-gray-900 font-extrabold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div class="flex justify-between ">

          <div class="pr-10" id="nav" v-if="$store.state.user">
            <a
              class="group flex items-center space-x-2 py-3 px-4 text-black hover:bg-white hover:bg-opacity-90  hover:text-blue-500 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class=" text-black  group-hover:text-blue-500 text-lg">
                <button @click="$store.dispatch('logout')">LOGOUT</button>
              </span>
            </a>
          </div>
          <div class="flex justify-end" v-else>
            <div class=" pr-2">
              <a
                class="group flex items-center space-x-2 py-3 px-4 text-black hover:bg-white hover:bg-opacity-90  hover:text-blue-500 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span class=" text-black  group-hover:text-blue-500 text-lg">
                  <router-link to="/login">LOGIN</router-link>
                </span>
              </a>
            </div>
            <div class="pr-24">
              <a
                class="group flex items-center space-x-2 py-3 px-4 text-black hover:bg-white hover:bg-opacity-90   hover:text-blue-500 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class=" text-black  group-hover:text-blue-500 text-lg">
                  <router-link to="/register">REGISTER</router-link>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-100 bg-opacity-30">
        <!-- component -->
        <component :is="child_component"></component>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

// import teammember from "../components/teammember.vue";
// import HelloWorld from "./HelloWorld.vue";
import homehelper from "../components/homehelper.vue"
import teammember from "../components/teammember.vue";
import aboutiot from "../components/aboutiot.vue";
import dashboard from "../components/dashboard.vue";
import todolist from "../components/todolist.vue";
import loginpage from "../components/loginpage.vue";
import registerpage from "../components/registerpage.vue";
import resetpassword from "../components/resetpassword.vue";
import myprofile from "../components/myprofile.vue";
import editprofilepage from "../components/editprofilepage.vue";

export default {
  components: {
    homehelper,
    teammember,
    aboutiot,
    dashboard,
    todolist,
    loginpage,
    registerpage,
    resetpassword,
    myprofile,
    editprofilepage
  },
  props: [
    'child_component'
  ],
  setup() {
    const showFullNavbarFlags = ref(false);
    return {
      showFullNavbarFlags,
    }
  },
  data() {
    return {
      showFullNavbarFlag: true
    };
  },
  methods: {
    handle_collapse() {
      this.showFullNavbarFlag = !this.showFullNavbarFlag;
    }
  }

};
</script>
