<template>
  <div  class="w-60  hover:shadow-md h-80  max-h-80 m-4 mb-8 rounded-lg border-solid border border-black-3 " >
  <img v-if="coverimage" :src="coverimage" alt="" srcset="" class="w-full mb-2 rounded-t min-h-48 h-48 lg:h-48 lg:min-h-48 lg:max-h-48 max-h-48 object-cover" >
  <div class="flex flex-col justify-between ">
      <h2 class="px-3 text-md leading-normal text-left font-bold mb-0 overflow-x-hidden max-h-20 overflow-ellipsis overflow-y-hidden break-all" >{{title}}</h2>
      <br>
      <div class="px-3 flex flex-row">
          <div class="px-3 mb-4 flex flex-col text-left  justify-center ">
              <p class="text-xs">{{date}}</p>
          </div>
      </div>
  </div>
      
  </div>
</template>

<script>
export default {
    props:['title','coverimage','authorimage','author','date'],
    data(){
        return{
            coverimagelink:this.coverimage,
        }
    },
    

}
</script>

