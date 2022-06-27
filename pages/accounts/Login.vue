<template>
  <!-- <div class="min-h-screen flex items-center justify-center bg-gray-50 pb-12 pt-1 px-4 sm:px-6 lg:px-8"> -->

  <div
    class="h-screen  flex items-center justify-center bg-gray-50 pb-12 pt-8 px-6"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-20 w-auto"
          src="./../../assets/m.svg"
          alt="mizomade"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <router-link :to="{path:'/accounts/registration'}" class="font-medium text-indigo-600 hover:text-indigo-500">
            create account
          </router-link>
        </p>
      </div>
      <!-- <form class="mt-8 space-y-6"  method="POST"> -->
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <!-- <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email or username" />
          </div> -->
        <div>
          <label for="username" class="sr-only">Username</label>
          <input
            id="username"
            type="username"
            v-model="loginCredential.username"
            autocomplete="username"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email or username"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            type="password"
            v-model="loginCredential.password"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          @click.prevent="login"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
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
            <!-- <LockClosedIcon v-else class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> -->
          </span>
          Sign in
        </button>
      </div>

      <h3 @click.prevent="back" class="underline">Back</h3>
      <div
        class="fb-like"
        data-share="true"
        data-width="450"
        data-show-faces="true"
      ></div>

      <!-- </form> -->
      <!-- <v-facebook-login app-id="169100638717597"></v-facebook-login> -->

      <!-- <google/> -->
    </div>
  </div>
</template>

<script>
import { accountStore } from '../../store/accounts'
// import VFacebookLogin from 'vue-facebook-login-component-next'

// import Google from './Social/Google.vue'
// import { LockClosedIcon } from '@heroicons/vue/solid'
// import axios from 'axios'
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
export default {
  layout: 'accounts',

  setup() {
    const store = accountStore()
    return {
      store,
    }
  },
  components: {
    // LockClosedIcon,
    //  VFacebookLogin,
    // Google
  },
  data() {
    return {
      loginCredential: {
        username: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    back() {
      this.$nuxt.$router.back()
    },
    // login(){
    //  this.$store.dispatch('userLogin',{username:this.username,password:this.password},)
    //       this.loading = true;
    //       if(this.$store.getters.loggedIn){
    //       setTimeout(()=>this.$root.$toast.success('Login Succesfull!',{position:'top'}),500 )

    //       }

    // }
    //   async login(){
    //     try{
    //      await this.$auth.loginWith('local',{
    //       data:this.loginCredential
    //     })
    //      this.$toast.show({
    //   type: 'success',
    //   title: 'Success',
    //   message: 'Login successful',
    // })
    //     this.$router.push('/')
    //     }
    //     catch(error){
    //       console.log(error);
    //     }

    //   }

    async login() {
      // try{
      // console.log( "USERNAME: " + this.loginCredential.username + this.loginCredential.password)
      // await this.store.fetchUserData();

      await this.store.attemptLogin(
        this.loginCredential.username,
        this.loginCredential.password
      )
      this.$toast.show('Logging in..', {
        duration: 1000,
        position: 'bottom-left',
      })

      setTimeout(() => {
        if (this.store.isLoggedIn) {
          this.$toast.success('Successfully logged in!', {
            position: 'bottom-center',
            duration: '1000',
            fitToScreen: true,
          })
          console.log('loi')
          this.$nuxt.$router.push('/')
        } else {
          this.$toast.error('Username or password does not match', {
            duration: 2000,
            position: 'bottom-center',
          })
        }
      }, 2000)

      // if(this.store.isLoggedIn){
      // this.$router.push('/');

      // }

      // }

      //     catch(err){
      //       this.$toast.show({
      //   type: 'success',
      //   title: 'Success',
      //   message: 'Incorrect Data',
      // })

      //     }
    },
  },
}
</script>
