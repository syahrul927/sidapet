"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import LoadingPage from "~/components/ui/loading-page";
import { type DynamicPropsArray } from "~/data/service";
import RequestTriggerDocument from "./request-trigger";
import { type RequestItemProps } from "./type";

const FormValidationProps = dynamic(
  () => import("~/components/document/validation"),
  {
    ssr: false,
    loading: () => <LoadingPage />,
  },
);

interface Props extends RequestItemProps {
  docType: DynamicPropsArray;
}
const RequestDialogNew = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen}>
      <RequestTriggerDocument
        createdDate={props.createdDate}
        documentCode={props.documentCode}
        documentCounter={props.documentCounter}
        documentType={props.docType?.title ?? ""}
        name={props.name}
        status={props.status}
      />
      <DialogContent className="max-h-[100dvh] w-full overflow-y-auto p-3 sm:max-h-[95vh] sm:max-w-screen-lg sm:p-6">
        <DialogHeader>
          <DialogTitle>Konfirmasi</DialogTitle>
          <DialogDescription>
            Pastikan data yang di perlukan lengkap dan isi form yang berasal
            dari gambar!
          </DialogDescription>
        </DialogHeader>
        {open ? (
          <FormValidationProps
            onClose={() => setOpen(false)}
            data={props.formatDocument}
            docType={props.docType}
            id={props.id}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
export default RequestDialogNew;
