"use client";

import RequestItem from "~/app/(dashboard)/components/request-document-item";
import { api } from "~/trpc/react";

const ListDoneRequest = () => {
  const { data, isPending } = api.document.findHistoryDocument.useQuery();
  if (isPending) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (!data?.length) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <p>Belum ada data request masuk</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-3">
      {data?.map((item) => (
        <RequestItem
          key={item.id}
          documentCounter={item.documentConter}
          name={item.ownerName ?? ""}
          documentType={item.title ?? ""}
          documentCode={item.documentCode}
          formatDocument={JSON.stringify(item.formatDocument) ?? ""}
          createdDate={item.createdDate}
          status={item.status}
          id={item.id}
        />
      ))}
    </div>
  );
};
export default ListDoneRequest;