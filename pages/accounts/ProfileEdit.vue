<template>
  <div
    class="container mt-4 flex flex-col flex-wrap justify-center items-center"
  >
    <router-link
      :to="{
        name: 'accounts-Profile',
      }"
      type="button"
      class="bg-red-50 rounded-md p-2 self-end mx-2 lg:hidden hover:bg-red-600 text-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    >
      <span class="sr-only">Close </span>

      <!-- Heroicon name: outline/x -->
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </router-link>

    <span class="flex flex-col flex-wrap justify-center items-center">
      <img
        :src="usermedia.profilephoto"
        class="w-24 h-24 max-w-24 mx-h-24 rounded-full object-cover"
        alt=""
        srcset=""
      />
      <label class="text-sm font-medium text-indigo-800 pt-2"
        >Change profile picture
        <input
          type="file"
          accept="image/*"
          id="file-input"
          hidden
          @change="updateprofilephoto($event)"
      /></label>
    </span>

    <div
      class="lg:w-2/6 w-10/12 flex flex-col items-center"
      style="margin-top: 1rem"
    >
      <span class="flex flex-col flex-wrap w-full mb-2">
        <label for="username " class="text-sm font-bold uppercase py-1">
          Username</label
        >
        <label v-if="username_error" class="text-sm font-medium text-red-500">{{
          username_error_message
        }}</label>

        <input
          @keyup.enter="usernamevalidation"
          type="text"
          :class="
            username_error
              ? ' border border-red-500 rounded-sm w-full  px-2 py-2 text-gray-800 font-light font-sans'
              : 'border rounded-sm w-full  px-2 py-2 text-gray-800 font-light font-sans '
          "
          name=""
          v-model="user.username"
          id="username"
          placeholder="@username"
        />
        <!-- <button @click="usernamevalidation">CHECK</button> -->
      </span>
      <div class="w-full flex flex-col py-2">
        <label for="username " class="text-sm font-bold py-1 uppercase">
          First name</label
        >
        <input
          type="text"
          class="border rounded-sm w-full text-gray-800 font-light font-sans px-2 py-2"
          name=""
          v-model="user.first_name"
          id="username"
          placeholder="First Name"
        />
        <label for="username " class="text-sm font-bold py-1 uppercase mt-2">
          Last name</label
        >
        <input
          type="text"
          class="border rounded-sm w-full px-2 py-2 text-gray-800 font-light font-sans"
          name=""
          v-model="user.last_name"
          id="username"
          placeholder="Last name"
        />
      </div>
      <span class="flex flex-col flex-wrap w-full my-4">
        <label for="username " class="text-sm font-bold py-1"> Bio</label>
        <textarea
          cols="4"
          rows="6"
          class="border rounded-sm w-full text-gray-800 font-light font-sans px-2 py-2"
          name=""
          v-model="usermedia.bio"
          id="username"
          placeholder="Bio..."
        ></textarea>
      </span>

      <div class=" ">
        <img
          :src="usermedia.coverphoto"
          class="w-full object-cover h-auto"
          alt=""
          srcset=""
        />
        <label class="text-sm font-medium text-indigo-800 pt-2"
          >Change Cover Image
          <input
            type="file"
            accept="image/*"
            id="file-input"
            hidden
            @change="updatecoverphoto($event)"
        /></label>
      </div>

      <div class="w-full lg:w-2/6 my-4 lg:flex lg:flex-row">
        <router-link
          :to="{
            name: 'accounts-Profile',
          }"
          type="button"
          class="bg-red-50 lg:flex flex-row rounded-md p-2 self-end mx-2 hidden hover:bg-red-600 text-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class=" ">Close </span>

          <!-- Heroicon name: outline/x -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </router-link>

        <button
          @click="update"
          class="bg-indigo-800 hover:bg-indigo-600 rounded-lg w-full text-white font-bold px-4 py-2"
        >
        
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "../../API";
import { accountStore } from "~/store/accounts";

export default {
  middleware: "authenticated",
  setup() {
    const store = accountStore();
    return { store };
  },
  data() {
    return {
      user: [],
      usermedia: [],
      username_error: false,
      username_error_message: "",
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    // axios
    //   .get("/user/profile/" + this.store.userMeta.username,{
    //     headers:{
    //       'Accept': 'application/json, text/plain, */* ',

    //                 "Authorization": this.store.key,
    //     }
    //   })
    //   .then((response) => {
    //     this.user = response.data[0];
    //     this.usermedia = response.data[1];
    //     // console.log("USER", response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    this.user = this.store.userMeta;
    this.usermedia = this.store.userInfos;
  },

  methods: {
     update() {
        this.$root.$toast.show("Updating Profile..",{
            duration: 3000,
            position: 'bottom-center',
          });
       this.usernamevalidation();
       setTimeout(()=>{
        if(this.username_error == false){

      

      const forms = new FormData();
      forms.append("username", this.user.username);
      forms.append("first_name", this.user.first_name);

      forms.append("last_name", this.user.last_name);
      forms.append("bio", this.usermedia.bio);

      axios
        .put(
          API_URL + `/api/user/profile/update/` + this.store.userMeta.id,
          forms,
          {
            headers: {
              Accept: "application/json, text/plain, */* ",

              Authorization: this.store.key,
            },
          }
        )
        .then(() => {
          // console.log(response);
          this.$root.$toast.success("Profile Updated",{
            duration: 2000,
            position: 'bottom-center',
          });
          this.$router.push({ name: "accounts-Profile" });
        })
        .catch((error) => {
          console.log(error);
        });
      }
       },1000); 
      
    },
    usernamevalidation() {
      if(this.user.username == this.store.getUserName){
            this.username_error = false;

      }
      else{
  axios
        .get(API_URL + `/api/user/profile/usernamevalidation/` + this.user.username)
        .then((response) => {
          console.log(response.data[0]);

          if (this.store.getUserName === this.user.username) {
            this.username_error = false;
          }
          if (response.data[0] === 0) {
            this.username_error = true;
            this.username_error_message = response.data[1];
          } else if (response.data[0] === 1) {
            this.username_error = false;
            this.username_error_message = response.data[1];
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    
    },

    updateprofilephoto(event) {
      const data = new FormData();

      data.append("profilephoto", event.target.files[0]);
      data.append("username", this.store.getUserName);

      axios
        .put(
          API_URL +
            "/api/user/profile/update/profilephoto/" +
            this.store.userMeta.id,
          data,
          {
            headers: {
              Accept: "application/json, text/plain, */* ",

              Authorization: this.store.key,
            },
          }
        )
        .then(() => {
          // console.log("image upload response > ", response);
          this.usermedia.profilephoto = URL.createObjectURL(
            event.target.files[0]
          );
           this.$root.$toast.success("Profile photo Updated",{
            duration: 2000,
            position: 'bottom-center',
          });
        });
    },
    updatecoverphoto(event) {
      const data = new FormData();

      data.append("coverphoto", event.target.files[0]);
      data.append("username", this.store.getUserName);

      axios
        .put(
          API_URL +
            "/api/user/profile/update/coverphoto/" +
            this.store.userMeta.id,
          data,
          {
            headers: {
              Accept: "application/json, text/plain, */* ",

              Authorization: this.store.key,
            },
          }
        )
        .then(() => {
          // console.log("image upload response > ", response);
          this.usermedia.coverphoto = URL.createObjectURL(
            event.target.files[0]
          );
           this.$root.$toast.success("Cover photo Updated",{
            duration: 2000,
            position: 'bottom-center',
          });
        });
    },
  },
};
</script>
