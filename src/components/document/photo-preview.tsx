import Image from "next/image";
import { ReactNode } from "react";
import { FormLabel } from "../ui/form";

interface PhotoPreviewProps {
  title?: string;
  children: ReactNode;
  src: string;
}
const PhotoPreview = ({ children, title, src }: PhotoPreviewProps) => {
  return (
    <div className="flex flex-col">
      <FormLabel>{title}</FormLabel>
      <div className="relative m-3 aspect-square h-[400px] w-fit ">
        <Image fill src={src} alt={title ?? ""} className=" object-contain" />
      </div>
      {children}
    </div>
  );
};
export default PhotoPreview;
