<template>
  <div  class="w-72  hover:shadow-md h-96 bg-white shadow-md max-h-96 m-4 mb-8 rounded-lg border-solid border border-black-3  " >
  <img v-if="coverimage" :src="coverimage" :alt="title" srcset="" class="w-full mb-2 rounded-t min-h-56 h-56 lg:h-56 lg:min-h-56 lg:max-h-56 max-h-56 object-cover" >
  <div class=" h-36 flex flex-col justify-between ">
      
      <h2 class="px-3 text-md leading-normal text-left font-semibold mb-0 overflow-x-hidden  overflow-ellipsis overflow-y-hidden break-words" >{{truncate}}</h2>
      
      <div class="px-3 flex flex-row">
          <img :src="authorImageLink" :alt="author" srcset="" class="w-10 h-10 rounded-full object-cover">
          <div class="px-3 mb-4 flex flex-col text-left  justify-center ">
              <p class=" text-sm break-all">{{author}}</p>
              <p class="text-xs">{{dateformat(date)}}</p>
          </div>
      </div>
  </div>
      
  </div>
</template>

<script>
import { MEDIA_S3 } from '../API'
export default {
    props:['title','coverimage','authorimage','author','date'],
    data(){
        return{
            coverimagelink: this.coverimage,
            authorImageLink :MEDIA_S3 +'static/' +this.authorimage
        }
    },
    computed:{
        truncate(){
            if(this.title.length > 60){
                return this.title.substring(0,60)+ '...';
            }
            else return this.title;
        }
    },
    methods:{
         dateformat(date) {
      return this.$moment(date).format('D MMM YYYY')
    },
    }
    

}
</script>

