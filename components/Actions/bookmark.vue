<template>
  <div class="lg:w-5/6 lg:cursor-pointer">
      <!-- id{{this.id}} -->
      <!-- {{this.getBookmarkValue(this.id)}} -->
      <span v-if="!this.getBookmarkValue(this.id)" >

          <!-- <bookmark-icon class="h-6 w-6" @click="togglebookmark"></bookmark-icon> -->

          <svg  :class="active?' h-6 w-6':'h-6 w-6'" @click="togglebookmark" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
</svg>

      </span>
      <span v-else >
          <!-- <bookmark-icon-bookmarked class="w-6 h-6  " @click.prevent="togglebookmark"></bookmark-icon-bookmarked> -->
<svg  :class="active?' h-6 w-6':'h-6 w-6'"  @click="togglebookmark" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="bg-gray-600" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
</svg>
      </span>
  </div>
</template>

<script>
// import {BookmarkIcon} from '@heroicons/vue/outline'
// import {BookmarkIcon as BookmarkIconBookmarked} from '@heroicons/vue/solid' 
import axios from 'axios'

import { API_URL } from '../../API';
import { accountStore } from '../../store/accounts';



export default {

    setup(){
        const store = accountStore();
        return{
            store,
            getBookmarkValue: store.currentPageBookmarkValue
        }
    },
    props:['id',],
    components:{
        // BookmarkIcon,
    // BookmarkIconBookmarked
    },
data(){
    return{
        
        // bookmarked:this.getBookmarkValue(this.id).length > 2 ? true: false,
        active:true,
    }
},
methods:{
    async togglebookmark(){
        const axiosConfig = {
         headers : {
            'Content-Type': 'application/json',
             'Authorization': 'Token ' + this.store.skey
        }};

        await axios.get(API_URL+ '/api/posts/bookmark/'+this.id,axiosConfig)
        .then((response)=>{
            console.log(response);
            // if(response.data.bookmarked === 1){
            //     this.bookmarked = true
            // }
            // else{
            //     this.bookmarked = false
            // }
            // console.log(response.data.msg);
            // console.log(this.bookmarked)
        })
        .catch((error)=>{
            console.log(error)
        })
        // this.bookmarked =!this.bookmarked;
        // this.active = true;
        this.store.fetchUserBookmarks();
        // setTimeout(()=> this.active=false,400)
        // console.log("ACTIVE",this.active)
    }
},
//  mounted(){
//     if(this.getBookmarkValue.length > 2){
//         this.bookmarked = true
//     }
//     else{
//         this.bookmarked = false
//     }
// }
}
</script>

