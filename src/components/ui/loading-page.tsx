import { LoaderCircleIcon } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="fixed  z-20 flex h-screen w-full items-center justify-center bg-secondary/10">
      <LoaderCircleIcon className="animate-spin text-white" size={48} />
    </div>
  );
};
export default LoadingPage;
