
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Description = ({ data }) => {
    const { model, geolocation, owner_name, software_used, ip_address } = data.metadata_details || null
    const qr_details = data.qr_details;
    const lat = geolocation[0] || 0
    const lng = geolocation[1] || 0

    return <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger><p className="text-base font-bold mb-4 text-[#7F8EA3]">Object Detected</p></AccordionTrigger>
            <AccordionContent>
                {
                    data.detected_objects.map((item, index) => {
                        return (
                            <div key={index} className="flex items-center justify-between mb-2 flex-row">
                                <span className="bg-blue-500 text-white py-1 px-3 rounded-full">
                                    {item.object} x {item.coordinates.length}
                                </span>
                            </div>
                        );
                    })
                }
            </AccordionContent>
        </AccordionItem>


        <AccordionItem value="item-2">
            <AccordionTrigger><p className="text-base font-bold mb-4 text-[#7F8EA3]">Summary</p></AccordionTrigger>
            <AccordionContent>
                <p>{data.llm_response.reasons[0]}</p>
            </AccordionContent>
        </AccordionItem>




        <AccordionItem value="item-3">
            <AccordionTrigger><p className="text-base font-bold mb-4 text-[#7F8EA3]">Meta Data</p></AccordionTrigger>
            <AccordionContent>

                <table className="min-w-full text-left text-sm border-collapse">
                    <tbody>
                        <tr className="border-b">
                            <th className="py-2 px-4 font-medium text-gray-600">Model</th>
                            <td className="py-2 px-4">{model || 'N/A'}</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 px-4 font-medium text-gray-600">Geolocation</th>
                            <td className="py-2 px-4">
                                {geolocation ? `${geolocation[0]}, ${geolocation[1]}` : 'N/A'}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 px-4 font-medium text-gray-600">Owner Name</th>
                            <td className="py-2 px-4">{owner_name || 'N/A'}</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 px-4 font-medium text-gray-600">Software Used</th>
                            <td className="py-2 px-4">{software_used || 'N/A'}</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 px-4 font-medium text-gray-600">IP Address</th>
                            <td className="py-2 px-4">{ip_address || 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>


            </AccordionContent>
        </AccordionItem>


        {geolocation ? <AccordionItem value="item-4">
            <AccordionTrigger><p className="text-base font-bold mb-4 text-[#7F8EA3]">Location</p></AccordionTrigger>
            <AccordionContent>
                <iframe src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05},${lat - 0.05},${lng + 0.05},${lat + 0.05}&layer=mapnik&marker=${lat},${lng}`} className="w-full h-full rounded-lg"></iframe>
            </AccordionContent>
        </AccordionItem> : ""
        }


        {qr_details ? <AccordionItem value="item-5">
            <AccordionTrigger><p className="text-base font-bold mb-4 text-[#7F8EA3]">QR code</p></AccordionTrigger>
            <AccordionContent>

                <table className="min-w-full text-left text-sm border-collapse">
                    <tbody>
                        <tr className="border-b">
                            <th className="py-2 px-4 font-medium text-gray-600">Content</th>
                            <td className="py-2 px-4">{qr_details.content || 'N/A'}</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 px-4 font-medium text-gray-600">is_malicious</th>
                            <td className="py-2 px-4">
                                {qr_details.is_malicious || 'N/A'}
                            </td>
                        </tr>

                    </tbody>
                </table>

            </AccordionContent>
        </AccordionItem> : ""}

    </Accordion>

}
export default Description