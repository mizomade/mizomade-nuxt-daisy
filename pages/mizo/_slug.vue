<template>
  <client-only>
    <div v-if="loading" class="container mx-auto my-4">
      <!-- <div class="w-1/12 animate-pulse  mx-auto"> LOADING ................ </div>
   -->
      <step-loader></step-loader>
    </div>

    <div v-else class="container lg:container mx-auto">
      <div v-if="error"> 
      <PageNotFound/>
      
      </div>
      <div class="md:mx-auto lg:mx-40 xl:mx-40" v-else>
        <!-- edit delete draft -->
        <span class="flex flex-row lg:my-2 mt-20" v-if="isAuthor">
          <!-- DELETE MODAL -->
          <!-- The button to open modal -->
          <label for="my-modal-delete" class="btn btn-sm btn-ghost modal-button"
            >Delete</label
          >
          <!-- Put this part before </body> tag -->
          <input type="checkbox" id="my-modal-delete" class="modal-toggle" />
          <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Delete</h3>
              <p class="py-4">Are you sure you want to delete?</p>
              <div class="modal-action">
                <label for="my-modal-delete" class="btn btn-sm">No</label>

                <label
                  for="my-modal-delete"
                  @click.prevent="deletePost"
                  class="btn btn-sm btn-ghost"
                  >Yes</label
                >
              </div>
            </div>
          </div>

          <div class="mx-1"></div>
          <!-- eof -->

          <nuxt-link
            :to="{ name: 'post-Edit-id', params: { id: post.post.id } }"
          >
            <p class="btn btn-sm btn-primary">Edit</p></nuxt-link
          >
          <div class="mx-1"></div>

          <!-- DRAFT MODAL -->

          <label for="my-modal-draft" class="btn btn-sm rounded-lg modal-button"
            >Unpublish</label
          >

          <!-- Put this part before </body> tag -->
          <input type="checkbox" id="my-modal-draft" class="modal-toggle" />
          <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Draft</h3>
              <p class="py-4">Are you sure you want to move to draft?</p>
              <div class="modal-action">
                <label for="my-modal-draft" class="btn btn-sm">No</label>

                <label
                  for="my-modal-draft"
                  @click.prevent="moveToDrafts"
                  class="btn btn-sm btn-ghost"
                  >Yes</label
                >
              </div>
            </div>
          </div>

          <!-- EOF -->
        </span>

        <!-- Heading? -->

        <div class="mx-2 lg:mx-0 mb-3">
          <!-- style="font-family: 'Scheherazade New'" -->
          <h1
            class="break-words text-left text-black text-current font-bold text-3xl lg:text-5xl py-4 title"
          >
            {{ post.post.title }}
          </h1>
          <div class="flex flex-row justify-between lg:justify-start">
            <nuxt-link
              :to="{ name: 'user-user', params: { user: post.post.author } }"
            >
              <image-author
                :author="post.post.author"
                :authorphoto="post.post.authorphoto"
                :date="dateformat(post.post.date)"
                class="mb-1"
              ></image-author>
            </nuxt-link>

            <!-- <span v-if="this.$store.getters.loggedIn"> -->
            <span>
              <div v-if="userStore.isLoggedIn">
                <bookmark
                  class="mr-3"
                  v-if="post.post.id"
                  :id="post.post.id"
                ></bookmark>
              </div>

              <div v-else>
                <button @click="needLogin">
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="{2}"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              </div>
            </span>

            <!-- </span> -->
            <!-- <span v-else>
    <bookmark class="mr-3 opacity-50 disabled" v-if="post.id" @click="loginalert"></bookmark>

    </span> -->
            <!-- <login-modal v-if="modalalert" :activation="modalalert"></login-modal> -->
          </div>
        </div>
        <!-- eol heading/ -->

        <img
          :src="post.post.coverimage"
          class="w-full h-auto"
          alt=""
          srcset=""
        />

        <p
          class="ml-2 text-left flex flex-inline my-1 mt-2 justify-between lg:justify-start lg:space-x-4 mr-3"
        >
          <!-- <like v-if="post.id" :id="post.id"></like> -->

          <share :slug="'https://mizomade.com/mizo/' + post.post.slug"></share>
        </p>

        <!-- ////////////////////////////////////////////// -->

        <!-- body -->

        <div id="editor" class="font-lg overflow-hidden dark:text-gray-50"></div>

        <div class="mx-2 my-1 text-left">
          <!-- Category -->
          Category:
          <div
            v-if="post.post.category"
            class="inline-flex items-center bg-white leading-none rounded-full p-0 shadow text-teal text-sm"
          >
            <nuxt-link
              :to="{
                name: 'category-category',
                params: { category: post.post.category },
              }"
            >
              <span
                class="inline-flex bg-indigo-700 text-white rounded-full h-6 px-3 p-4 justify-center items-center"
                >{{ post.post.category }}</span
              >
            </nuxt-link>
          </div>
          <br />
          <!-- TAGS -->
          <div class="space-x-2 my-4 flex flex-row flex-wrap">
            <span v-for="tag in post.post.tags" :key="tag.id">
              <nuxt-link :to="{ name: 'tags-tag', params: { tag: tag } }">
                <span
                  class="text-xs font-light py-2 px-2 bg-gray-100 text-gray-600 rounded my-1"
                  >#{{ tag }}</span
                >
              </nuxt-link>
            </span>
          </div>
          <hr />
          <!-- Recommendation -->
          <h2
            v-if="post.related.length"
            class="text-center font-bold text-2xl py-3"
          >
            Similar Post
          </h2>
          <div class="flex md:flex-row sm:flex-col flex-wrap justify-center">
            <div class="" v-for="sim in post.related" :key="sim.id">
              <nuxt-link
                :to="{ name: 'mizo-slug', params: { slug: sim.slug } }"
              >
                <post-card-minimal
                  :title="sim.title"
                  :coverimage="sim.coverimage"
                  :author="sim.author"
                  :authorimage="sim.authorphoto"
                  :date="dateformat(sim.date)"
                  style="width: 16rem; margin: 12; padding-bottom: 1rem"
                >
                </post-card-minimal>
              </nuxt-link>
            </div>
          </div>

          <!-- comments -->
          <p class="text-left mt-2">Comments</p>
          <div>
            <comments
              v-if="post.post.id"
              :id="post.post.id"
              class="mb-10"
            ></comments>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
// import { currentActivities } from '../../store/currentActs'
import axios from "axios";

import { accountStore } from "../../store/accounts";

// import Quill from 'quill';

// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { API_URL } from "../../API";
// import {  useMeta,ref } from '@nuxtjs/composition-api'

import StepLoader from "../../components/Wait/StepLoader.vue";
import PageNotFound from './../../components/PageNotFound.vue';

import ImageAuthor from "./../../components/ImageAuthor.vue";
import Comments from "./../../components/Comment/Comments.vue";
import PostCardMinimal from "./../../components/PostCardMinimal.vue";
// import like from './like'
import bookmark from "./../../components/Actions/bookmark.vue";
import share from "./../../components/Actions/share";

let Quill = {};

// if (!process.env.SERVER) {
//   console.log('loading quill')
//   Quill = require('quill')
// }

if (process.browser) {
  Quill = require("quill");
}

// import LoginModal from './LoginModal'
// import {mapGetters} from 'vuex'
export default {
  // setup(){
  //   const cStore = currentActivities();
  //     return{
  //       cStore
  //     }
  // },
  head:{},
  setup() {
    const userStore = accountStore();
//  const title = ref('');
//         useMeta(() => ({ title: "TITLE" }));
    return {
      userStore,
      // title
    };
  },

  //   head() {
  //   return {
  //     title: this.post.post.title,
  //     meta: [
  //       {
  //         hid:
  //           this.post.post.title +
  //           this.post.post.category +
  //           this.post.post.tags,
  //         name: this.post.post.title,
  //         content: this.post.post.category,
  //       },
  //     ],
  //   };
  
  // },

    head() {
          
 return {
      
      title: this.title,
      meta: [
        {
          hid:"HID",
          name: "NAME",
          content: "CONTENT"
        },
      ],
    };
             

    
  },

 

  components: {
    StepLoader,
    ImageAuthor,
    Comments,
    // PostCard,
    // like,
    bookmark,
    share,
    PostCardMinimal,
    PageNotFound
 
 },

  data() {
    return {
      title:'Mizomade',
      hid:'Mizomade',
      name:'author',
      content:'',
      
      post: {},
      loading: true,
      similar: {},
      bk: null,
      modalalert: false,
      q: "",
      error:false,
    };
  },

  // async fetch() {
  //   this.post = await fetch(
  //     API_URL + '/api/posts/' + this.$route.params.slug
  //   ).then((res) => res.json())
  
  // },
  
  

  methods: {
    dateformat(date) {
      return this.$moment(date).format("D MMM YYYY");
    },

    deletePost() {
      this.userStore.deletePost(this.post.post.id);
      // $modal.hide('delete-modal')
      // this.userStore.fetchUserData
      this.$router.push("/");
    },
    moveToDrafts() {
      this.userStore.moveToDrafts(this.post.post.id);
      // $modal.hide('delete-modal')
      this.$router.push("/");
    },
    needLogin() {
      this.$toast.show("Login required", {
        position: "bottom-center",
        duration: "3000",
        fitToScreen: true,
        action: {
          text: "Login",
          onClick: (e) => {
            this.$router.push("/accounts/login");
          },
        },
      });
    },
  },
  mounted() {
    // const editor = document.getElementById('#editor');
    const editorId = "#editor";
    setTimeout(() => {
      this.q = new Quill(editorId, {
        theme: "bubble",
      });
      const contents = JSON.parse(this.post.post.content);
      this.q.setContents(contents, "api");
      this.q.enable(false);
    }, 1000);
  },
  async created() {
    await axios
      .get(API_URL + "/api/posts/" + this.$route.params.slug)
      .then((res) => {
        this.post = res.data;
        //meta
        this.title=this.post.post.title;
        this.name = this.post.post.author;
        // this.hid = this.post.post.title + this.post.post.category + this.post.post.tags;
        this.error = false;
        this.loading = false;
      }).catch(()=>{
        this.loading = false
        this.error = true

      });
  },

  
 
  computed: {
    isAuthor() {
      if (this.post.post.author === this.userStore.getUserName) {
        return true;
      } else return false;
    },
  },

  
};
</script>

<!-- /* text-align: left;
    font-size: 48px;
    margin-top: 0;
    font-weight: 600; */ -->
<style >
@import url("https://cdn.quilljs.com/1.3.6/quill.bubble.css");
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Noto+Sans+JP&family=Open+Sans&family=Roboto:wght@300;900&family=Scheherazade+New:wght@400;700&display=swap");
.title {
  font-family: "Scheherazade New", serif;
}

#editor > div.ql-editor > p:nth-child(n){
font-size: 16px;
}

/* Dark mode */
/* @media (prefers-color-scheme: dark) {
    body {
        background-color: black;
        color: white;
    }

} */


</style>
