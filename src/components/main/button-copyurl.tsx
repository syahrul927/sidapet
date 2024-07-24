"use client";
import { useEffect, useState } from "react";
import { RiFileCopyFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const ButtonCopyUrl = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const { toast } = useToast();
  const copyToClipboard = (str: string) => {
    void navigator?.clipboard.writeText(str);
    toast({
      title: "Sukses",
      description: "Link berhasil copy link ke clipboard",
    });
  };

  useEffect(() => {
    if (process) {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <Button onClick={() => copyToClipboard(currentUrl)}>
      Simpan Link&nbsp;
      <RiFileCopyFill />
    </Button>
  );
};

export default ButtonCopyUrl;
