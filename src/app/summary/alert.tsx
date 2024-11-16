import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoInformationCircleSharp } from "react-icons/io5";
const AlertComponent = () => {
  return (
    <Alert>
      <IoInformationCircleSharp />
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        You can blur the selective parts by clicking on the placeholder
      </AlertDescription>
    </Alert>
  );
};
export default AlertComponent;
