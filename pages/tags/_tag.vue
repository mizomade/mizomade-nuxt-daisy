<!-- ./src/components/BlogPage.vue -->

<template>

  <div id="blog-home" class="mx-auto">
    <h1 class="text-center text-xl mt-2 "><span class="underline">Posts with tag</span>
      <span class="font-bold py-2 px-2 bg-gray-100 text-gray-600 rounded "> #{{ $route.params.tag}}</span>
      </h1>
    <main class="container " >
<div class="flex flex-wrap flex-row justify-center ">
       <div v-if="$fetchState.pending" class="flex flex-wrap flex-row justify-center ">
         <div  v-for="( index) in 6" :key="index">
          <CardSkeleton />
        </div>
        </div>
      <div v-for="post in posts" v-else :key="post.id"   >
        
          <nuxt-link :to="{ name: 'mizo-slug', params: { slug: post.slug } }">

      <post-card-minimal :title="post.title" :coverimage="post.coverimage" 
      :author="post.author"
      :authorimage="post.authorphoto"
       :date="post.date" > </post-card-minimal>
          </nuxt-link>
      </div> 

</div>
    </main>
    <div class="mb-10"></div>
  </div>
</template>

<script>
import { API_URL } from '../../API'

import PostCardMinimal from './../../components/PostCardMinimal.vue'
import CardSkeleton from './../../components/CardSkeleton.vue'
export default {
  components:{PostCardMinimal,CardSkeleton},
  data(){
    return{
      loading:true,
      posts:[
        // {'title':'Hello','author':'C Lalhmangaiha','date':'12 Dec 2021'},
        // {'title':'Hello World','author':'C Lalhmangaiha','date':'12 Dec 2021'},
        // {'title':'Artui kan dan','author':'C Lalhmangaiha','date':'12 Dec 2021'},
        // {'title':'Bel sil dan','author':'C Lalhmangaiha','date':'12 Dec 2021'},

      ]
    }
  },
  async fetch(){
    try{
       this.posts = await fetch(API_URL + '/api/tags/',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({
        name:this.$route.params.tag
      }),

    }).then(res=>res.json())
    }
    catch(err){
        // console.log(err) 
    }
     
  },
//    mounted(){

// const form = new FormData();
//     form.append('name',this.$route.params.tag)

//       this.$axios.$post('http://127.0.0.1:8000/api/tags/',form).then((response)=>{
       
//       this.posts = response;
//       this.loading = false;
        
//     }).catch(()=>{
     
      
//     })
//   }

}
</script>


