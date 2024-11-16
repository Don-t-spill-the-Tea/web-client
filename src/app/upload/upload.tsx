"use client";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa6";
import { useImageContext } from "../context/ImageContext";

const UploadComponent = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { image, setImage, clearImage } = useImageContext();
  // const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleOnImageUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };



  return (
    <div
      className="w-full py-10 flex flex-col justify-center items-center border-dashed border-[3px] border-[#0F1629] rounded-2xl hover:bg-[#0d1220] cursor-pointer"
      onClick={handleOnImageUpload}
    >
      <Input
        type="file"
        accept="image/*"
        id="upload"
        className="hidden"
        ref={fileRef}
        onChange={handleFileChange}
      />

      {image ? (
        <>
          <img
            src={image}
            alt="Uploaded Preview"
            className="w-3/5 h-auto rounded-lg border border-slate-300 mb-4"
          />

        </>
      ) : (
        <>
          <div className="p-5 bg-blue-500 rounded-xl text-slate-50">
            <FaUpload />
          </div>
          <p className="text-xl text-[#7F8EA3] font-bold py-5">
            Capture or Upload a picture
          </p>
          <div className="text-[#7F8EA3] text-center">
            <p> Maximum file size: 10 MB </p>
            <p>Supported file size: .jpg, .png</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadComponent;
