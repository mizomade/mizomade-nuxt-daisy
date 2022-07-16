<template>
  <div
    
    class="flex flex-col justify-center items-start px-2 mr-1 mt-10 mb-44 lg:w-4/5 mx-auto "
  >
    <div class="container mx-2" >
      <div class="flex lg:flex-row flex-col md:flex-wrap">
        <div class="mb-6 flex flex-col">
          <label v-if="errors.titleerror" class="text-red-500 text-sm">
            Tile should not be empty 
          </label>
          <label
            class="mr-4 text-gray-700 font-bold inline-block mb-2"
            for="name"
            >Title</label
          >
          <input
            type="text"
            class="border bg-gray-100 py-2 px-4 w-auto lg:w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            placeholder="Title"
            v-model="title"
          />
        </div>
image {{coverimage.length}}
        <div class="mb-6 flex flex-col lg:ml-10" v-if="categories_list">
          <label
            class="mr-4 text-gray-700 font-bold inline-block mb-2"
            for="name"
            >Category</label
          >
          
           <label v-if="errors.categoryerror" class="text-red-500 text-sm">
            Select a category 
          </label>
          <select
            class="border bg-gray-100 py-2 px-4 w-auto lg:w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            placeholder="Category"
            v-model="category"
            @click="category_onchange($event)"
          >

            <option
        
              v-for="cat in categories_list"
              :key="cat.name"
              :value="cat.id"
              class="rounded"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>
      <!-- <span class="border my-2 border-gray-200 hover:bg-gray-200 hover:shadow-md cursor-pointer rounded px-10 py-10 text-center  bg-gray-100">Cover image</span> -->

      <div class="mb-2 w-auto lg:w-1/5" v-if="!previewimage">
        <label class="mr-4 text-gray-700 font-bold inline-block mb-2">
          Cover photo
        </label>
         <label v-if="errors.covererror" class="text-red-500 text-sm">
            Coverimage section must not be left empty
          </label>
        <div
          class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
        >
          <div class="space-y-1 text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label
                for="file-upload"
                class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  @change="submitcoverimage"
                />
              </label>
              <!-- <p class="pl-1">or drag and drop</p> -->
            </div>
            <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <span v-if="previewimage" style="margin: 1rem 0">
        <img :src="previewimage" style="width: auto; height: 40%" />
        <label
          for="file-uploadagain"
          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >Change
          <input
            id="file-uploadagain"
            name="file-uploadagain"
            type="file"
            class="sr-only"
            @change="submitcoverimage"
            placeholder="Change"
          />
        </label>
      </span>
      <br>

      <!-- 
      <span class="mx-auto  -mb-96">
        <editor v-model="content" :class="'mb-'+content.length"></editor>
      </span> -->


      <p v-if="errors.tagserror" class="text-red-500 text-sm">
        Give atleast one tag or remove the ending comma
      </p>
        <label class="mr-4 text-gray-700 font-bold inline-block mb-2">
          Tags
        </label>
        <br>
      <input
        type="text"
        class="border bg-gray-100 py-2 px-4 my-2 w-auto lg:w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        placeholder="tags|  Eg:love,proverb "
        v-model="tags"
        aria-placeholder="tags: eg love, proved"
      />
      <br />

      <!-- <button @click="submit" class="w-9 bg-red-600">SUBMIT</button> -->
     <button 
        @click="submit"
        class="w-full lg:w-2/6 text-center flex flex-row justify-center float-left mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300"
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
import { accountStore} from '../../../store/accounts'

export default {
  name: 'finish',
  layout:'editor',
   head(){
    return{
      title: "Finish Post"
    }
  },
  components: {
    // editor,
  },
  setup() {
    const currentstore = currentActivities();
    const userStore = accountStore();

    return {
      currentstore,
      userStore
    }
  },

  data() {
    return {
      categories_list: '',
      title: '',
      category: '',
      tags: '',
      coverimage: '',
      previewimage: '',
      loading: false,
      q: '',

      errors: {
        tagserror: false,
        categoryerror: false,
        titleerror: false,
        covererror: false,
      },

    }
  },
  methods: {
    submitcoverimage(event) {
      // console.log(event.target.files[0].name);
      this.coverimage = event.target.files[0]
      // console.log(this.coverimage.name);
      this.previewimage = URL.createObjectURL(event.target.files[0])
    },

    titlevalidation() {
      if (
        this.title.length !== 0 
      ) {
        this.errors.titleerror = false
        console.log("TITLE ERROR",this.errors.titleerror)
        return true
      } else {
        this.errors.titleerror = true
        return false
      }
    },

     categoryevalidation() {
      if (
        this.category.length !== 0 
      ) {
        this.errors.categoryerror = false
        return true
      } else {
        this.errors.categoryerror = true
        return false
      }
    },
    tagsvalidation() {
      if (
        this.tags.length !== 0 
      ) {
        this.errors.tagserror = false
        return true
      } else {
        this.errors.tagserror = true
        return false
      }
    },

    coverimagevalidation() {
      if (
        this.coverimage.length !== 0 
      ) {
        this.errors.covererror = false
        return true
      } else {
        this.errors.covererror = true
        return false
      }
    },
    validation() {
      // if(this.errors.tagserror || this.errors.tagserror || this.errors.categoryerror || this.errors.titleerror)
      // {
      //   return false;
      // }
      // else if(this.errors.tagserror && ){

      // }
      if (this.titlevalidation() && this.categoryevalidation() && this.coverimagevalidation() && this.tagsvalidation() ) {
        return true
      } else {
        return false
      }
      // if(this.titlevalidation()){
      //   return true
      // }
      // else {
      //   return false
      // }
    },

    submit() {
      console.log('CPVERE', this.coverimage.name)
      this.loading = true

      if (this.validation() ) {

        const forms = new FormData()
        forms.append('id',this.$route.params.draftid)
        forms.append('title', this.title)
        forms.append('coverimage', this.coverimage)


        forms.append('category', this.category)
        forms.append('tags', this.tags)

        // forms.append("file[]", e.target.files[0]);
        axios.patch(API_URL+'/api/posts/create/',
        forms,
                  {headers:{
               
                  //  'Accept': 'application/json, text/plain, */* ',
                  // 'Accept':'application/json',
                    "Authorization": this.userStore.key,
                    "Content-Type": "multipart/form-data",
                  },
              })
        // axios
        //   .post(API_URL + '/api/posts/create/', forms)
          .then(() => {
            this.$toast.success('Post Successfull!', { position: 'top' ,duration:500})
            this.userStore.fetchUserData();
            // console.log(response);
            // console.log(this.coverimage);
            this.$router.push('/')
          })
          .catch((error) => {
            if (this.tags.endsWith(',')) {
              this.errors.tagserror = true
            } else {
              this.errors.tagserror = false
            }

            // console.log("Content", this.content);
            console.log(error)
          })
      } else {
        console.log('HUGE ERROR')
      }
    },

    category_onchange(event) {
      this.category = event.target.value
    },


  },
  async mounted() {
  

  
    this.categories_list = await this.currentstore.categories;
    axios.get(API_URL+'/api/drafts/'+this.$route.params.draftid,
      {headers:{
               
                  //  'Accept': 'application/json, text/plain, */* ',
                  // 'Accept':'application/json',
                    "Authorization": this.userStore.key,
                    "Content-Type": "multipart/form-data",
                  },
              }).then((res)=>{
      // if(res.data){
      console.log("RESPONE",res.data)

     this.title = res.data.post.title;
      // this.category = res.data.post.category;
      // this.author = res.data.post.author;
      this.tags = res.data.post.tags;
      // this.coverimage = res.data.post.coverimage;
      // this.previewimage = res.data.post.coverimage;

      // }
     

      
    })

  },
}
</script>

