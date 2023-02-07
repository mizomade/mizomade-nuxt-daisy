<template>
  <div class=" flex items-center justify-center bg-gray-50 pb-12  px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h4 v-if="success"> Password Changed Successful</h4>
        <h2 class="mt-6 text-center text-xl font-extrabold text-gray-900">
         Change Password
        </h2>
 
      </div>

        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm space-y-3">

            <div>
            <label for="old_password" class="sr-only">Old Password</label>
            <input id="old_password"  type="password" v-model="old_password" autocomplete="old_password" required="" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Old Password" />
          </div>
          <div>
            <label for="password1" class="sr-only">New Password</label>
            <label v-if="error2" for="password1" class="text-red-500">Password does not match</label>
            <label v-if="error4" for="password1" class="text-red-500">Password is too short</label><br>
            <label v-if="error5" for="password1" class="text-red-500">Password cannot be empty</label>



            <input id="password1" type="password" v-model="new_password1" autocomplete="new-password" required="" :class="error2||error4||error5 ? 
            'appearance-none rounded relative block w-full px-3 py-2 border border-red-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            :
            'appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'" placeholder="New Password" />
          </div>
          <div>
            <label for="password2" class="sr-only">Confirm New Password</label>
 <input id="password2" type="password" v-model="new_password2" autocomplete="new-password" required="" :class="error2||error4||error5 ? 
            'appearance-none rounded relative block w-full px-3 py-2 border border-red-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            :
            'appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'" placeholder="Confirm New Password" />          </div>
        </div>

        <div class="flex items-center justify-between">
          

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button type="submit" @click.prevent="check" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Change Password
          </button>
        </div>
        <div
  class="fb-like"
  data-share="true"
  data-width="450"
  data-show-faces="true">
</div>

      <nuxt-link to="/accounts/settings/accountsettings" class="underline cursor-pointer">Back</nuxt-link>

    </div>
  </div>
</template>

<script>



export default {
  layout:'accounts',
  components: {

  },
  data(){
    return{
  
      old_password:'',
      new_password1:'',
      new_password2:'',
      success:false,
      error1:false,
      error2:false,
      error3:false,
      error4:false,
      error5:false,


    }
  },

  // errror 1 = password nto correct
  // error2 = password not match
  // error3 select other password
  // error4 password too short
  methods:{
   async submit(){
       var forms = new FormData();
       forms.append('old_password',this.old_password);
       forms.append('new_password1',this.new_password1);
       forms.append('new_password2',this.new_password2);
       await this.axios.post('/dj-rest-auth/password/change/',forms).
       then(()=>{
          //  console.log(response.data['detail']);
           this.$root.$toast.success('Password Changes Succesfull!',{position:'top'});

          
          //  setTimeout(() => this.success = false, 5000);
                    this.$router.push({name:'settings'});
       }).
       catch((error)=>{
           console.log(error);
       })

   },
   check(){
    if(this.notempty && this.same() && this.notshort()){
      this.submit();
    }
    else{
      console.log("ERROR")
    }
   },
   notempty(){
     if(this.new_password2.length == 0){
         this.error5=true;
         return false
       }
       else{
         this.error5=false;
         return true;
       }
     
   },
   same(){
     if(this.new_password1 == this.new_password2){
       this.errror2=false;
       return true
     }
     else{
       this.error2=true;
       return false
     }

   },
   notshort(){
       if(this.new_password2.length <=4 ){
         this.error5=true
         return false
       }
       else{
         this.error5=false
         return true
       }

   }

  }
}
</script>