import { onAuthStateChanged } from 'firebase/auth';
import React from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebase';
import { addUser } from '../redux/slices/userSlice';


export let userData ;
export const getuser = async() => {
    const dispatch = useDispatch()
  await onAuthStateChanged(auth, (user) => {
    if (user) {
     dispatch(addUser(user))
   } else {
     // User is signed out
     // ...
   }
 });
}
