import { defineStore } from "pinia";
import axios from 'axios'

import {API_URL} from './../API'

export const currentActivities = defineStore(
    'currents',{
        state: () => {
            return {
              // all these properties will have their type inferred automatically
              currentPostPage:API_URL+'/api/posts/?page=1',
              nextPage:null,
              prevPage:null,
              posts: [],
              currentSlug:'',
              currentSlugComments:[],
              categories:[],
              fromWhereLeftOff:'/'
              
            }
          },
          getters:{
            currentPage(state){
                return state.currentPostPage
            },

              postList(state){
                  return state.posts
              },
              categoriesList(state){
                  return state.categories
              },
              commentsList(state){
                  return state.currentSlugComments
                  
              }
          },
          actions:{
               fetchPosts(){
                axios.get(API_URL+`/api/posts/`).then(res => {
                    this.posts = res.data;
                });
              },
              updatePosts(data){
                axios.get(data).then(res => {
                    this.posts =null;
                    this.posts = res.data
                });
              },
              fetchCategoriesList(){
                axios.get(API_URL+`/api/categories/`).then(res => {
                    this.categories = res.data
                });

              },
              fetchComments(id){
                axios.get(API_URL+'/api/posts/commentlist/'+id).then((response)=>{
                    this.currentSlugComments = response.data;
                  
                  })
              },
              findIndexById(id) {
                return this.currentSlugComments.findIndex((item) => item.id === id);
              },
              deleteComment(id){
                const index = this.findIndexById(id);
                if (index === -1) return;

                this.currentSlugComments.splice(index, 1);

              },
              updateComment(id, payload) {

                if (!id || !payload) return;
                const comment = this.currentSlugComments.find((obj) => obj.id === id);
                if (comment) {
                  comment.comment = payload
                }

          
                // const index = this.findIndexById(id);
                // console.log("INdex",this.currentSlugComments[index])
                
                // this.currentSlugComments[index].$patch({'comment':payload});
          
                // if (index !== -1) {
                //   this.currentSlugComments[index].push({'comment':payload});
                // }
              },

              updateComments(id){
                this.currentSlugComments = '';
                this.fetchComments(id);
              },

              deletePost(slug){
                axios.get(API_URL+'api/posts/'+slug).then(()=>{
                    
                  
                  })
              },
              moveToDrafts(id){
                axios.get(API_URL+'/api/posts/movetodraft/'+id).then(()=>{

                  })
              },
              publishPost(id){
                axios.get(API_URL+'/api/posts/publish/'+id).then(()=>{
                  
                  })
              },

          }
    }
)