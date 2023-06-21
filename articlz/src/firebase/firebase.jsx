import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCNbXjhOEJTxpz_KFATBeNDPPrBotVQth8",
  authDomain: "articlz-febd6.firebaseapp.com",
  projectId: "articlz-febd6",
  storageBucket: "articlz-febd6.appspot.com",
  messagingSenderId: "670365058966",
  appId: "1:670365058966:web:22a374b61272819583ffb7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)