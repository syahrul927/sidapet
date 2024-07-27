"use client";
import { LoaderCircleIcon, LucideMessageCircleWarning } from "lucide-react";
import { useRouter } from "next/navigation";
import ButtonCopyUrl from "~/components/main/button-copyurl";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/cn";
import { api } from "~/trpc/react";
import { type PageType } from "~/types/page-type";

const strBuilder = (status: string) => {
  if (!status) return "Dokumen tidak valid";
  if (status === "NEW") return "Dokumen Sedang di proses!";
  return "Dokumen Siap diambil!";
};
const DocumentSuccessCreate = ({ searchParams }: PageType) => {
  const id = searchParams.id as string;
  const router = useRouter();
  if (!id) {
    void router.push("/public");
  }
  const { data, isPending } = api.document.getStatusRequest.useQuery(id);
  return (
    <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 px-3">
      <Alert className="invert">
        <LucideMessageCircleWarning />
        <AlertTitle>Perhatian</AlertTitle>
        <AlertDescription>{data?.notes}</AlertDescription>
      </Alert>
      {isPending ? (
        <LoaderCircleIcon size={32} className="animate-spin" />
      ) : (
        <div className="flex w-full flex-col gap-3">
          <Card>
            <CardHeader className="space-y-0">
              <CardTitle className="flex w-full justify-between text-xl">
                <span>{data?.title}</span>
                <Badge className="text-base" variant={"outline"}>
                  #{data?.counter}
                </Badge>
              </CardTitle>
              <CardDescription>{data?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "flex items-center justify-center rounded-lg border p-16 text-center ",
                  data?.status === "NEW"
                    ? "border-secondary bg-secondary/15 text-secondary"
                    : "border-green-600 bg-green-600/15 text-green-600",
                )}
              >
                <h1>{strBuilder(data?.status ?? "")}</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="flex w-full">
        <ButtonCopyUrl />
      </div>
    </div>
  );
};
export default DocumentSuccessCreate;
