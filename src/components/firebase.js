// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAXBkkWU53UUswiOUbeh2lNcaPvGcxE3Mo",
  authDomain: "clone-a1afd.firebaseapp.com",
  projectId: "clone-a1afd",
  storageBucket: "clone-a1afd.appspot.com",
  messagingSenderId: "422276876822",
  appId: "1:422276876822:web:0e2a63237c3e2494c80337",
  measurementId: "G-E8Y9Y9WJKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)