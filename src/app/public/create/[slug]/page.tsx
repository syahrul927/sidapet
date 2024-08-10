"use client";
import { LucideMessageCircleWarning } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import ServiceFormDocument from "~/components/document/form";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { useToast } from "~/components/ui/use-toast";
import { ServicesDocument } from "~/data/service";
import { type PageType } from "~/types/page-type";

const DocumentCreateService = ({ params }: PageType) => {
  const slug = params.slug;
  const docType = ServicesDocument.find((item) => item.code === slug);
  if (!docType) {
    redirect("/public/");
  }
  const router = useRouter();
  const { toast } = useToast();
  const onSuccess = ({ requestId }: { requestId: string }) => {
    toast({
      title: "Berhasil",
      description: "Berhasil membuat request dokumen",
    });
    void router.push(`/public/create/success?id=${requestId}`);
  };
  const onError = () => {
    toast({
      title: "Gagal",
      description: "Terjadi Kesalahan pada sistem, segera hubungi admin!",
      variant: "destructive",
    });
    router.push("/public/");
  };
  return (
    <>
      <div className="max-w-2xl p-1">
        <Alert variant={"destructive"} className="bg-destructive/5">
          <LucideMessageCircleWarning />
          <AlertTitle className="text-sm">Perhatian</AlertTitle>
          <AlertDescription className="text-xs">
            {docType.notes}
          </AlertDescription>
        </Alert>
      </div>
      <div className="px-1">
        <ServiceFormDocument
          onError={onError}
          onSuccess={onSuccess}
          code={slug}
          schema={docType.formSchema}
          title={docType.title}
          fieldConfig={docType.formFieldConfig}
        />
      </div>
    </>
  );
};
export default DocumentCreateService;
