<!-- ./src/components/BlogPage.vue -->

<template>
  <div id="blog-home" class="mx-auto mb-72">
    <h1 class="text-center text-xl mt-2 ">
      Category : " <span class="font-bold">{{ $route.params.category }}</span
      >"
    </h1>
    <main class="container ">
      <div class="flex flex-wrap flex-row justify-center ">
             <div v-if="$fetchState.pending" class="flex flex-wrap flex-row justify-center ">
         <div  v-for="( index) in 6" :key="index">
          <CardSkeleton />
        </div>
        </div>
        <div v-else v-for="post in posts.results" :key="post.id">
          <nuxt-link  v-if="post.slug" :to="{ name: 'mizo-slug', params: { slug: post.slug } }">
            <post-card-minimal
              :title="post.title"
              :coverimage="post.coverimage"
              :author="post.author"
              :authorimage="post.authorphoto"
              :date="post.date"
            >
            </post-card-minimal>
          </nuxt-link>
        </div>
      </div>
    </main>
    <div class="mb-10"></div>
  </div>
</template>

<script>
import { API_URL } from "../../API";

import PostCardMinimal from "./../../components/PostCardMinimal.vue";
import CardSkeleton from "./../../components/CardSkeleton.vue";
export default {
  name:'categoryPage',
  layout:'default',
  components: { PostCardMinimal,CardSkeleton },
  head(){
    return{
      title: this.$route.params.category
    }
  },
  data() {
    return {
      loading:true,
      name: "",
      posts: [
        // {'title':'Hello','author':'C Lalhmangaiha','date':'12 Dec 2021'},
        // {'title':'Hello World','author':'C Lalhmangaiha','date':'12 Dec 2021'},
        // {'title':'Artui kan dan','author':'C Lalhmangaiha','date':'12 Dec 2021'},
        // {'title':'Bel sil dan','author':'C Lalhmangaiha','date':'12 Dec 2021'},
      ],
    };
  },
  // updated() {
  //   if (this.name == this.$route.params.name) {
  //     // console.log("same");
  //   } else if (this.name != this.$route.params.name) {
  //     this.name = this.$route.params.name;
  //     this.fetching();
  //   }
  // },
   async fetch(){
      this.posts = await fetch(API_URL +'/api/categoryposts/'+this.$route.params.category).then(res=>res.json())
  },
 
  // methods: {
  //   fetching() {
   
  //     this.name = this.$route.params.name;
  //     var form = new FormData();
  //     form.append('name', this.name);

  //     this.axios
  //       .post("/api/categories/", form)
  //       .then((response) => {
  //         this.posts = response.data;
  //         this.loading = false;
  //         this.$router.pop();

  //       })
  //       .catch((error) => {

  //         console.log(error);
  //       });
  //   },
  // },
};
</script>
