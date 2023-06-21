import {configureStore , combineReducers } from '@reduxjs/toolkit'
import  userAuthReducer  from './slices/userSlice'
import  allPostsReducer from './slices/postslice'



const store = configureStore({
  reducer:{
    userAuth:userAuthReducer ,
    allPosts: allPostsReducer
  }
})


export default store