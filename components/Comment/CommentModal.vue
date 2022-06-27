<!-- <template>

<div>

  <div class="inset-0 flex items-center justify-center">


<button @click="openModal" type="text" class="border w-11/12 ml-2 h-14 my-2 rounded-sm px-2" placeholder="Add comment.." name="comment" id="comment" ></button>

  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full  max-w-md lg:min-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Comment
              </DialogTitle>
              <div class="mt-2">
                <textarea rows="5" cols="32" v-model="comment" class="text-sm text-gray-500 border border-gray-300 rounded-md lg:w-full pl-2 ">
                </textarea>
                
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="combo"
                >
                  Done
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  </div>
</template>

<script>
// import { ref } from 'vue'
import { Ref } from 'nuxt-composition-api'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'

export default {
  data(){
    return{
    comment:''
    }
  },
  props:['id'],
   emits: ["refresh"], 
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },

  setup() {
    const isOpen = Ref(false)

    return {
      isOpen,
      closeModal() {
        isOpen.value = false;
      },
      openModal() {
        isOpen.value = true
      },
    }
  },

  methods:{
    combo(){
      this.postcomment();
      this.closeModal();
      this.refreshlist();
    },

    postcomment(){
      const forms = new FormData();
      forms.append('comment',this.comment)
      this.axios.post('/api/posts/commentlist/'+this.id,forms)
      .then((response)=>{
        console.log(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    },

    refreshlist(){
      this.$emit('refresh')
    }
  }
}
</script> -->
