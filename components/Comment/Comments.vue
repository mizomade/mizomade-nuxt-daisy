<template>
<div>


<!-- <comment-modal v-if="id" :id="id" @refresh="refressh"></comment-modal> -->
<div>
  <br/>
<inline-comment-modal :id="id" ></inline-comment-modal>

<!-- <nuxt-link v-else to="/accounts/login" class="bg-indigo-700 text-white px-6 my-4 py-3 cursor-pointer rounded-md">Login to comment </nuxt-link> -->


</div>

<div v-if="commentStore.commentsList.length " >
<!-- {{commentStore.commentsList.length}} -->
  <div class="mx-2 flex flex-col flex-wrap my-6 " v-for="(comment,key) in commentStore.commentsList" :key="key">
      <div class="flex flex-row">
     <router-link :to="{name:'profile',params:{username:comment.user}}">

          <img :src=" S3+'static/' + comment.profilephoto" alt="" srcset="" class="h-8 w-8 min-w-8 min-h-8 rounded-full object-cover">
     </router-link>
      <!-- names and content -->
      <div class="lg:mx-4 px-4 mx-4 w-4/5 flex flex-col flex-wrap bg-gray-100 rounded-md py-2">
          <p class="font-medium py-b-4 text-md text-gray-700">@{{comment.user}}
            <span class="font-extralight text-xs"> , {{dateformat(comment.date)}}</span></p>
<p class="pt-2 text-sm">{{comment.comment}}</p>
          <p class="text-xs font-medium py-2 text-indigo-600">
            <!-- <span class="px-2"><span class="font-semibold">23</span> Like </span>  -->

          <!-- username condition -->
          <span v-if="userStore.getUserName == comment.user" class="flex flex-row">
        
            <CommentEditModal v-if="comment.id " :id="comment.id" :commentcontent="comment.comment" />
         
          </span>
          <!-- eof -->
          </p> 
      </div>
      </div>

  </div>
  </div>
  <div v-else> 
<p>No comments</p>

  </div>
  </div>
</template>

<script>
import { currentActivities } from '../../store/currentActs'
import { accountStore } from '../../store/accounts';
import { MEDIA_S3 } from '../../API';
import InlineCommentModal from './../Comment/InlineCommentModal.vue'

// import CommentModal from './../Comment/CommentModal.vue'
import CommentEditModal from './CommentEditModal'

// import DeleteComment from './DeleteComment.vue'

export default {
setup(){
  const commentStore = currentActivities();
  const userStore = accountStore();
  return{
    commentStore,
    userStore
  }
},

  props:['id'],
    components:{
      InlineCommentModal,
      // CommentModal,
    // DeleteComment,
    CommentEditModal
    },
data(){
    return{
        comments:{},
        username:'',
        S3 :MEDIA_S3
    }
},

async created(){
  await this.commentStore.fetchComments(this.id)


},
methods:{

  refressh(){
     this.axios.get('/api/posts/commentlist/'+this.id).then((response)=>{
      this.comments = response.data;
      this.comments.reverse();
      // console.log(response.data)
    }).catch((error)=>{
      console.log(error);
      
    })
  },
   dateformat(date) {
      return this.$moment(date).format('D MMM YYYY')
    },

},
computed:{
  // ...mapGetters({
  //   username: 'getusername'
  // }),
  getusername(){
    return this.$store.getters.getusername.username;
  },
}

}
</script>

