"use client";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useImageContext } from "../context/ImageContext";
import { useRouter } from "next/navigation";
import { StepperValues } from "../utils";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton"

import axios from "axios";
import Description from "./description";


interface BlurArea {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;
  blurred: boolean;
}

const Page = () => {
  const { image } = useImageContext();
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState(image);
  const [blurIntensity, setBlurIntensity] = useState(5);
  const [blurAreas, setBlurAreas] = useState<BlurArea[]>([]);
  const [turnBorder, setTurnBorder] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [modelResponse, setModelResponse] = useState(null)

  const MAX_CANVAS_WIDTH = 800;
  const MAX_CANVAS_HEIGHT = 600;
  let scale = 1;


  useEffect(() => {

    if (!image) {
      toast({
        title: "Warning",
        description: "Please upload an image first",
      });
      router.push(StepperValues[0].value.toLowerCase().toString());
      return;
    }
    console.log(image)

    // Define an async function to fetch data using axios
    const fetchData = async () => {
      try {
        const response = await fetch(image);
        const blob = await response.blob();


        const formData = new FormData();
        formData.append("file", blob, "uploaded_image");

        const uploadResponse = await axios.post(
          "https://039e-36-252-119-58.ngrok-free.app/api",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = uploadResponse.data;
        setModelResponse(data)
        console.log(modelResponse);
        setIsLoading(false);

        const newBlurAreas: BlurArea[] = data.detected_objects.flatMap(
          (detectedObject: any, index: number) =>
            detectedObject.coordinates.map((coord: any) => ({
              id: index + 1,
              x: coord.x,
              y: coord.y,
              width: coord.width,
              height: coord.height,
              selected: false,
              blurred: false,
            }))
        );

        setBlurAreas(newBlurAreas);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to fetch data from the API.",
        });
      }
    };


    fetchData();
  }, []);



  const drawCanvas = (backendAreas?: BlurArea[]) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context && imageSrc) {
      const image = new Image();
      image.crossOrigin = "anonymous";

      image.src = imageSrc;

      image.onload = () => {
        scale = Math.min(
          MAX_CANVAS_WIDTH / image.width,
          MAX_CANVAS_HEIGHT / image.height,
        );

        const scaledWidth = image.width * scale;
        const scaledHeight = image.height * scale;

        // Set canvas dimensions based on scaled image
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

        const areasToDraw = backendAreas || blurAreas;

        // Draw blur areas with scaled coordinates
        areasToDraw.forEach((area) => {
          const { x, y, width, height, selected, blurred } = area;

          const scaledX = x * scale;
          const scaledY = y * scale;
          const scaledWidth = width * scale;
          const scaledHeight = height * scale;

          if (blurred) {
            context.save();
            context.filter = `blur(${blurIntensity}px)`;
            context.drawImage(
              image,
              scaledX,
              scaledY,
              scaledWidth,
              scaledHeight,
              scaledX,
              scaledY,
              scaledWidth,
              scaledHeight,
            );
            context.restore();
          }

          if (!selected && turnBorder) {
            context.strokeStyle = "red";
            context.lineWidth = 2;
            context.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
          }
        });
      };
    }
  };

  // Redraw canvas whenever blur areas, image, or other states change
  useEffect(() => {
    drawCanvas();
  }, [blurAreas, imageSrc, turnBorder, blurIntensity]);

  // Handle click events on the canvas
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Adjust click coordinates based on the scaling factor
    const adjustedX = clickX / scale;
    const adjustedY = clickY / scale;

    const updatedAreas = blurAreas.map((area) => {
      const isInside =
        adjustedX >= area.x &&
        adjustedX <= area.x + area.width &&
        adjustedY >= area.y &&
        adjustedY <= area.y + area.height;

      if (isInside) {
        return {
          ...area,
          selected: !area.selected,
          blurred: area.selected ? false : !area.blurred,
        };
      }
      return area;
    });

    setBlurAreas(updatedAreas);
  };

  return (
    <>
      <div
        className="relative w-full flex flex-col justify-center items-center border-dashed border-2 border-slate-300 rounded-2xl hover:bg-[#141d36]  cursor-pointer mb-5"
        style={{
          maxWidth: MAX_CANVAS_WIDTH,
          maxHeight: MAX_CANVAS_HEIGHT,
          overflow: "hidden",
        }}
      >
        {isLoading ? <><Skeleton className="w-full h-full absolute" />
          <Skeleton className="w-full h-full absolute" />
          <Skeleton className="w-full h-full absolute" />
          <Skeleton className="w-full h-full absolute" />
          <Skeleton className="w-full h-full absolute" />
          <Skeleton className="w-full h-full absolute" />
          <Skeleton className="w-full h-full absolute" />
          <Skeleton className="w-full h-full absolute" /></> : ""}


        <canvas ref={canvasRef} onClick={handleCanvasClick}></canvas>
      </div>

      <div className="flex items-center space-x-2 my-2 bg-[#0F1629] border-[1px] border-[#141d36] px-5 py-2 rounded-md">
        <div className="flex flex-row justify-center items-center gap-2">
          <Label className="text-[#7F8EA3]">Mark</Label>
          <Switch
            id="border-toggle"
            checked={turnBorder}
            onCheckedChange={() => setTurnBorder(!turnBorder)}
          />
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <Label className="text-[#7F8EA3]">Blur Intensity</Label>
          <Slider
            defaultValue={[blurIntensity]}
            max={15}
            step={1}
            className="w-[60%]"
            onValueChange={(i) => setBlurIntensity(Number(i))}
          />
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600" variant="outline" >Save Image</Button>
      </div>

      {modelResponse ? <Description data={modelResponse}></Description> : ""}


    </>
  );
};

export default Page;
