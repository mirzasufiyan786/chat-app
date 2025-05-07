"use client";
import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig.js";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes.js";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

const Login = () => {
  const router = useRouter();

  const [{},dispatch]= useStateProvider();

  const handelLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {user:{
      displayName:name,email,photoURL:profileImage
    }} = await signInWithPopup(firebaseAuth,provider);
    try {
      if(email){
        const {data} = await axios.post(CHECK_USER_ROUTE, {email});
        console.log({data});
        if(!data.status){
          dispatch({
            type:reducerCases.SET_NEW_USER,
            newUser:true,
          })
          dispatch({
            type:reducerCases.SET_USER_INFO,
            userInfo:{
              name,
              email,
              profileImage,
              status:""
            }
          })
          router.push("/onboarding")
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-panel-header-background px-4">
     <div className="flex justify-center items-center gap-3">
     <Image
        src="/giphy.gif"
        alt="Chat Animation"
        width={300}
        height={300}
        className="object-contain rounded-full"
      />
      <h2 className="text-7xl font-semibold mt-4 mb-6 text-white">Chat-App</h2>
     </div>
    <div>
    <button
        onClick={handelLogin}
        className="flex items-center gap-3 px-6 py-3 mt-6 bg-search-input-container-background  rounded-md shadow hover:shadow-lg transition-all duration-200"
      >
        <FcGoogle size={24} />
        <span className="text-xl font-medium text-white">Login with Google</span>
      </button>
    </div>
    </div>
  );
};

export default Login;
