<template>
  <div class="flex items-center justify-center lg:p-12 p-6">
 

  <div class="mx-auto w-full lg:max-w-[550px]">
    <span class="mx-auto text-center">
    <h1 class="text-3xl font-bold ">Contact Us</h1>
  <h2 class="text-lg font-light mb-8">Have any questions? We'd love to hear from you.❤️</h2>

    </span>
 
      <div class="mb-5">
        <label
          for="name"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Full Name
        </label>
        <input type="text" id="name" placeholder="Full Name" v-model="name" required
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="email"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Email Address
        </label>
        <input
        v-model="email"
          type="email"
          name="email"
          id="email"
          placeholder="example@domain.com"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="subject"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Subject
        </label>
        <input
        v-model="subject"
          type="text"
          name="subject"
          id="subject"
          placeholder="Enter your subject"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="message"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Message
        </label>
        <textarea
        v-model="message"
          rows="4"
          name="message"
          id="message"
          placeholder="Type your message"
          class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        ></textarea>
      </div>
      <div>
        <button @click.prevent="giveFeedback"
          class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Submit
        </button>
      </div>
  </div>
</div>
</template>


<script>
import axios from 'axios'
import { API_URL } from './../../API'

export default{
  data(){
    return {
      name:'',
      email:'',
      subject:'',
      message:'',
      success:false
    }
  },
  methods:{
    giveFeedback(){
      const forms = new FormData();
      forms.append('name',this.name);
      forms.append('email',this.email);
      forms.append('subject',this.subject);
      forms.append('message',this.message);



      axios.post(API_URL+'/api/contactus/',forms, {
        headers: {
          Accept: "application/json, text/plain, */* ",

        },
      }).then(()=>{
        this.success = true;
this.$toast.success('Thank you for your response!', {
            position: 'top-center',
            duration: '2000',
            fitToScreen: true,
          })      })
    }
  }


}
</script>