"use client";

import { useMemo } from "react";
import { MapServiceDocument } from "~/data/service";
import { RequestItemProps } from "./type";
import dynamic from "next/dynamic";
import { LoaderCircleIcon } from "lucide-react";

const RequestDialogNew = dynamic(() => import("./request-dialog-new"), {
  ssr: false,
  loading: () => <LoaderCircleIcon className="animate-spin" size={32} />,
});
const RequestDialogValidated = dynamic(
  () => import("./request-dialog-validated"),
  {
    ssr: false,
    loading: () => <LoaderCircleIcon className="animate-spin" size={32} />,
  },
);

const RequestItem = (props: RequestItemProps) => {
  const docType = useMemo(
    () => MapServiceDocument[props.documentCode],
    [props.documentCode],
  );
  if (!docType) {
    return <p>Dokumen tidak Valid</p>;
  }
  return props.status === "NEW" ? (
    <RequestDialogNew {...props} docType={docType} />
  ) : (
    <RequestDialogValidated {...props} docType={docType} />
  );
};

export default RequestItem;
