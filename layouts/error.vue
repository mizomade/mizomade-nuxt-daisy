<template>
  <div>
    <h1 v-if="error.statusCode === 404"> 
    <PageNotFound/>
    </h1>
    <h1 v-else>An error occurred</h1>
  </div>
</template>

<script>
import PageNotFound from '~/components/PageNotFound.vue';
  export default {
    props: ["error"],
    layout: "error" // you can set a custom layout for the error page
    ,
    components: { PageNotFound }
}
</script>