// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIl3pXkIChoB-z9kMn6oi_erMAhjMOAgY",
  authDomain: "projet-final-de7c9.firebaseapp.com",
  projectId: "projet-final-de7c9",
  storageBucket: "projet-final-de7c9.firebasestorage.app",
  messagingSenderId: "310969102152",
  appId: "1:310969102152:web:7d4192918277e578158d7d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
