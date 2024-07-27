"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { RouterOutputs } from "~/trpc/react";
import { useQueue } from "../../hooks/use-queue";
import { RequestItemProps } from "./type";
import WrapperListRequest from "./wrapper-list-request";

const mapper = (
  list: RouterOutputs["document"]["getWaitingRequest"],
): RequestItemProps[] => {
  return list.map((item) => ({
    documentCounter: item.documentConter,
    name: item.ownerName ?? "",
    documentCode: item.documentCode,
    formatDocument: JSON.stringify(item.formatDocument) ?? "",
    createdDate: item.createdDate,
    status: item.status,
    id: item.id,
  }));
};

const TabQueueDocument = () => {
  const { listNew, listValidated } = useQueue();
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
          <WrapperListRequest data={mapper(listNew)} />
        </TabsContent>
        <TabsContent value="VALIDATED">
          <WrapperListRequest data={mapper(listValidated)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default TabQueueDocument;
