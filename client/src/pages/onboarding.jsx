import React from "react";
import Image from "next/image";

function Onboarding() {
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
      <div className="mt-6">
         
             <h2 className=" font-medium text-white text-2xl">Create your profile</h2>
           
         </div>
    </div>
  );
}

export default Onboarding;
