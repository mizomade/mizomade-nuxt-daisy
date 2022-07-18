<template>
  <div class="w-6/6 lg:w-4/6 m-4 h-1/5 bg-base-100 shadow-xl flex flex-row rounded-md justify-start">
    <div class="w-4/6 lg:w-2/6 lg:max-w-4/6 lg:min-w-4/6">
<figure>
      <img
        :src="coverimage"
        :alt="title"
        class="object-fill min-h-32 h-32 max-h-32 rounded-l-md"
      />
    </figure>
    </div>
    
    <div class="w-5/6 flex flex-col pl-4 items-start">
      <h2 class="text-left font-bold">{{ truncate }}</h2>
      <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
 
            <p class="text-xs font-semibold text-slate-600">
              {{ dateformat(date) }}
            </p>
          </div>
         
       
    <div>


<div class="dropdown ">
  <label tabindex="0" class=" rounded-full btn btn-ghost cursor-pointer " >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
</svg></label>
  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <li> <nuxt-link :to="{ name: 'post-Edit-id', params: { id: id } }">
            Edit</nuxt-link></li>
  <li><label for="my-modal-delete" class="modal-button"
            >Delete</label
          ></li>
  </ul>
</div>





<!-- MODAL -->
<input type="checkbox" id="my-modal-delete" class="modal-toggle" />
          <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Delete</h3>
              <p class="py-4">Are you sure you want to delete?</p>
              <div class="modal-action">
                <label for="my-modal-delete" class="btn btn-sm">No</label>

                <label
                  for="my-modal-delete"
                  @click.prevent="deletePost"
                  class="btn btn-sm btn-ghost"
                  >Yes</label
                >
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import { MEDIA_S3 } from "./../API";
export default {
  props: ["id", "title", "coverimage",  "date","store"],
  data() {
    return {
      coverimagelink: this.coverimage,
    };
  },
  computed: {
    truncate() {
      if (this.title) {
        if (this.title.length > 40) {
          return this.title.substring(0, 40) + "...";
        } else return this.title;
      } else {
        return "No Title";
      }
    },
  },
  methods: {
    dateformat(date) {
      return this.$moment(date).format("D MMM YYYY");
    },
    authorphoto(photo) {
      return MEDIA_S3 + "static/" + photo;
    },
      deletePost() {
      this.store.deletePost(this.id);
      // $modal.hide('delete-modal')
      // this.userStore.fetchUserData
      this.$router.push("/accounts/Profile");
    },
  },
};
</script>
