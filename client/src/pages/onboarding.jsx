import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";
import axios from "axios";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";

function Onboarding() {
  const router = useRouter();
  const [{ userInfo,newUser },dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || '');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('/default_avatar.png')

useEffect(() => {
if(!newUser && !userInfo?.email) router.push("login");
if(!newUser && userInfo?.email)  router.push("/");
}, [userInfo,newUser,router])

  const OnboardingUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          name, email, about, image
        });
        if (data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: false,
          })
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id:data.user.id,
              name,
              email,
              profileImage:image,
              status: about,
            }
          });
router.push("/")
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const validateDetails = () => {
    if (name.length < 3) {
      return false
    }
    return true
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-panel-header-background px-4 text-white">
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
      <div className="mt-6">

        <h2 className=" font-medium text-white text-2xl">Create your profile</h2>
        <div className="flex gap-6 mt-6">
          <div className="flex flex-col items-center justify-center mt-5 gap-6">
            <Input name="Display Name" state={name} setState={setName} label />
            <Input name="About" state={about} setState={setAbout} label />
            <div className="flex justify-center items-center">
              <button className="flex items-center gap-3 px-6 py-3 mt-6 bg-search-input-container-background  rounded-md shadow hover:shadow-lg transition-all duration-200" onClick={OnboardingUserHandler}>
                Create Profile
              </button>
            </div>
          </div>
          <div>
            <Avatar type="xl" image={image} setImage={setImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
