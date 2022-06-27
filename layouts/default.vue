<template>
<div id="app">
  <!-- <top-nav></top-nav> -->
  <Nav />
  <Nuxt class="container mt-16  lg:mt-20" />
  <Footer />

</div>
</template>

<script>
import { currentActivities } from "../store/currentActs";
export default {

  setup(){
    const store = currentActivities();
    store.fetchCategoriesList();
    return{
      store
    }
  },
}
</script>
