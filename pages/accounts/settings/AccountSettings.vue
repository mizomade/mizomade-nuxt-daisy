<template>
  <div class="container mx-auto w-10/12 lg:w-3/6 my-2 mb-10">
  <p class="text-xl font-semibold my-2">Account Settings</p>
    <hr class="lg:hidden">
       
<div class=" flex-col hidden lg:block">
  <div class="divider"></div>
  <nuxt-link to="/accounts/settings/changepassword">
  <div class="underline">
    Change Password
  </div>
  <p class="text-xs lg:text-md font-light  ">Change your account password,this may require you to type in your old password</p>

  </nuxt-link>

  <div class="divider"></div>
  

    <nuxt-link to="/accounts/settings/changepassword">
  <div class="underline">
    Change Password
  </div>
  <p class="text-xs lg:text-md font-light  ">This will require an OTP send to your previous contact number</p>

  </nuxt-link>
  <div class="divider"></div>

   <nuxt-link to="/accounts/settings/changepassword">
  <div class=" underline">
    Deactivate account
  </div>
  <p class="text-xs lg:text-md font-light  ">Doing this you will deactivate your account and your post</p>

  </nuxt-link>
  <div class="divider"></div>
</div>

<div class="flex flex-col lg:hidden">

            <!-- <router-link :to="{name:'changepassword'}">  -->
  <div class="rounded-md shadow-sm mb-2 mt-4 p-3 hover:shadow-lg cursor-pointer lg:hidden">
      <div class="flex flex-row items-center">
          <div class="flex flex-col w-full lg:w-11/12">
                <div class="flex flex-row items-center lg:items-end ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-14 lg:w-14 lg:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg> 
                    <p class="text-lg leading-6 lg:text-2xl font-semibold">Change Password</p>
                </div>
 
              <p class="text-xs lg:text-md font-light ml-2 ">Doing this you will deactivate your account and your post</p>
            </div>

           <svg xmlns="http://www.w3.org/2000/svg" class=" h-10 w-10 lg:h-14 lg:w-14 content-end" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
           </svg>
        </div>
  </div>
            <!-- </router-link> -->



  <div class="rounded-md shadow-sm mb-2 mt-4 p-3 hover:shadow-lg cursor-pointer lg:hidden">
      <div class="flex flex-row items-center">
          <div class="flex flex-col w-11/12">
                <div class="flex flex-row items-center lg:items-end ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-14 lg:w-14 lg:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p class="text-lg leading-6 lg:text-2xl font-semibold">Change Phone Number</p>
                </div>
 
              <p class="text-xs lg:text-md font-light ml-2 ">This will require an OTP send to your previous contact number</p>
            </div>

           <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-14 lg:w-14 place-content-end" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
           </svg>
        </div>
  </div>


    <div class="rounded-md shadow-sm mb-2 mt-4 p-3 hover:shadow-lg cursor-pointer lg:hidden">
      <div class="flex flex-row items-center">
          <div class="flex flex-col w-11/12">
                <div class="flex flex-row  items-center lg:items-end ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-14 lg:w-14 lg:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                    </svg>
                    <p class="text-lg leading-6 lg:text-2xl font-semibold">Deactivate account</p>
                </div>
 
              <p class="text-xs lg:text-md font-light ml-2 ">Doing this you will deactivate your account and your post</p>
            </div>

           <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 lg:h-14 lg:w-14 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
           </svg>
        </div>
  </div>



</div>

  
  
  </div>
</template>

<script>

export default {

}
</script>

<style>

</style>s