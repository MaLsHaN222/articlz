import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [] ,
    category : ['Technology', 'Science' ,'Life' , 'Educational', 'History' , 'Social', 'Art', 'News', 'Travel' , 'Society' , 'Culture' , 'Environment'] ,
    editPost: {} ,
    readPost: {}
}


export const allPosts = createSlice({
    name:'allPosts' ,
    initialState ,
    reducers:{
        getAllPosts: (state , action)=>{
            const data = action.payload
            data.forEach((post) => {
                const check = state.posts.includes(post)
                if(check===false){
                    state.posts.push(post)
                }
            });
        } ,
        getEditPost: (state , action) =>{
            state.editPost = action.payload
        } ,
        getReadPost: (state , action) =>{
            state.readPost = action.payload
        }
    }
})


export const {getAllPosts , getEditPost , getReadPost} = allPosts.actions;

export default allPosts.reducer;