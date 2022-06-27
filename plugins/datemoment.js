import Vue from 'vue'


if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({ 
    methods:{
      dateformat(date){
              return this.$moment(date).format('D MMM YYYY');
      },
      mediafetch(payload){
        return 'http://127.0.0.1:8000'+payload;
      }
    }
   }) // Set up your mixin then
}

// Vue.mixin({
//     methods:{
//         dateformat(date){
//                 return this.$moment(date).format('D MMM YYYY');
//         },
//         mediafetch(payload){
//           return 'http://127.0.0.1:8000'+payload;
//         }
//       }
// })

// export default dateformat;


