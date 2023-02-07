
<template>
  <div
    class=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 h-screen">
      <div>

        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot password
        </h2>
<h2 class="mt-6 text-center text-1xl font-medium text-gray-700">
          Enter your registered phone numnber
        </h2>     
      </div>
      <div class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
       
          <div>
            <span v-if="!phone_exists" class="text-sm text-red-500">Phone Number Does not exist</span>
          
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
              :class="!phone_exists||empty[2]?
              'appearance-none  relative block  px-3 w-full py-2 border border-red-600 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              :
              'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'"              placeholder="Phone number"
            />
            </span>
           
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
            Send OTP
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
import { API_URL } from '../../../API';
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
    
      country_code:'',
     
      phone: "",
      phone_exists: true,
      empty:[],
      loading:false,
    };
  },
  methods: {

     onSelect({name, iso2, dialCode}) {
       console.log(name, iso2, dialCode);
       this.country_code = '+'+dialCode;
     },
    check(){


      if( this.phonecheck() )
      { 
        this.phonevalidation();
            
    
        // this.submit();
        console.log("OK")
      }
      else{
        console.log("NOT OK")
      }

    },
    

    submit() {
      const forms = new FormData();
    //   forms.append("username", this.username);
 
      forms.append("phone",this.country_code + this.phone );

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
 

    phonecheck(){
      if(this.phone_exists === true && this.phone.length > 9 ){
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

   
      phonevalidation() {
      axios.get(API_URL+`/api/user/phonenumbervalidation/` + this.phone)
        .then((response) => {

          console.log(response.data[0]);

          if (response.data[0] === 0) {
            this.phone_exists = true;
            this.empty[2]=false
            // this.username_error_message = response.data[1];
          } else if (response.data[0] === 1) {
            this.phone_exists = true;
            this.empty[2]=true

            // this.username_error_message = response.data[1];
          }
        })
        .catch((error) => {
          console.log("ERROR",error);
        });
    },

  },
};
</script>
