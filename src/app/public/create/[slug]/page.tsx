"use client";
import { redirect } from "next/navigation";
import ServiceFormDocument from "~/components/document/form";
import { ServicesDocument } from "~/data/service";
import { type PageType } from "~/types/page-type";

const DocumentCreateService = ({ params }: PageType) => {
  const slug = params.slug;
  const docType = ServicesDocument.find((item) => item.code === slug);
  if (!docType) {
    redirect("/public/");
  }
  return (
    <ServiceFormDocument
      code={slug}
      schema={docType.formSchema}
      title={docType.title}
      fieldConfig={docType.formFieldConfig}
    />
  );
};
export default DocumentCreateService;
