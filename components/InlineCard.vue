<template>
  <div  class="w-11/12  hover:shadow-md h-20  mb-3 rounded-lg border-solid border border-black-3 flex flex-row " >
  <img v-if="coverimage" :src="coverimage" alt="" srcset="" class="w-20  rounded min-h-20 h-20 lg:h-48 lg:min-h-48 lg:max-h-48 max-h-48 object-cover" >
  <div class="flex flex-col justify-between ">
      <h2 class="px-3 text-sm leading-normal text-left font-bold mb-0  max-h-10 overflow-ellipsis  break-all pt-2 " >{{truncate}}</h2>
      <div class=" flex flex-row">
          <div class="px-3  flex flex-col text-left  justify-center ">
              <p class="text-xs font-medium text-gray-700">@{{author}}</p>
              <p class="text-xs font-medium text-gray-700">{{dateformat(date)}}</p>
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
     computed:{
        truncate(){
            if(this.title.length > 50){
                return this.title.substring(0,50)+ '...';
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

