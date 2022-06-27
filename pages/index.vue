<template>
 <div  class="mx-auto z-0"> 
    <h1 class="text-center text-xl mt-4 mx-auto">Thoughts and Posts</h1>

    <main class="container " >
      
      <div class="flex flex-wrap flex-row justify-center  ">
        <div v-if="pending" class="flex flex-wrap flex-row justify-center ">
         <div  v-for="( index) in 6" :key="index">
          <CardSkeleton />
        </div>
        </div>
     
          <nuxt-link :to="{path:'/mizo/'+post.slug}" v-for="(post, index) in posts.results" v-else :key="post + index">
            <!-- <post-card
              :title="post.title"
              :coverimage="post.coverimage"
              :author="post.author"
              :authorimage="post.authorphoto"
              :date="post.date"
            >
            

            </post-card> -->

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
      <div style="margin-bottom:4rem;height:4rem">
          <pagination
           :prev="posts.previous"
        :next="posts.next"
        @updateindex="yesupdate($event)"
       
      ></pagination>
      </div>
    
    </main>
  </div>
</template>

        

<script >
// import Vue from 'vue'

import {currentActivities} from './../store/currentActs'

import PostCardMinimal from "./../components/PostCardMinimal.vue";
import CardSkeleton from "./../components/CardSkeleton.vue";

import pagination from "./../components/pagination.vue";

export default ({
  name: 'IndexPage',
  layout:'default',
  setup(){  
        const store = currentActivities();
        // store.fetchPosts();
        const pending = true;
        const posts={};
        const next = '';
        const prev='';
        return{
          store,
          pending,
          posts,
          next,
          prev
        }
      },

  components: { 
    PostCardMinimal ,
    pagination,
    CardSkeleton},
  // async asyncData({params, $axios }) {
  //     const posts = await $axios.$get(`http://127.0.0.1:8000/api/posts/`)
  //     console.log(posts);
  //     this.loading =false;
  //     return { posts }
  //   },

  // data() {
  //   return {
  //     pending:true,
  //     posts: [
  //       // {'title':'Hello','author':'C Lalhmangaiha','date':'12 Dec 2021'},
  //       // {'title':'Hello World','author':'C Lalhmangaiha','date':'12 Dec 2021'},
  //       // {'title':'Artui kan dan','author':'C Lalhmangaiha','date':'12 Dec 2021'},
  //       // {'title':'Bel sil dan','author':'C Lalhmangaiha','date':'12 Dec 2021'},
  //     ],
  //     next: "",
  //     prev: "", 
  //   };
  // },
  methods: {
    async yesupdate(data) {
      // console.log("NEXT",data);
      this.store.currentPostPage = data
      
      await this.$axios
        .get(data)
        .then((response) => {
          // console.log(response.data);
                      window.scrollTo(0, 0);

          this.posts.results = response.data.results;
          this.posts.next = response.data.next;
          this.posts.prev = response.data.previous;
          console.log(this.posts + 'next:' + this.next + 'prev:' + this.prev)
        })
        .catch((error) => {
          console.log(error);
        });
    },

   
       dateformat(date) {
      return this.$moment(date).format('D MMM YYYY')
    },
   
  },
  
  async created(){
    this.posts= await fetch(this.store.currentPostPage).then(res => res.json());
    this.pending = false

  }
})
</script>
