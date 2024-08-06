"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { type DynamicPropsArray } from "~/data/service";
import RequestTriggerDocument from "./request-trigger";
import { type RequestItemProps } from "./type";
import { DownloadIcon } from "lucide-react";
import { useQueue } from "../../hooks/use-queue";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import generateDocument from "~/utils/generateDocument";
import { useMemo } from "react";
import WhatsappButton from "~/components/ui/whatsapp-button";

interface Props extends RequestItemProps {
  docType: DynamicPropsArray;
}

const RequestDialogValidated = (props: Props) => {
  const { refetch } = useQueue();
  const { toast } = useToast();
  const { data } = api.document.getDetailRequest.useQuery(props.id);
  const { mutate } = api.document.finishDocumentRequest.useMutation({
    onSettled: () => {
      refetch();
    },
  });
  const parsed = useMemo(() => {
    if (data) {
      return props.docType?.validationSchema.parse(
        JSON.parse(data.formatDocument),
      );
    }
    return;
  }, [data]);

  const downloadFile = async () => {
    try {
      if (data) {
        mutate(props.id);
        await generateDocument(
          {
            documentCode: data.documentCode,
            documentCounter: data.documentCounter,
            documentId: data.documentId,
            ...parsed,
          },
          props.docType?.templatePath ?? "",
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
    <Dialog>
      <RequestTriggerDocument
        createdDate={props.createdDate}
        documentCode={props.documentCode}
        documentCounter={props.documentCounter}
        documentType={props.docType?.title ?? ""}
        name={props.name}
        status={props.status}
      />

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Konfirmasi Data</DialogTitle>
          <DialogDescription>
            Setelah anda mendownload data akan di update menjadi{" "}
            <span className="font-bold">DONE</span> dan data akan dipindahkan ke
            histori (Abaikan jika sudah DONE).
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            {parsed ? (
              <WhatsappButton
                phoneNumber={parsed?.phoneNumber}
                name={parsed?.name}
                title={props.docType.title}
              />
            ) : null}
          </DialogClose>
          <DialogClose>
            <Button disabled={false} onClick={downloadFile}>
              Download&nbsp;&nbsp;
              <DownloadIcon />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default RequestDialogValidated;
