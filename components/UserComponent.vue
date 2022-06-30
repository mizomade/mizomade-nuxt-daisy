<template>

        <span class="flex flex-row flex-wrap border w-64 cursor-pointer rounded-md shadow-sm my-2  p-2">
            
            <img v-if="profilephoto" 
            :src="profilephoto" alt="" class="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover">
            <span class="flex flex-col pl-3">
                <h6 class="text-gray-400 font-semibold">@{{username}}</h6>
                <h5 class="font-semibold text-gray-600"> {{firstname}} {{lastname}}</h5>
            </span>
        </span>
     
</template>


<script>
import { MEDIA_S3 } from '../API'
export default{
    props:['username','firstname','lastname','authorimage'],
    data(){
        return{
            profilephoto :MEDIA_S3 +'static/' +this.authorimage
        }
    }
}
</script>