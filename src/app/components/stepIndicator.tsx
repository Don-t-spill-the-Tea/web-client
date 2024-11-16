import { StepperValue } from "../utils";
import { IoCheckmarkSharp } from "react-icons/io5";

type StepIndicationProps = {
  step: StepperValue;
  active: boolean;
  processed: boolean;
  onClick: () => void;
};

const StepIndication = ({
  step,
  active,
  processed,
  onClick,
}: StepIndicationProps) => {
  return (
    <div
      className={`flex flex-row gap-2 px-2 w-40 items-center justify-center cursor-pointer ${
        active
          ? "text-blue-500 font-bold"
          : "text-[#7F8EA3]"
      }`}
      onClick={onClick}
    >
      <div
        className={`border-2 rounded-md w-7 h-7 flex justify-center items-center ${
          active
            ? "bg-blue-500 text-slate-50 border-blue-500"
            : processed
              ? "bg-[#0F1629] text-white border-[#7F8EA3]"
              : "border-[#7F8EA3]"
        }`}
      >
        {processed ? <IoCheckmarkSharp /> : String(step.id)}
      </div>
      <p>{step.value}</p>
    </div>
  );
};

export default StepIndication;
