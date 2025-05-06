import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAvI7nRWtPZ73Jv9IsDNExtQU1QNC1esbw",
    authDomain: "chat-app-12128.firebaseapp.com",
    projectId: "chat-app-12128",
    storageBucket: "chat-app-12128.firebasestorage.app",
    messagingSenderId: "447200273897",
    appId: "1:447200273897:web:15fce8ef5975b0545dd778",
    measurementId: "G-BH6SEJSWXC"
  };

  const app = initializeApp(firebaseConfig);
  export const firebaseAuth = getAuth(app);