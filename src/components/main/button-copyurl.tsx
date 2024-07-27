"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { CopyIcon } from "lucide-react";

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
      <CopyIcon />
    </Button>
  );
};

export default ButtonCopyUrl;
