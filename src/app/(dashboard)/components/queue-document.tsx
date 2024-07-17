"use client";

import { useEffect, useMemo, useState } from "react";
import SKJFormValidation from "~/components/document/validation";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { fromNow } from "~/lib/utils";
import { api } from "~/trpc/react";
const QueueDocument = () => {
  const { data } = api.document.getWaitingRequest.useQuery();
  const listNew: RequestItemProps[] = useMemo(
    () =>
      data
        ?.filter((item) => item.status === "NEW")
        .map((item) => ({
          id: item.documentConter,
          name: item.ownerName ?? "",
          documentType: item.title ?? "",
          createdDate: item.createdDate,
          status: item.status,
        })) ?? [],

    [data],
  );
  const listValidated: RequestItemProps[] = useMemo(
    () =>
      data
        ?.filter((item) => item.status === "VALIDATED")
        .map((item) => ({
          id: item.documentConter,
          name: item.ownerName ?? "",
          documentType: item.title ?? "",
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
          <ListRequest data={listNew} />
        </TabsContent>
        <TabsContent value="VALIDATED">
          <ListRequest data={listValidated} />
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

interface RequestItemProps {
  name: string;
  documentType: string;
  createdDate: Date;
  status: string;
  id: string;
}
const RequestItem = (props: RequestItemProps) => {
  return (
    <Dialog>
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
            <Badge variant={"outline"}>#{props.id}</Badge>
            <Badge variant={props.status === "NEW" ? "accent" : "default"}>
              {props.status}
            </Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-full max-w-screen-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Konfirmasi Data</DialogTitle>
          <DialogDescription>
            Pastikan data yang di perlukan lengkap dan isi form yang berasal
            dari gambar!
          </DialogDescription>
        </DialogHeader>
        <SKJFormValidation />
      </DialogContent>
    </Dialog>
  );
};
