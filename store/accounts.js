import { defineStore } from 'pinia'
import axios from 'axios'

import {API_URL} from './../API'


// const instance=axios.create({
//     baseURL:API_URL,
//     headers:{
//         'Content-Type':'application/json',
//                     'Acess-Control-Allow-Origin':'*',

//                     'Authorization':`Bearer 8513698f66b87367380d51567f1fcba10fc72c19}`,
//                     'Accept': "application/json"
//         }
//     })

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
 export const accountStore = defineStore('userStore', {

    state: () => {
        return {
          // all these properties will have their type inferred automatically
          userMeta:process.client ? localStorage.getItem('skey') : [],
          userInfos:[],
          userPosts:[],
          skey: process.client ? localStorage.getItem('skey') : null,
          bookmarkedList:[],
          likedList:[],
          session_id:'',

        }
      },

      getters:{
          key(state){
            return "Token " + state.skey
          },
          isLoggedIn(state){
                if(state.skey){
                    return true
                }
                else{
                    return false
                }
          },
          getUserName(state){
              return state.userMeta.username
          },
          currentPageBookmarkValue(state){
            return (bookmarkedValue) => state.bookmarkedList.find((bookmark) => bookmark.id === bookmarkedValue)

          },
          getBookmarkedList(state){
            return state.bookmarkedList;
          }


      },
      actions:{
          attemptLogin( username,  password){
              const form = new FormData();
              form.append('username', username)
              form.append('password',password)
              // console.log("IN STATE USERNAME AND PASSWORD"   + username.toString() + password)
            axios.post(API_URL+`/dj-rest-auth/login/`,form).then(res => {
                // console.log(res.data.key)
                if(process.client) {
                  localStorage.setItem("skey", res.data.key)
                }
                this.skey = res.data.key;
                this.fetchUserData();
                this.fetchUserBookmarks();
                
            });
            
          },
          async fetchUserData(){
                
              await axios({method:'POST',url:API_URL+'/api/user/getmyprofile/',
                  headers:{
               
                   'Accept': 'application/json, text/plain, */* ',
            

                    "Authorization": this.key,
                  },
              }).then((response)=>{
                  // console.log(response.data);
                  if(process.client) {
                    localStorage.setItem("userMeta", JSON.stringify(response.data[0]));
                    localStorage.setItem("userInfos", JSON.stringify(response.data[1]));
                    localStorage.setItem("userPosts", JSON.stringify(response.data[2]));


                  }
                   this.userMeta =  response.data[0];
            this.userInfos =  response.data[1];
            this.userPosts =  response.data[2];
              });


          },
          async fetchUserBookmarks(){
                
            await axios({method:'get',url:API_URL+'/api/bookmarkedlist/',
                headers:{
             
                 'Accept': 'application/json, text/plain, */* ',
                 "Authorization": this.key,
                },
            }).then((response)=>{
                // console.log(response.data);
                 this.bookmarkedList =  response.data;
      
            });


        },

        attemptLogout(){
            axios.post(API_URL+`/dj-rest-auth/logout/`).then(() => {
                this.userPosts=[];
                this.userMeta= [];
                this.skey= null;
                this.bookmarkedList=[];
                this.likedList=[];
                this.userInfos=[];
              
          });
          
        },
       async deletePost(id){
          await axios({method:'delete',url:API_URL+'/api/posts/delete/'+id,
            headers:{
               'Accept': 'application/json, text/plain, */* ',
               "Authorization": this.key,
             },
          })
        },
         moveToDrafts(id){
           axios({method:'get',url:API_URL+'/api/posts/movetodraft/'+id,
          headers:{
            'Accept': 'application/json, text/plain, */* ',
            "Authorization": this.key,
          },
        })
        },
        publishPost(id){
          axios.get(API_URL+'/api/posts/publish/'+id).then(()=>{
            
            })
        },

          

      }

  // other options...
})