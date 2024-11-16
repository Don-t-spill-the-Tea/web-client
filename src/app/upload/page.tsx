'use client'
import { Button } from "@/components/ui/button";
import Seperator from "./seperator";
import TestImages from "./testImage";
import UploadComponent from "./upload";
import UrlImport from "./urlimport";
import { useRouter } from "next/navigation";
import { StepperValues } from "../utils";



const Page = () => {

  const router = useRouter()

  const handleOnClick = () => {
    router.push(StepperValues[1].value.toLowerCase().toString())
  }
  return (
    <div>
      <UploadComponent></UploadComponent>
      <Seperator></Seperator>
      <UrlImport />
      <TestImages />
      <div><Button className="w-full mt-5 py-5 bg-blue-500 hover:bg-blue-600 font-bold " onClick={handleOnClick} variant="ghost" >Next</Button></div>

    </div>
  );
};
export default Page;
