'use client'
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useImageContext } from "../context/ImageContext";

const UrlImport = () => {
  const { setImage } = useImageContext();
  const [url, setUrl] = useState("");


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };


  const handleImport = async () => {
    if (!url) {
      alert("Please enter a valid URL");
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Invalid URL");

      setImage(url);
      setUrl("");
    } catch (error) {
      console.error("Failed to fetch the image:", error);
      alert("Invalid image URL. Please try again.");
    }
  };

  return (
    <>
      <p className="font-bold text-[#7F8EA3] mb-2">Import from URL</p>
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="Add file URL"
          className="py-5 px-4 flex-grow bg-[#0F1629] "
        />
        <Button
          onClick={handleImport}
          variant={"outline"}
          className="bg-blue-500 hover:bg-blue-600 font-bold text-white py-5 px-6"
        >
          Upload
        </Button>
      </div>
    </>
  );
};

export default UrlImport;
