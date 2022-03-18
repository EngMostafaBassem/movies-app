// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHeTtupCxIKyGb0xHBhTxsoqhHnBNTXcU",
  authDomain: "movie-app-928e6.firebaseapp.com",
  projectId: "movie-app-928e6",
  storageBucket: "movie-app-928e6.appspot.com",
  messagingSenderId: "718545530116",
  appId: "1:718545530116:web:f95bad1cf531f9ea053451"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)