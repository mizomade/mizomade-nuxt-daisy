<template>
  <!-- <div class="container bg-gray-100" style="background-image: url('https://blog.prezi.com/wp-content/uploads/2019/03/joshua-earle-157231-unsplash-1024x683.jpg');  background-size: auto auto;"> -->

  <div v-if="$fetchState.pending" class=" mb-40">
    <Spinner />
  </div>
  <div
    v-else
    class="container bg-gray-100 lg:mt-1  -mt-0 sm:-mt-3 "
    
  >
    <!-- {{user[1]}} -->

    <div class=" text-center mx-auto ">
      <img
        :src="usermedia.coverphoto"
        class="w-full h-64 lg:h-80 object-cover "
        alt="Cover Photo"
        @load="coverloading"
      />

      <div
        class="w-11/12 lg:w-5/6 mx-auto  bg-white rounded-lg px-3 lg:px-20"
      >
        <img
          class="mx-auto border-white my-2  object-cover rounded-full h-28 w-28 border"
          :src="usermedia.profilephoto"
        />
        <div class="pt-10">
          <h4 class="font-bold text-md text-gray-600">@{{ user.username }}</h4>
          <h3
            class="text-3xl lg:text-4xl font-semibold leading-10 mb-2 text-gray-700"
          >
            {{ user.first_name }} {{ user.last_name }}
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
              "{{ usermedia.bio }}"
            </p>
          </span>

          <div class="mx-9 mt-12 text-left">
            <h2 class="my-2 font-semibold">
              Posts
              <span class="bg-gray-300 p-2 rounded-md text-white">{{
                posts.length
              }}</span>
            </h2>
            <hr />
          </div>

          <!-- posts -->
          <div class="flex flex-wrap flex-row justify-center">
            <div v-for="post in posts" :key="post.id">
              <nuxt-link
                :to="{ name: 'mizo-slug', params: { slug: post.slug } }"
              >
                <post-card-small-minimal
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
import { API_URL } from "../../API";
import PostCardSmallMinimal from "../../components/PostCardSmallMinimal.vue";
import Spinner from "./../../components/Spinner.vue";
export default {
  components: {
     PostCardSmallMinimal,
    Spinner,
  },

  data() {
    return {
      loading: true,

      posts: [],
      user: [],
      usermedia: [],
    };
  },
  async fetch() {
    this.user = await fetch(
      API_URL + "/api/user/profile/" + this.$route.params.user
    ).then((res) => res.json());
    this.usermedia = this.user[1];
    this.posts = this.user[2];
    this.user = this.user[0];
  },
  mounted() {
    window.scrollTo(0, 0);
    // this.$axios
    //   .$get("/user/profile/" + this.$route.params.username)
    //   .then((response) => {
    //     this.user = response.data[0];
    //     this.usermedia = response.data[1];
    //     this.posts = response.data[2];
    //     if(this.user.username === this.$store.getters.getusername.username){
    //       this.userprofile = true
    //     }
    //     else{
    //       this.userprofile =false
    //     }
    //     // setTimeout(()=> this.loading = false,1000)
    //     // this.loading=true;
    //     // console.log("USER", this.user);
    //     // console.log("USER", this.usermedia);
    //     // console.log("USER", this.posts);

    //   })
    //   .catch(() => {
    //     // console.log(error);
    //     // this.user = response.data[0];
    //     this.usermedia.coverphoto = require('./../../assets/decoration/before.svg')
    //     this.usermedia.profilephoto = require('./../../assets/decoration/avatar1.png')
    //     this.loading=false;
    //     this.userprofile = false;
    //   });
  },

  methods: {
    coverloading() {},
  },
};
</script>
