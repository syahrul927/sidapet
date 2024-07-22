"use client";
import { redirect, useRouter } from "next/navigation";
import LayoutDashboard from "~/components/dashboard/layout-dashboard";
import ServiceFormDocument from "~/components/document/form";
import { useToast } from "~/components/ui/use-toast";
import { ServicesDocument } from "~/data/service";
import { type PageType } from "~/types/page-type";

const DocumentCreateService = ({ params }: PageType) => {
  const slug = params.slug;
  const docType = ServicesDocument.find((item) => item.code === slug);
  if (!docType) {
    redirect("/document/create");
  }
  const router = useRouter();
  const { toast } = useToast();
  const onSuccess = ({ requestId: _ }: { requestId: string }) => {
    toast({
      title: "Berhasil",
      description: "Berhasil membuat request dokumen",
    });
    void router.push(`/`);
  };
  const onError = () => {
    toast({
      title: "Gagal",
      description: "Terjadi Kesalahan pada sistem, segera hubungi admin!",
      variant: "destructive",
    });
  };
  return (
    <LayoutDashboard>
      <ServiceFormDocument
        onSuccess={onSuccess}
        onError={onError}
        code={slug}
        schema={docType.formSchema}
        title={docType.title}
        fieldConfig={docType.formFieldConfig}
      />
    </LayoutDashboard>
  );
};
export default DocumentCreateService;
