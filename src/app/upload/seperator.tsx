import StepLine from "../components/stepLine";

const Seperator = () => {
  return (
    <div className="flex flex-row gap-10 justify-center items-center py-2">
      <StepLine />
      <p className="text-slate-400 font-bold">or</p>
      <StepLine />
    </div>
  );
};
export default Seperator;
