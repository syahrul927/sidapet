"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/react";
import RequestItem, { RequestItemProps } from "./request-document-item";
const QueueDocument = () => {
  const { data, isPending } = api.document.getWaitingRequest.useQuery(
    undefined,
    {
      refetchOnMount: true,
    },
  );
  const listNew: RequestItemProps[] = useMemo(
    () =>
      data
        ?.filter((item) => item.status === "NEW")
        .map((item) => ({
          documentCounter: item.documentConter,
          name: item.ownerName ?? "",
          documentType: item.title ?? "",
          documentCode: item.documentCode,
          formatDocument: JSON.stringify(item.formatDocument) ?? "",
          createdDate: item.createdDate,
          status: item.status,
          id: item.id,
        })) ?? [],

    [data],
  );
  const listValidated: RequestItemProps[] = useMemo(
    () =>
      data
        ?.filter((item) => item.status === "VALIDATED")
        .map((item) => ({
          id: item.id,
          documentCounter: item.documentConter,
          name: item.ownerName ?? "",
          documentType: item.title ?? "",
          documentCode: item.documentCode,
          formatDocument: JSON.stringify(item.formatDocument) ?? "",
          createdDate: item.createdDate,
          status: item.status,
        })) ?? [],
    [data],
  );
  return (
    <div className="flex flex-col">
      <Tabs defaultValue="NEW">
        <TabsList>
          <TabsTrigger value="NEW">
            Request Masuk ({listNew.length})
          </TabsTrigger>
          <TabsTrigger value="VALIDATED">
            Siap diprint ({listValidated.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="NEW">
          {isPending ? (
            <div className="flex h-48 w-full items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : listNew.length ? (
            <ListRequest data={listNew} />
          ) : (
            <div className="flex h-48 w-full items-center justify-center">
              <p>Belum ada data request masuk</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="VALIDATED">
          {isPending ? (
            <div className="flex h-48 w-full items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : listValidated.length ? (
            <ListRequest data={listValidated} />
          ) : (
            <div className="flex h-48 w-full items-center justify-center">
              <p>Belum ada data request masuk</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default QueueDocument;

interface ListRequestProps {
  data: RequestItemProps[];
}
const ListRequest = (props: ListRequestProps) => {
  return (
    <div className="flex flex-col space-y-2">
      {props.data.map((item) => (
        <RequestItem {...item} key={item.id} />
      ))}
    </div>
  );
};
