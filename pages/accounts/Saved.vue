<template>
   <main class="container  ">
     <h2 class="text-center flex flex-row justify-center text-lg font-bold my-4">
       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
</svg>
       Saved</h2>
      <div class="flex flex-wrap flex-row justify-center ">
         <div v-if="loading" class="flex flex-wrap flex-row justify-center ">
         <div  v-for="( index) in 6" :key="index">
          <CardSkeleton />
        </div>
        </div>
        <div v-else v-for="(post, index) in posts" :key="post + index">
          
          <router-link :to="{ name: 'mizo-slug', params: { slug: post.slug } }">
            <post-card-minimal
              :title="post.title"
              :coverimage="post.coverimage"
              :author="post.author"
              :authorimage="post.authorphoto"
              :date="post.date"
            >
            </post-card-minimal
          ></router-link>
        </div>
      </div>
      <!-- <pagination
        @updateindex="yesupdate($event)"
        :prev="prev"
        :next="next"
      ></pagination> -->

      <div v-if="posts.length == 0" class="mb-96 text-lg"> No saved posts yet!</div>
    </main>
</template>

<script>
import { accountStore } from "../../store/accounts";

import PostCardMinimal from "./../../components/PostCardMinimal.vue";
import CardSkeleton from './../../components/CardSkeleton.vue'

export default {
  components: { PostCardMinimal ,CardSkeleton},
   head(){
    return{
      title: "Saved"
    }
  },
  setup(){
      const store = accountStore();
      return {
        store
      }

  },  
        middleware: 'authenticated',

  data(){
      return{
        loading:true,
          posts:[]
      }
  },
   mounted() {
    // this.axios
    //   .get("/api/bookmarkedlist")
    //   .then((response) => {
    //     this.posts = response.data;
    //     this.loading = false
   

    //     // console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // this.$store.dispatch("userinfo");
    this.posts = this.store.getBookmarkedList;
    this.loading = false
    // this.axios.get('rest-auth/user/').then((response)=>{
    //   console.log(response.data);
    // }).
    // catch((err)=>{
    //   console.log(err);
    // });
    // console.log("KEY",store.state.key);
  },

}
</script>

