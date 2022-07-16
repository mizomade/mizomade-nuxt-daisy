<template>
  <transition name="search" mode="out-in">
    <div class="-mt-0 pl-4 overflow-x-hidden w-full h-screen">
      <!-- back button and arrow -->
      <div @click="back" class="flex flex-row items-center space-x-1 mt-2">
        <!-- <button class=" ml-3 p-1 mt-4  border border-gray-300 text-gray-600 rounded-md  " @click="back"> Back</button> -->
        <svg
          height="48"
          viewBox="0 0 48 48"
          class="h-7 -ml-2"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h48v48h-48z" fill="none" />
          <path
            d="M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z"
          />
        </svg>
        <!-- <span class="text-3xl font-semibold ">Search</span> -->
        <h6 class="">Back</h6>
      </div>
      <!-- searchbox -->
      <div class="pt-2 text-gray-600 flex flex-row">
        <input
          class="border border-gray-300 bg-white h-10 px-5 w-10/12 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          v-model="searchQuery"
          placeholder="Search"
          autofocus
          @keyup.enter="search"
        />
        <button
          type="submit"
          @click.prevent="search"
          class="px-2 ml-1 border border-gray-400 rounded-md"
        >
          <svg
            class="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style="enable-background: new 0 0 56.966 56.966"
            xml:space="preserve"
            width="512px"
            height="512px"
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        </button>
      </div>
      <!-- SEARCH Results -->
      <div class="container mx-1 mt-2">
        <div v-if="loading"><h2>Searching ...</h2></div>
        <div v-else>
          <hr />
          <!-- postlist -->
          <h3 v-if="searchResults[0]" class="my-2"> Search Results </h3>

          <div v-for="search in searchResults[0]" :key="search.id" class="mt-1">
            <nuxt-link
              v-if="search.slug"
              :to="{ name: 'mizo-slug', params: { slug: search.slug } }"
            >
              <inline-card
                :title="search.title"
                :coverimage="search.coverimage"
                :date="search.date"
                :author="search.author"
              ></inline-card>
            </nuxt-link>
          </div>
          <!-- userlist -->
          <!-- <h3 v-if="searchResults[1]" class="my-2">User Search Results </h3> -->
          
           <div v-for="search in searchResults[1]" :key="search.id" class="mt-1">
           <nuxt-link
            :to="{ name: 'user-user', params: { user: search.username } }"
          >
              <user-component
              :username="search.username"
              :firstname="search.firstname"
              :lastname="search.lastname"
              :authorimage="search.profilephoto"

              >

              </user-component>
            </nuxt-link>
          </div>


        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import { API_URL } from '../../API'
// import InlineCard from './../../components/InlineCard.vue'
import InlineCard from '../../components/InlineCard.vue'
import UserComponent from '../../components/UserComponent.vue'


export default {
  layout: 'search',
  transition: 'search',
   head(){
    return{
      title: "Search"
    }
  },

  setup() {
    const searchQuery = ''
    const loading = false
    const searchResults = []
    return {
      searchQuery,
      loading,
      searchResults,
    }
  },
  methods: {
    back() {
      // $router.pop()
      console.log(this.$nuxt.$router.back())
    },
    search() {
      this.loading = true
      console.log('QUERY', this.searchQuery)
      const form = new FormData()
      form.append('q', this.searchQuery)
      const data = JSON.stringify({
        q: this.searchQuery,
      })
      axios
        .post(API_URL + '/api/searching/', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res.data)
          this.searchResults = res.data
          this.loading = false
        })
        .catch((er) => {
          console.log(er)
        })
    },
  },
  components: { InlineCard , UserComponent },
}
</script>

<style>
.search-enter-active,
.search-leave-active {
  transition: opacity 0.5s;
}
.search-enter,
.search-leave-active {
  opacity: 0;
}
</style>
