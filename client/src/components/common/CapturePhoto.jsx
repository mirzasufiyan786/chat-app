import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";

function CapturePhoto({ hide, setImage }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Start camera when component mounts
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
      });

    return () => {
      // Stop the camera when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png"); 
      setImage(imageData);
      hide(false);
    }
  };

  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex flex-col justify-center items-center z-50">
       {/* Close button */}
      <div className="absolute top-2 right-2 cursor-pointer" onClick={() => hide(false)}>
        <IoClose className="h-8 w-8 text-white" />
      </div>

      {/* Live camera feed */}
      <video ref={videoRef} autoPlay playsInline className="w-full h-3/5 rounded-lg object-cover" />

      {/* Capture button */}
      <button
        onClick={captureImage}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2"
      >
        <FaCamera />
        Capture Photo
      </button>

      {/* Hidden canvas for capturing image */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}

export default CapturePhoto;
