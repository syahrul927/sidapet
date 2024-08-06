"use client";
import Image from "next/image";
import { type ReactNode } from "react";
import { FormDescription, FormLabel } from "../ui/form";

interface PhotoPreviewProps {
  title?: string;
  children: ReactNode;
  src: string;
}
const PhotoPreview = ({ children, title, src }: PhotoPreviewProps) => {
  const handleOpenInNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(
        `<img src="${src}" alt="${title}" style="max-width:100%;height:auto;">`,
      );
      newWindow.document.title = title ?? "";
    }
  };
  return (
    <div className="flex flex-col">
      <FormLabel>{title}</FormLabel>
      <FormDescription>
        Klik gambar untuk membuka gambar lebih besar
      </FormDescription>
      <div
        onClick={handleOpenInNewTab}
        className="relative aspect-video h-auto w-full max-w-[80%] cursor-pointer"
      >
        <Image fill src={src} alt={title ?? ""} className=" object-contain" />
      </div>
      {children}
    </div>
  );
};
export default PhotoPreview;
