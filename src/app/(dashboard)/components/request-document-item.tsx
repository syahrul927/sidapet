"use client";

import { useState } from "react";
import { FaDownload } from "react-icons/fa6";
import FormValidationProps from "~/components/document/validation";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { useToast } from "~/components/ui/use-toast";
import { ServicesDocument } from "~/data/service";
import { fromNow } from "~/lib/utils";
import { api } from "~/trpc/react";
import generateDocument from "~/utils/generateDocument";
import { useQueue } from "../hooks/use-queue";

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
  const { refetch } = useQueue();
  const { toast } = useToast();
  const docType = ServicesDocument.find(
    (doc) => doc.code === props.documentCode,
  );
  if (!docType) {
    return <p>Tipe dokumen tidak valid</p>;
  }
  const { data } = api.document.getDetailRequest.useQuery(props.id);
  const { mutate, isPending } = api.document.finishDocumentRequest.useMutation({
    onSettled: () => {
      refetch();
    },
  });
  const downloadFile = async () => {
    try {
      if (data?.formatDocument) {
        mutate(props.id);
        const parsed = docType.validationSchema.parse(
          JSON.parse(data.formatDocument),
        );
        console.log("parsed ", parsed);
        await generateDocument(
          {
            documentCode: data.documentCode,
            documentCounter: data.documentCounter,
            documentId: data.documentId,
            ...parsed,
          },
          docType.templatePath,
        );
        toast({
          title: "Sukses",
          description:
            "Berhasil download dokumen, silahkan cek folder Download pada komputer anda!",
        });
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan ketika mendownload file!",
        variant: "destructive",
      });
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
      {props.status === "NEW" ? (
        <DialogContent className="max-h-[90vh] w-full max-w-screen-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Konfirmasi</DialogTitle>
            <DialogDescription>
              Pastikan data yang di perlukan lengkap dan isi form yang berasal
              dari gambar!
            </DialogDescription>
          </DialogHeader>
          <FormValidationProps
            data={props.formatDocument}
            docType={docType}
            id={props.id}
          />
        </DialogContent>
      ) : (
        <DialogContent className="max-h-[90vh] w-full max-w-xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Konfirmasi Data</DialogTitle>
            <DialogDescription>
              Setelah anda mendownload data akan di update menjadi{" "}
              <span className="font-bold">DONE</span> dan data akan dipindahkan
              ke histori (Abaikan jika sudah DONE).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button disabled={isPending} onClick={() => downloadFile()}>
                Download&nbsp;&nbsp;
                <FaDownload />
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};
export default RequestItem;
