'use client'
import { useImageContext } from "../context/ImageContext";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Images = [
    {
        item: "License Plate",
        picture: "test1.jpg",
    },
    {
        item: "Faces",
        picture: "test1.jpg",
    },
    {
        item: "Street",
        picture: "test1.jpg",
    },
];

const TestImages = () => {
    const { setImage } = useImageContext();
    const handleSelectImage = (picture: string) => {
        setImage(picture);
    };
    return (
        <>


            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger><p className="font-bold text-[#7F8EA3] mb-2 mt-10">Test from already availale picture</p></AccordionTrigger>
                    <AccordionContent>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {Images.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSelectImage(image.picture)}
                                    className="relative  overflow-hidden rounded-md cursor-pointer border-[2px]  border-[#0F1629] hover:scale-105 transition"
                                >

                                    <img
                                        src={image.picture}
                                        alt={image.item}
                                        className="w-full h-48 object-cover"
                                    />


                                    <div className="absolute bottom-0 left-0 right-0 bg-[#0F1629]  text-slate-400 text-center py-2  transition-opacity duration-300">
                                        {image.item}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion >
        </>
    );
};

export default TestImages;
