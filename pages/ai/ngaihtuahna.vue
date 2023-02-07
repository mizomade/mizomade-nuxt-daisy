<template>
  <main class="container">
    <h2 class="text-center flex flex-row justify-center text-lg font-bold my-4">
      Ngaihtuahna
    </h2>
    <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-4 mb-96 w-3/4 mx-auto sm:grid-cols-1">

      <textarea
          class="border border-gray-300 bg-white  py-4 px-5 w-full rounded-lg text-sm focus:outline-none
          input-lg  "
          type="search"
          name="search"
          v-model="searchQuery"
          placeholder="Zawh duh zawng min han zawt teh le"
          autofocus
          @keyup.enter="search"
        >
        </textarea>
        <button
          type="submit"
          @click.prevent="search"
          class="px-2 ml-1 border border-gray-400 rounded-md py-2"
        >Ask</button>

        
  
      <div v-if="loading" class="flex flex-wrap flex-row justify-center">
       
        <div class="flex row justify-center items-center mt-10 animate-bounce">
          <div class="animate-bounce h-10 w-10 mr-10  " style="--value:80;" >
          </div>
  Processing...
        </div>
      </div>
    <div v-else>

    </div>

        <div v-if="searchResults.length == 0" class="mb-96 text-lg">
        </div>

        <div v-else>
          <p class="whitespace-pre-wrap text-slate-800">
            {{searchResults  }}

          </p>
        </div>
    
        
    </div>
    <!-- <pagination
        @updateindex="yesupdate($event)"
        :prev="prev"
        :next="next"
      ></pagination> -->
  </main>
</template>

<script>
import axios from "axios";
import { API_URL } from "~/API";

export default {
  components: {  },
   head(){
    return{
      title: "Ngaihtuahna" 
    }
  },

  data() {
    return {
      loading: false,
      searchResults: [],
      searchQuery: '',
    };
  },

  methods:{
    search() {
    this.loading = true;
    console.log("QUERY", this.searchQuery);
    const form = new FormData();
    form.append("query", this.searchQuery);
    const data = JSON.stringify({
      query: this.searchQuery,
    });
    axios
      .post(API_URL + "/api/chat/", form, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        this.searchResults = res.data;
        this.loading = false;
      })
      .catch((er) => {
        console.log(er);
      });
  },
  },
 
};
</script>
