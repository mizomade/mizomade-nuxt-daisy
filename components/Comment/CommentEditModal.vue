<template>
  <div>
    <!-- The button to open modal -->
    <span class="flex flex-row space-x-2">
    <label :for="'my-modal-deletecomment'+id" class=" modal-button cursor-pointer text-slate-500">Delete </label>
    <label :for="'my-modal-editcomment'+id" class=" modal-button cursor-pointer text-slate-500">Edit </label>

    </span>


    <!-- Put this part before </body> tag -->
    <input type="checkbox" :id="'my-modal-editcomment'+id" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-gray-800 text-lg">Edit comment</h3>
        <div class="w-full md:w-full mb-2 mt-2">
          <textarea
            class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            name="body"
            placeholder="Type Your Comment"
            required
            v-model="comment"
          ></textarea>
        </div>

        <div class="modal-action">
          <label :for="'my-modal-editcomment'+id" class="btn btn-ghost">Cancel</label>

          <label :for="'my-modal-editcomment'+id" class="btn" @click="editComment">Edit Comment</label>
        </div>
      </div>
    </div>

    <!-- DELETE -->
    <input type="checkbox" :id="'my-modal-deletecomment'+id" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-gray-800 text-lg">Delete </h3>
   
         <h3 class="py-4 text-gray-700 text-md">Are you sure you want to delete your comment?</h3>

        <div class="modal-action">
          <label :for="'my-modal-deletecomment'+id" class="btn ">Cancel</label>

          <label :for="'my-modal-deletecomment'+id" class="btn btn-ghost" @click="deleteComment">Yes, Delete</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "~/API";
import { accountStore } from "./../../store/accounts";
import { currentActivities } from "~/store/currentActs";
export default {
  props: ["id","commentcontent"],
  setup() {
    const store = accountStore();
    const currentStore = currentActivities();
    return {
      store,
      currentStore,
    };
  },
  data(){
    return{
      comment:this.commentcontent,
    }
  },
  


  methods: {
    async editComment() {
      const forms = new FormData();
      forms.append("comment", this.comment);
      await axios.put(API_URL + "/api/posts/commentdetail/" + this.id, forms, {
        headers: {
          Accept: "application/json, text/plain, */* ",

          Authorization: this.store.key,
        },
      }).then((res)=>{
      this.currentStore.updateComment(this.id,this.comment);

        // console.log(res)
      }).catch(()=>{
        // console.log(err)
      });

    },

     async deleteComment() {
    
      await axios.delete(API_URL + "/api/posts/commentdetail/" + this.id, {
        headers: {
          Accept: "application/json, text/plain, */* ",

          Authorization: this.store.key,
        },
      }).then(()=>{
      this.currentStore.deleteComment(this.id)

        // console.log(res)
      }).catch(()=>{
        // console.log(err)
      });

    },
  },
};
</script>

<!-- comment form -->

<!-- <div class="flex items-center justify-center ">
   <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
      <div class="flex flex-wrap -mx-3 mb-6">
         <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
         <div class="w-full md:w-full px-3 mb-2 mt-2">
            <textarea class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
         </div>
         <div class="w-full md:w-full flex items-start md:w-full px-3">
            <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
               <svg fill="none" class="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>
               <p class="text-xs md:text-sm pt-px">Some HTML is okay.</p>
            </div>
            <div class="-mr-1">
               <input type='submit' class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment'>
            </div>
         </div>
         </div>
      </form>
   </div> -->
