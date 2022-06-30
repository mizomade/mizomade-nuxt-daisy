<template>
  <div class="container z-10">
    <!-- sidebar -->
    <transition name="side">
      <div
        v-if="sideon"
        class="fixed z-20 h-screen w-full flex flex-row -top-1 sideon"
      >
        <div class="bg-white w-2/3 h-screen border">
          <span class="flex flex-row my-2 py-6">
            <img
              src="../assets/m.svg"
              alt="mizomade logo"
              class="h-6 w-6 mr-3 ml-4"
            />
            <h2 class="font-semibold text-xl text-center">MizoMade.com</h2>
          </span>

          <hr class="border-1 border-grey-100 mb-8" />
          <ul
            v-for="categories in currentStates.categoriesList"
            :key="categories.id"
            class="ml-6 flex flex-col justify-start items-start space-y-10 text-gray-800 font-medium"
          >
            <li>
              <nuxt-link
                @click="sideon = false"
                :to="{
                  name: 'category-category',
                  params: { category: categories.name },
                }"
                class="font-semibold text-lg"
              >
                {{ categories.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <!-- close -->
        <div
          class="absolute left-2/3 top-1/4 z-30 -mx-2"
          @click="sideon = false"
        >
          <div class="flex flex-row bg-white p-2 border-t border-r rounded-md">
            <p></p>
            <svg
              class="text-gray-900 fill-current rounded-full bg-white"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 12 12"
            >
              <line
                x1="1"
                y1="11"
                x2="11"
                y2="1"
                stroke="black"
                stroke-width="2"
              />
              <line
                x1="1"
                y1="1"
                x2="11"
                y2="11"
                stroke="black"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
        <!-- blurred -->
        <div
          class="w-1/3 bg-white bg-opacity-40 border-b border-gray-200 h-full backdrop-filter backdrop-blur-sm"
          @click="sideon = false"
        ></div>
      </div>
    </transition>
    <!-- --------------------- -->

    <!-- navbar -->
    <nav class="fixed top-0 z-10 bg-white shadow-sm w-full">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
          <div class="md:hidden flex items-center">
            <button
              class="outline-none mobile-menu-button"
              @click="sideon = !sideon"
            >
              <svg
                class="w-6 h-6 text-gray-800 hover:text-indigo-500"
                x-show="!showMenu"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h10"></path>
              </svg>
            </button>
          </div>

          <div class="flex space-x-7">
            <div>
              <nuxt-link to="/" class="flex items-center py-4 px-2">
                <span class="flex flex-row">
                  <img
                    src="../assets/m.svg"
                    alt="Logo"
                    class="h-6 w-6 mr-3 hidden md:block lg:block"
                  />
                  <span class="font-semibold text-gray-900 text-lg self-end"
                    >MizoMade.com</span
                  >
                </span>
              </nuxt-link>
            </div>
            <!-- test -->
            <div class="flex flex-row items-center space-x-2">
              <!-- for mobile -->
              <router-link :to="{ name: 'search-searchPage' }">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  class="w-6 h-6 lg:hidden"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </router-link>
              <!-- eof -->
              <!-- for desktop -->

              <input
                type="text"
                placeholder="Search…"
                v-model="query"
                @keyup.enter="search"
                class="border rounded-md pl-4 w-44 h-10 hidden md:flex"
              />
            </div>

            <!-- ...... -->
            <!-- desktop view -->
            <div
              class="hidden md:flex flex-row flex-wrap items-center space-x-1"
            >
              <!-- {{currentStates.categoriesList}} -->

              <span
                v-for="categories in currentStates.categoriesList"
                :key="categories.id"
              >
                <!-- {{categories}} -->
                <nuxt-link
                  :to="{
                    name: 'category-category',
                    params: { category: categories.name },
                  }"
                  class="py-4 px-2 text-gray-500 font-medium hover:text-purple-900 transition duration-300"
                >
                  {{ categories.name }}
                </nuxt-link>
              </span>
            </div>
          </div>

          <div class="flex items-center space-x-2 ml-3">
            <div
              v-if="store.isLoggedIn"
              class="flex items-center space-x-3 ml-3"
            >
              <nuxt-link :to="{ name: 'post-Create' }">
                <button class="bg-gray-100 text-gray-800 px-1 py-1 rounded-md">
                  Create
                </button>
              </nuxt-link>

              <div class="dropdown dropdown-end">
                <img
                  tabindex="0"
                  v-if="store.isLoggedIn"
                  :src="store.userInfos.profilephoto"
                  alt=""
                  srcset=""
                  width="100"
                  height="100"
                  class="rounded-full object-cover min-w-10 w-8 h-8 cursor-pointer"
                  style="min-width: 2rem"
                />

                <!-- <label tabindex="0" class="btn m-1">Click</label> -->
                <ul
                  tabindex="0"
                  class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <nuxt-link :to="{ name: 'accounts-Profile' }">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ name: 'accounts-Saved' }">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      Saved
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                        /></svg
                      >Dashboard
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </nuxt-link>
                  </li>
                  <li>
                    <a href="/" @click.prevent="store.attemptLogout">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </a>
                  </li>

                  <!-- <li><a>Profile</a></li> -->
                  <!-- <li><a>Item 2</a></li> -->
                </ul>
              </div>
            </div>

            <!-- <a href="" class="py-2 px-2 font-medium text-white bg-purple-700 rounded hover:bg-green-400 transition duration-300">Post</a> -->

            <nuxt-link v-else :to="{ name: 'accounts-Login' }">
              <button class="bg-green-500 text-white px-2 py-1 rounded-md">
                Login
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { accountStore } from "../store/accounts";
import { currentActivities } from "../store/currentActs";
export default {
  setup() {
    const store = accountStore();
    const currentStates = currentActivities();
    return {
      store,
      currentStates,
    };
  },
  data() {
    return {
      query: "",
      open: false,
      active: false,
      sideon: false,
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: "search-query",
        params: { query: this.query },
      });
    },
  },
  //   beforeMount(){
  //       window.addEventListener('wheel',this.handlescroll)
  //   },
  //   beforeDestroy(){
  //       window.removeEventListener('wheel',this.handlescroll)
  //   },
};
</script>

<style scoped>
.stick {
  position: fixed;
  top: 0;
  width: 100%;
}

/* .side-enter-active,.side-enter-leave{
    transition: opacity 1s;
} */

/* .side-enter-active, .side-leave-active{
    
    transform: translateX(10%);
    transition-duration: 1s;
} */

.side-enter,
.side-leave {
  /* width: 110vw; */
  transform: translateX(-5%);
}
.side-enter-active {
  transition: all 0.1s ease-in;
}
</style>
