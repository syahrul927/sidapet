"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import RequestItem, { RequestItemProps } from "./request-document-item";
import { useQueue } from "../hooks/use-queue";
import { RouterOutputs } from "~/trpc/react";

const mapper = (list: RouterOutputs["document"]["getWaitingRequest"]) => {
  return list.map((item) => ({
    documentCounter: item.documentConter,
    name: item.ownerName ?? "",
    documentType: item.title ?? "",
    documentCode: item.documentCode,
    formatDocument: JSON.stringify(item.formatDocument) ?? "",
    createdDate: item.createdDate,
    status: item.status,
    id: item.id,
  }));
};
const QueueDocument = () => {
  const { isPending, listNew, listValidated } = useQueue();
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
          <ListRequest data={mapper(listNew)} isPending={isPending} />
        </TabsContent>
        <TabsContent value="VALIDATED">
          <ListRequest data={mapper(listValidated)} isPending={isPending} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default QueueDocument;

interface ListRequestProps {
  data: RequestItemProps[];
  isPending?: boolean;
}
const ListRequest = ({ isPending, data }: ListRequestProps) => {
  if (isPending) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <p>Belum ada data request masuk</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-3">
      {data.map((item) => (
        <RequestItem {...item} key={item.id} />
      ))}
    </div>
  );
};
