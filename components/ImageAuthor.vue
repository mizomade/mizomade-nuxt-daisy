<template>
   <div class="flex flex-row flex-grow">
          <img v-if="authorimagelink" :src="authorimagelink" :alt="author" srcset="" class="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover">
          <div class="px-3 mb-4 flex flex-col text-left  justify-center ">
              <p class="font-semibold text-sm lg:text-lg">{{author}}</p>
              <p class="text-xs lg:text-sm w-36">{{date}}</p>
          </div>
      </div>
</template>

<script>
import {MEDIA_S3} from './../API';
export default {
props:['authorphoto','author','date',],
data(){
    return{
            authorimagelink:MEDIA_S3+'static/'+this.authorphoto,

    }
},
mounted(){
// console.log("IMAGE",this.authorimagelink);

}
}
</script>

