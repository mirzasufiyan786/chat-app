import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";

function Avatar({ type, image, setImage }) {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x:0,y:0,
  })
  const [grabPhoto, setGrabPhoto] = useState(false)

  const showContextMenu = (e)=>{
    e.preventDefault();
    setContextMenuCoordinates({x:e.pageX,y:e.pageY});
    setIsContextMenuVisible(true)
  }
  useEffect(() => {
  if (grabPhoto) {
    const data = document.getElementById("photo-picker");
    data.click();
    document.body.onfocus = (e)=>{
      setTimeout(() => {
        setGrabPhoto(false)
      }, 1000);
    }
  }
  }, [grabPhoto])

  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  const contextMenuOptions = [
    {name:"Take Photo",callback:()=>{}},
    {name:"Choose From Library",callback:()=>{}},
    {name:"Upload Photo",callback:()=>{
setGrabPhoto(true);
    }},
    {name:"Remove Photo",callback:()=>{
      setImage("/default_avatar.png")
    }}
  ]
  return (
    <>
    <div className="flex justify-center items-center">
      {type === "sm" && (
        <div className="relative h-10 w-10">
          <Image src={image} alt="avatar" className="rounded-full" fill />
        </div>
      )}
      {type === "lg" && (
        <div className="relative h-14 w-14">
          <Image src={image} alt="avatar" className="rounded-full" fill />
        </div>
      )}
      {type === "xl" && (
        <div className="relative group cursor-pointer h-60 w-60"
        onClick={e=>showContextMenu(e)}
        >
          <Image src={image} alt="avatar" className="rounded-full object-cover" fill />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={e=>showContextMenu(e)}
          
          >
            <div className="text-white flex flex-col items-center">
              <FaCamera className="text-6xl mb-1" 
        onClick={e=>showContextMenu(e)}
              
              />
              <span className="text-xl"
        onClick={e=>showContextMenu(e)}
              
              >Change Profile Photo</span>
            </div>
          </div>
        </div>
      )}
    </div>
    {
      isContextMenuVisible && <ContextMenu
      options ={contextMenuOptions}
      cordinates={contextMenuCoordinates}
      setContextMenu={setIsContextMenuVisible}
      contextMenu={isContextMenuVisible}
      />
    }
    {
      grabPhoto && <PhotoPicker onChange={photoPickerChange}/>
    }
    </>
  );
}

export default Avatar;
