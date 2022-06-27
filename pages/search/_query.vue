<template>
  <main class="container">
    <h2 class="text-center flex flex-row justify-center text-lg font-bold my-4">
      Search Results
    </h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-96 w-3/4 mx-auto sm:grid-cols-1">
      <div v-if="loading" class="flex flex-wrap flex-row justify-center">
        <div v-for="index in 6" :key="index">
          <CardSkeleton />
        </div>
      </div>
      <div v-else v-for="(post, index) in searchResults" :key="post + index" >
          <router-link :to="{ name: 'mizo-slug', params: { slug: post.slug } }">
            <post-card-minimal
              :title="post.title"
              :coverimage="post.coverimage"
              :author="post.author"
              :authorimage="post.authorphoto"
              :date="post.date"
            >
            </post-card-minimal
          ></router-link>
        </div>

        <div v-if="searchResults.length == 0" class="mb-96 text-lg">
          No results!
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
import PostCardMinimal from "./../../components/PostCardMinimal.vue";
import CardSkeleton from "./../../components/CardSkeleton.vue";

export default {
  components: { PostCardMinimal, CardSkeleton },

  data() {
    return {
      loading: true,
      searchResults: [],
      searchQuery: this.$route.params.query,
    };
  },
  mounted() {
    this.loading = true;
    console.log("QUERY", this.searchQuery);
    const form = new FormData();
    form.append("q", this.searchQuery);
    const data = JSON.stringify({
      q: this.searchQuery,
    });
    axios
      .post(API_URL + "/api/searching/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        this.searchResults = res.data[0];
        this.loading = false;
      })
      .catch((er) => {
        console.log(er);
      });
  },
};
</script>
