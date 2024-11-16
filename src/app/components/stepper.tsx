"use client";
import { useRouter } from "next/navigation";

import { StepperValues } from "../utils";
import StepIndication from "./stepIndicator";
import StepLine from "./stepLine";
import { usePathname } from "next/navigation";

const Stepper = () => {
  const router = useRouter();
  const currentPath = usePathname().substring(1).toLowerCase();
  const currentStepIndex = StepperValues.findIndex(
    (step) => step.value.toLowerCase() === currentPath,
  );

  const handleStepClick = (path: string) => {
    router?.push(path);
  };

  return (
    <div className="flex flex-row  items-center justify-center py-10 ">
      {StepperValues.map((item, index) => (
        <div key={String(item.id)} className="flex items-center ">
          <StepIndication
            step={item}
            active={index === currentStepIndex}
            processed={index < currentStepIndex}
            onClick={() => handleStepClick(item.value.toLowerCase())}
          />

          {index < StepperValues.length - 1 && (
            <StepLine key={`line-${item.id}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
