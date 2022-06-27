<template>
<div class="container mx-auto my-2">
  <div class="mx-auto lg:w-1/6 w-6/12">
      <div class="flex flex-row">
        
          <button v-if="prev" @click="gopaginate(prev)" type="button" class="bg-gray-100 mx-2 py-2 px-5 lg:px-6 rounded text-indigo-0 hover:text-white hover:bg-indigo-600 cursor-pointer border border-indigo-0">
            Prev
            </button>
          <button v-if="next" @click="gopaginate(next)" type="button" class="bg-white mx-2 py-2 px-5 block lg:px-6 rounded text-indigo-0 hover:text-white hover:bg-indigo-600 cursor-pointer border border-indigo-0">Next</button>
     
      </div>
      

  </div>
  </div>
</template>

<script>
export default {
  props:['next','prev'],
  methods:{
    gopaginate(data){
      this.$emit('updateindex',data);
      // console.log(data)
    }
  }

}
</script>

