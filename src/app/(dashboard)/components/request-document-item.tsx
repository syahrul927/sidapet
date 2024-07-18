"use client";

import { useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { PiDownloadFill, PiFileArchive } from "react-icons/pi";
import FormValidationProps from "~/components/document/validation";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ServicesDocument } from "~/data/service";
import { fromNow } from "~/lib/utils";
import { api } from "~/trpc/react";
import generateDocument from "~/utils/generateDocument";

export interface RequestItemProps {
  name: string;
  id: string;
  documentType: string;
  documentCode: string;
  formatDocument: string;
  createdDate: Date;
  status: string;
  documentCounter: string;
}
const RequestItem = (props: RequestItemProps) => {
  const [open, setOpen] = useState(false);
  const docType = ServicesDocument.find(
    (doc) => doc.code === props.documentCode,
  );
  if (!docType) {
    return <p>Tipe dokumen tidak valid</p>;
  }
  const { data } = api.document.getDetailRequest.useQuery(props.id);
  const downloadFile = () => {
    try {
      if (data?.formatDocument) {
        const parsed = docType.validationSchema.parse(
          JSON.parse(data.formatDocument),
        );
        generateDocument({
          documentCode: data.documentCode,
          documentCounter: data.documentCounter,
          ...parsed,
        });
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Card className="hover:text-background-foreground cursor-pointer hover:bg-background/90">
          <CardHeader className="flex flex-row justify-between px-4 py-2">
            <div>
              <CardTitle className="text-lg">{props.documentType}</CardTitle>
              <CardDescription className="text-sm">
                {props.name}
              </CardDescription>
            </div>
            <p className="text-muted-foreground ">
              {fromNow(props.createdDate)}
            </p>
          </CardHeader>
          <CardContent className="gap-1 space-x-1 px-4">
            <Badge variant={props.status === "NEW" ? "accent" : "default"}>
              {props.status}
            </Badge>
            <Badge variant={"outline"}>{props.documentCode}</Badge>
            <Badge variant={"outline"}>#{props.documentCounter}</Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-full max-w-screen-lg overflow-y-auto">
        {props.status === "NEW" ? (
          <>
            <DialogHeader>
              <DialogTitle>Konfirmasi Data</DialogTitle>
              <DialogDescription>
                Pastikan data yang di perlukan lengkap dan isi form yang berasal
                dari gambar!
              </DialogDescription>
            </DialogHeader>
            <FormValidationProps
              data={props.formatDocument}
              onSubmit={() => setOpen(false)}
              docType={docType}
              id={props.id}
            />
          </>
        ) : (
          <>
            <>
              <DialogHeader>
                <DialogTitle>Konfirmasi Data</DialogTitle>
                <DialogDescription>
                  Pastikan data yang di perlukan lengkap dan isi form yang
                  berasal dari gambar!
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button onClick={() => downloadFile()}>
                    Download&nbsp;&nbsp;
                    <FaDownload />
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default RequestItem;
