"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { DynamicPropsArray } from "~/data/service";
import RequestTriggerDocument from "./request-trigger";
import { RequestItemProps } from "./type";
import dynamic from "next/dynamic";
import { useState } from "react";

const FormValidationProps = dynamic(
  () => import("~/components/document/validation"),
  {
    ssr: false,
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
      <DialogContent className="max-h-[90vh] w-full overflow-y-auto md:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Konfirmasi</DialogTitle>
          <DialogDescription>
            Pastikan data yang di perlukan lengkap dan isi form yang berasal
            dari gambar!
          </DialogDescription>
        </DialogHeader>
        {open ? (
          <FormValidationProps
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
