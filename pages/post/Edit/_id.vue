<template>
  <div
    style="margin-bottom: 90rem; max-width: 100%"
    class="flex flex-col items-center mt-10 mb-44 lg:w-4/5 lg:mx-auto lg:max-w-10/12"
  >
    <div class="container mx-2" style="width: 96%">
      <!-- <span class="mx-auto  -mb-96">
        <editor v-model="content" :class="'mb-'+content.length"></editor>
      </span>  -->
      <span v-if="initLoading">
        <h5 class="animate-bounce mt-10">Something great is coming ....</h5>
      </span>
      <div id="editor"></div>
      <!-- <button @click="submit" class="w-9 bg-red-600">SUBMIT</button> -->
      <button 
        @click="submit"
        class="w-full lg:w-2/6 text-center flex flex-row justify-center float-right mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300"
      >
        <span v-if="loading">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>

        SUBMIT
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '../../../API'
import { currentActivities } from '../../../store/currentActs'
import { accountStore } from '../../../store/accounts'
// import editor from "./../quill/editor.vue";
let Quill = {}

if (process.browser) {
  Quill = require('quill')
}

export default {
  name: 'Create',
  layout: 'editor',
   head(){
    return{
      title: "Edit post"
    }
  },
  components: {
    // editor,
  },
  setup() {
    const currentstore = currentActivities()
    const userStore = accountStore()

    return {
      currentstore,
      userStore,
    }
  },

  data() {
    return {
      id:'',
      content: '',
      loading: false,
      q: '',
      initLoading: true,
    }
  },
  methods: {
    submit() {
      const delta =this.q.getContents();
      // const forms = new FormData()
      // forms.append('content',JSON.stringify(delta.ops));
      const data={
        'id':this.id,
        'content':JSON.stringify(delta.ops)
      }

      // forms.append("file[]", e.target.files[0]);
      axios({
        method: 'PATCH',
        url: API_URL + '/api/posts/createdraft/',
        data,
        headers: {
          Accept: 'application/json, text/plain, */* ',
          Authorization: this.userStore.key,
        },
      })
        // axios
        //   .post(API_URL + '/api/posts/create/', forms)
        .then((res) => {
          this.loading = true
          this.$toast.success('Post Drafted', {
            position: 'bottom-center',
            duration: '1000',
            fitToScreen: true,
          })
          // console.log(response);
          // console.log(this.coverimage);
          console.log(res.data)
          setTimeout(()=>{
            this.loading = false;
          },800)
          this.$router.push({ name: 'post-Finish-draftid', params: { draftid: res.data.id } })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    selectLocalImage() {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.click()

      // Listen upload local image and save to server
      input.onchange = () => {
        const file = input.files[0]

        // file type is only image.
        if (/^image\//.test(file.type)) {
          this.saveToServer(file)
        } else {
          console.warn('You could only upload images.')
        }
      }
    },

    saveToServer(file) {
      const fd = new FormData()
      fd.append('image', file)

      axios
        .post(API_URL + '/api/posts/imageupload/', fd)
        .then((response) => {
          console.log(response)
          const url = response.data.image
          this.insertToEditor(url)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    insertToEditor(url) {
      console.log('URL', url)
      // push image url to rich editor.
      const range = this.q.getSelection()
      this.q.insertEmbed(range.index, 'image', `${url}`)
    },
  },
  async mounted() {

    axios.get(API_URL+'/api/drafts/'+this.$route.params.id,{ headers: {
          Accept: 'application/json, text/plain, */* ',
          Authorization: this.userStore.key,
        },}).then((res)=>{
      if(res.data){
 this.content = res.data.post.content;
      this.id = res.data.post.id;
  
      }  })
     




    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image'],
      // [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button
    ]
    this.categories_list = await this.currentstore.categories
    const editorId = '#editor'

    setTimeout(() => {
      this.q = new Quill(editorId, {
        modules: {
          toolbar: toolbarOptions,
        },
        placeholder: 'Compose an epic article...',
        theme: 'snow',
        readonly: false,
        content: this.content,
      })

      const toolbar = this.q.getModule('toolbar')
      toolbar.addHandler('image', () => {
        this.selectLocalImage()
      })
      this.initLoading = false
      const contents =  JSON.parse(this.content)
      this.q.setContents(contents,'api')
    }, 1000)
  },
}
</script>

<style scoped>
@import url('https://cdn.quilljs.com/1.3.6/quill.snow.css');
</style>
