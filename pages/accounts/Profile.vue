<template>
  <!-- <div class="container bg-gray-100" style="background-image: url('https://blog.prezi.com/wp-content/uploads/2019/03/joshua-earle-157231-unsplash-1024x683.jpg');  background-size: auto auto;"> -->

  <div v-if="loading" class="mt-14 mb-40">
    <Spinner />
  </div>
  <div v-else class="container bg-gray-100 lg:mt-1  -mt-0 sm:-mt-3 ">
    <!-- {{user[1]}} -->

    <div class="mb-96 text-center mx-auto">
      <img
        :src="store.userInfos.coverphoto"
        class="w-full h-64 lg:h-80 object-cover"
        alt="Cover Photo"
      />

      <div
        class="w-11/12 lg:w-5/6 mx-auto top-28 bg-white rounded-lg px-3 lg:px-20"
      >
        <img
          class="mx-auto border-white my-2 object-cover rounded-full h-28 w-28"
          :src="store.userInfos.profilephoto"
        />

        <div class="pt-10">
          <h4 class="font-bold text-md text-gray-600">
            @{{ store.userMeta.username }}
          </h4>
          <h3
            class="text-3xl lg:text-4xl font-semibold leading-10 mb-2 text-gray-700"
          >
            {{ store.userMeta.first_name }} {{ store.userMeta.last_name }}
          </h3>
          <!-- <p
            class=" text-base  font-light text-gray-600 uppercase text-md py-2"
          >
            {{ author.passion }}
          </p> -->
          <i class="fas fa-quote-left"></i>

          <span class="flex flex-row justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <p class="font-medium md:text-base lg:text-lg italic text-gray-700">
              "{{ store.userInfos.bio }}"
            </p>
          </span>
          <div class="my-2 w-full">
            <router-link
              :to="{ name: 'accounts-ProfileEdit' }"
              class="border rounded bg-transparent border-gray-600 hover:bg-gray-900 hover:text-red-50 w-5/6 px-6 py-2"
              >Edit Profile</router-link
            >
          </div>

          <!-- <div class="tabs">
            <a class="tab tab-lifted">Tab 1</a>
            <a class="tab tab-lifted tab-active">Tab 2</a>
            <a class="tab tab-lifted">Tab 3</a>
          </div> -->
          <div class="mx-9 mt-12 text-left">
            <h2 class="my-2 font-semibold">
              Posts
              <span class="bg-gray-300 p-2 rounded-md text-white">{{
                store.userPosts.length
              }}</span>
            </h2>
            <hr />
          </div>

          <!-- posts -->
          <div class="flex flex-wrap flex-row justify-center">
            <div v-for="post in store.userPosts" :key="post.id">
              <nuxt-link
                :to="{ name: 'mizo-slug', params: { slug: post.slug } }"
              >
                <post-card-small-minimal
                  v-if="post.title"
                  :title="post.title"
                  :coverimage="post.coverimage"
                  :date="post.date"
                >
                </post-card-small-minimal
              ></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountStore } from "../../store/accounts";
// import PostCardSmall from "./../components/PostCardSmall.vue";
import Spinner from "./../../components/Spinner.vue";
export default {
  middleware: "authenticated",
   head(){
    return{
      title: "My Profile"
    }
  },

  components: {
    //  PostCardSmall
    Spinner,
  },
  setup() {
    const store = accountStore();
    return {
      store,
    };
  },

  data() {
    return {
      loading: false,
   
    };
  },
 
  mounted() {
    window.scrollTo(0, 0);
 
  },
};
</script>
