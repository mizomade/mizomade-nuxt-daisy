
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
Enter OTP        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <span @click="resend" class="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500">
            Resend OTP
          </span>
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <span v-if="error" class="text-red-600 text-base">
          Incorrect OTP
          </span>
            <div>
            <label for="OTP" class="sr-only">Enter OTP</label>
            <input id="email-address" name="OTP" type="text" autocomplete="OTP" v-model="otp" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="OTP" />
          </div>
       
        </div>


        <div>
          <button @click="submit" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- <LockClosedIcon  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> -->
            </span>
            Submit
          </button>
        </div>
      </div>
          <h3 @click.prevent="back" class="underline cursor-pointer">Back</h3>

    </div>
  </div>
</template>

<script>
// import { LockClosedIcon } from '@heroicons/vue/solid'
import axios from 'axios';
import { API_URL } from '../../../../API';
import { currentActivities } from '../../../../store/currentActs';
import { accountStore } from '~/store/accounts';

export default {
  layout:'accounts',
   head(){
    return{
      title: "OTP Registration"
    }
  },
  components: {
    // LockClosedIcon,
  },
  setup(){
    const store = currentActivities();
    const userStore = accountStore();
    return{store,userStore}
  },
  data(){
    return{
      username:this.$route.params.username,
      otp:'',
      phone:this.$route.params.phone,
      error:false
  
    }
  },
  methods:{
     back() {
      this.$nuxt.$router.back()
    },
    submit(){
      const forms = new FormData();
        
      forms.append('otp',this.otp);
      forms.append('username',this.$route.params.username);
      forms.append('phone',this.$route.params.phone);
      forms.append('session',this.userStore.session_id);




      axios.post(API_URL+'/api/user/otpverification/',forms).
      then((response)=>{
        console.log(response);
        this.error = false
        this.$router.push({path:this.store.fromWhereLeftOff});
      }).
      catch((error)=>{
        console.log(error);
        this.error = true
      })

      // this.$store.dispatch('registration',{username:this.username,password1:this.password1,
      // password2:this.password2})

    },

    resend() {
      const forms = new FormData();
      forms.append("username", this.username);
    //   forms.append("password1", this.password1);
    //   forms.append("password2", this.password2);
      forms.append("phone", this.phone);
    //   forms.append("email", this.email);

      axios.post(API_URL+"/api/user/resendotp/", forms)
        .then((response) => {
          console.log(response);
        //   this.$router.push({
        //     name: "otp",
        //     params: { username: this.username },
        //   });
        })
        .catch((error) => {
          console.log(error);
        });

      // this.$store.dispatch('registration',{username:this.username,password1:this.password1,
      // password2:this.password2})
    },
  }
}
</script>