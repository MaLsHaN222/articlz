import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    username: '' ,
    userId: '' ,
    reloadCategory: false 
}

export const userAuth = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {displayName , uid} = action.payload
            state.username= displayName
            state.userId = uid
        } ,
        setRealoadCategory: (state , action) => {
            state.reloadCategory = action.payload
        }
    }
})

export const { addUser , setRealoadCategory } = userAuth.actions;

export default userAuth.reducer;