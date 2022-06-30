<template>


 <div class="card card-compact w-72 m-4 h-96 bg-base-100 shadow-xl">
  <figure><img :src="coverimage" :alt="title" class="object-cover w-full min-h-56 h-56  max-h-56 " /></figure>
  <div class="card-body">
    <h2 class="card-title text-left">{{truncate}}</h2>
    <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
    <div class="card-actions justify-start">

      <div class="flex flex-row items-center">
        

<div class=" flex flex-col">
              <p class="text-xs font-semibold text-slate-600">{{dateformat(date)}}</p>

</div>


      </div>

    </div>
  </div>
</div>
</template>

<script>
import { MEDIA_S3 } from './../API';
export default {
  props: ["title", "coverimage", "authorimage", "author", "date"],
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
     authorphoto(photo){
      return MEDIA_S3 + 'static/' + photo;
    },
    }
    
};
</script>
