
<template>
  <div
    class=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
               <img class="mx-auto h-20 w-auto" src="../../assets/m.svg" alt="mizomade" />

        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ " " }}
          <router-link
            :to="{ path: '/accounts/login' }"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            login
          </router-link>
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <span v-if="username_exists" class="text-sm text-red-500" >Username Already Exist</span>
            <span v-if="empty[0]" class="text-sm text-red-500" >This field cannot be left blank</span>

            <label for="username" class="sr-only">Username</label>
            <input
            @keyup.enter="usernamevalidation"
              id="username"
              name="username"
              type="text"
              autocomplete="username"
              v-model="username"
              required=""
              :class="username_exists||empty[0]?
              'appearance-none  relative block w-full px-3 py-2 border border-red-600 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              :
              'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'"
              placeholder="Username"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              v-model="email"
              required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md my-2  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address (optional)"
            />
          </div>
          <div>
            <span v-if="phone_exists" class="text-sm text-red-500">Phone Number Already exist</span>
          
            <span v-if="empty[2]" class="text-sm text-red-500">Phone Number must not be less than 9 digit</span>
            
            <label for="phone" class="sr-only">Phone Number</label>
            <span class="flex flex-row items-center space-x-2">
   <vue-country-code class="h-9"
                  @onSelect="onSelect"
                  :preferredCountries="['in', 'us', 'gb']">
                </vue-country-code>
            <input
              @keyup.enter="phonevalidation"
              id="phone"
              name="phone"
              type="telephone"
              autocomplete="phone"
              v-model="phone"
              required=""
              :class="phone_exists||empty[2]?
              'appearance-none  relative block  px-3 w-full py-2 border border-red-600 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              :
              'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'"              placeholder="Phone number"
            />
            </span>
           
          </div>
            <span v-if="password_not_same" class="text-sm text-red-500" >Password must match and must be more that 5 characters</span>
            <span v-if="empty[3]||empty[4]" class="text-sm text-red-500" >Password field must not be left empty</span>

          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="password"
              v-model="password1"
              required
             :class="password_not_same||empty[3]?
              'appearance-none  relative block w-full px-3 py-2 border border-red-600 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              :
              'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'"
              placeholder="Password"
            />
          </div>
          <div>
            <label for="password2" class="sr-only">Confirm Password</label>
            <input
            @keyup.enter="passwordcheck"
              id="password2"
              name="password2"
              type="password"
              autocomplete="password"
              v-model="password2"
              required=""
              :class="password_not_same||empty[4]?
              'appearance-none  relative block w-full px-3 py-2 border border-red-600 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              :
              'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'"
              placeholder="Retype password"
            />
          </div>
        </div>
      

        <div>
          <button
            @click="check"
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
               <span v-if="loading">
                 <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              </span>

              <!-- <LockClosedIcon v-else
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              /> -->
            </span>
            Sign Up
          </button>
        </div>
      </div>
          <h3 @click.prevent="back" class="underline cursor-pointer">Back</h3>

    </div>

  </div>
</template>

<script>
// import { LockClosedIcon } from "@heroicons/vue/solid";
import axios from 'axios';
import { API_URL } from '../../API';
import { accountStore } from '~/store/accounts';

export default {
  layout:'accounts',
   head(){
    return{
      title: "Registration"
    }
  },
  components: {
    
    // LockClosedIcon,
  },
  setup(){
    const userAccount = accountStore();
    return {
      userAccount
    }
  },
  data() {
    return {
      username: "",
      password1: "",
      password2: "",
      email: "",
      country_code:'',
     
      phone: "",
      username_exists: false,
      phone_exists: false,
      password_not_same:false,
      empty:[],
      loading:false,
    };
  },
  methods: {
 back() {
      this.$nuxt.$router.back()
    },
     onSelect({name, iso2, dialCode}) {
       console.log(name, iso2, dialCode);
       this.country_code = '+'+dialCode;
     },
    check(){
      console.log("CHECK user",this.usernamecheck())
      console.log("CHECK phone",this.phonecheck())
      console.log("CHECK pass",this.passwordcheck())

      if(this.usernamecheck()  && this.phonecheck() && this.passwordcheck())
      { 
            
    
        console.log("OK");
        this.submit();
      }
      else{
        console.log("NOT OK")
      }

    },
    

    submit() {
      const forms = new FormData();
      forms.append("username", this.username);
      forms.append("password1", this.password1);
      forms.append("password2", this.password2);
      forms.append("phone",this.country_code + this.phone );
      forms.append("email", this.email);

     axios
        .post(API_URL+"/api/user/register/", forms)
        .then((response) => {
          console.log(response);
          this.userAccount.session_id = response.data.status
          this.loading=true;
          this.$router.push({
            name: "accounts-phone-username-Otp",
            params: { phone:this.phone,username: this.username },
          });
        })
        .catch((error) => {
          console.log(error);
        });

         this.$router.push({
            name: "accounts-phone-username-Otp",
            params: { phone:this.country_code + this.phone,username: this.username },
          });

      // this.$store.dispatch('registration',{username:this.username,password1:this.password1,
      // password2:this.password2})
    },
    passwordcheck() {
      if ((this.password1 === this.password2) && (this.password1.length >5) ) {
        this.password_not_same = false
        return true;
      } 
        
        else if(this.password1.length === 0 || !this.password2.length === 0 )
        {
          this.empty[3]=true
          this.empty[4]=true
                  return false;
        }
        else{
          this.password_not_same = true
                  return false;
          
        }


    },
    usernamecheck(){
      if((this.username_exists === false) && (this.username.length > 0)){
        

        return true
      }
      else if(this.username.length === 0){
          this.empty[0]=true
          return false
        }
        else{
         this.username_exists =true
        return false
        }
   
      
    },
    phonecheck(){
      if(this.phone_exists === false && this.phone.length > 9 ){
        return true

      }
      else{
        if(this.phone.length <= 9){
          this.empty[2]=true
        }
        else{
        this.phone_exists = true
          
        }
        return false
      }
    },

    usernamevalidation() {
      axios.get(API_URL+`/api/user/profile/usernamevalidation/` + this.username)
        .then((response) => {
          console.log(response.data[0]);

          if (response.data[0] === 0) {
            this.username_exists = true;
            this.empty[0]=false
            // this.username_error_message = response.data[1];
          } else if (response.data[0] === 1) {
            this.username_exists = false;
            // this.username_error_message = response.data[1];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
      phonevalidation() {
      axios.get(API_URL+`/api/user/phonenumbervalidation/` + this.phone)
        .then((response) => {
          console.log(response.data[0]);

          if (response.data[0] === 0) {
            this.phone_exists = true;
            this.empty[2]=false
            // this.username_error_message = response.data[1];
          } else if (response.data[0] === 1) {
            this.phone_exists = false;
            // this.username_error_message = response.data[1];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },
};
</script>
